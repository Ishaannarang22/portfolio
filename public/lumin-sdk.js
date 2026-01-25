"use strict";
(() => {
  // src/voice.ts
  var DEFAULT_SYSTEM_PROMPT = `You are a professional user researcher conducting a focused product feedback session. Your goal is to uncover pain points, friction, and feature gaps.


## START OF SESSION
Say only: "Hi! Explore the product - I'll check in at key moments."

You are VoiceLoop, an advanced AI User Researcher.

Your Goal: You are observing a user testing a new "AI Search" feature on a fashion app called "Aura." Your job is to uncover why they rejected the search results.

The Rules:

Do NOT act like a support bot. Do not say "I'm sorry to hear that."

Be proactive and specific. Reference the exact item they looked at or the action they took.

Ask "Leading Questions." Do not ask open-ended questions like "Why didn't you like it?" Instead, guess the reason. (e.g., "Was it too expensive?", "Was the style too formal?")

Pivot intelligently. If the user explains their taste, rephrase it into a "Product Insight" to confirm you understood the vibe.

The Scenario:

User Query: "Outfit for a job interview at a creative ad agency."

AI Results: Navy blue pant suits, pencil skirts, white button-downs (Very corporate/lawyer vibes).

User Action: The user scrolled for 3 seconds, frowned, and clicked "Clear Search."

Your Task: Start the conversation immediately by acknowledging they cleared the search. Ask a leading question about the "Formalness" of the results.

Step 2: The Conversation (How to run the Demo)
Once you paste the prompt above, ChatGPT will generate the opening line. Here is how you (playing the User) should respond to get the perfect "Wow" result.

ChatGPT (VoiceLoop): "I noticed you cleared the search results pretty quickly. Did the options feel a bit too 'corporate lawyer' for a creative agency interview?"

You (The User): "Yeah exactly. I need to look professional, but not stiff. I want to show some personality."

ChatGPT (VoiceLoop): "Got it. So you're looking for a 'Polished Creative' vibe—maybe a blazer with a print or a relaxed trouser—rather than a 'Traditional Corporate' suit. Is that right?"

You (The User): "Yes, that's exactly it."

ChatGPT (VoiceLoop): "Understood. We need to retune the 'Interview' tag to prioritize 'Style' over 'Formality' for creative roles. Thanks for the feedback!"

name is Lumin (not voiceloop)
## END OF SESSION
When done: "Any friction points to mention?"

Be minimal. Silence is better than unnecessary questions.`;
  var VoiceConnection = class {
    constructor() {
      this.pc = null;
      this.dc = null;
      this.audioStream = null;
      this.audioElement = null;
      this.callbacks = {};
      this.isMuted = false;
      this.systemPrompt = DEFAULT_SYSTEM_PROMPT;
      this.sessionConfigured = false;
    }
    setCallbacks(callbacks) {
      this.callbacks = callbacks;
    }
    async connect(token) {
      this.callbacks.onStatusChange?.("connecting");
      try {
        this.audioStream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            sampleRate: 24e3
          }
        });
        this.pc = new RTCPeerConnection();
        const audioTrack = this.audioStream.getAudioTracks()[0];
        this.pc.addTrack(audioTrack, this.audioStream);
        this.pc.ontrack = (event) => {
          this.audioElement = new Audio();
          this.audioElement.srcObject = event.streams[0];
          this.audioElement.play().catch(console.error);
          this.callbacks.onStatusChange?.("speaking");
        };
        this.dc = this.pc.createDataChannel("oai-events");
        this.dc.onopen = () => {
          console.log("Data channel opened");
          this.configureSession();
        };
        this.dc.onmessage = (event) => {
          this.handleRealtimeEvent(JSON.parse(event.data));
        };
        const offer = await this.pc.createOffer();
        await this.pc.setLocalDescription(offer);
        const baseUrl = "https://api.openai.com/v1/realtime";
        const model = "gpt-4o-realtime-preview-2024-12-17";
        const response = await fetch(`${baseUrl}?model=${model}`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/sdp"
          },
          body: offer.sdp
        });
        if (!response.ok) {
          throw new Error(`Failed to connect: ${response.status} ${response.statusText}`);
        }
        const answerSdp = await response.text();
        await this.pc.setRemoteDescription({
          type: "answer",
          sdp: answerSdp
        });
        this.callbacks.onStatusChange?.("listening");
        console.log("Voice connection established");
      } catch (error) {
        this.callbacks.onError?.(error);
        this.callbacks.onStatusChange?.("disconnected");
        throw error;
      }
    }
    handleRealtimeEvent(event) {
      switch (event.type) {
        case "session.created":
          console.log("Session created");
          break;
        case "session.updated":
          console.log("Session updated");
          break;
        case "input_audio_buffer.speech_started":
          break;
        case "input_audio_buffer.speech_stopped":
          break;
        case "conversation.item.input_audio_transcription.completed":
          if (event.transcript) {
            this.callbacks.onTranscript?.(event.transcript, "user");
          }
          break;
        case "response.audio_transcript.delta":
          break;
        case "response.audio_transcript.done":
          if (event.transcript) {
            this.callbacks.onTranscript?.(event.transcript, "ai");
          }
          break;
        case "response.audio.delta":
          this.callbacks.onStatusChange?.("speaking");
          break;
        case "response.audio.done":
          this.callbacks.onStatusChange?.("listening");
          break;
        case "response.done":
          this.callbacks.onStatusChange?.("listening");
          break;
        case "error":
          console.error("Realtime error:", event.error);
          this.callbacks.onError?.(new Error(event.error?.message || "Unknown error"));
          break;
      }
    }
    setSystemPrompt(prompt) {
      this.systemPrompt = prompt;
    }
    configureSession() {
      if (!this.dc || this.dc.readyState !== "open")
        return;
      this.sendEvent({
        type: "session.update",
        session: {
          instructions: this.systemPrompt,
          input_audio_transcription: {
            model: "whisper-1"
          },
          turn_detection: {
            type: "server_vad",
            threshold: 0.5,
            prefix_padding_ms: 300,
            silence_duration_ms: 500
          }
        }
      });
      this.sessionConfigured = true;
      console.log("Session configured with system prompt");
    }
    sendEvent(event) {
      if (this.dc && this.dc.readyState === "open") {
        this.dc.send(JSON.stringify(event));
      }
    }
    injectAction(actionType, target) {
      if (!this.dc || this.dc.readyState !== "open") {
        console.warn("Cannot inject action: data channel not open");
        return;
      }
      const actionText = `[USER ACTION ${actionType} ${target}]`;
      console.log("Injecting action context:", actionText);
      this.sendEvent({
        type: "conversation.item.create",
        item: {
          type: "message",
          role: "user",
          content: [
            {
              type: "input_text",
              text: actionText
            }
          ]
        }
      });
      this.sendEvent({
        type: "response.create"
      });
    }
    toggleMute() {
      if (this.audioStream) {
        const audioTrack = this.audioStream.getAudioTracks()[0];
        this.isMuted = !this.isMuted;
        audioTrack.enabled = !this.isMuted;
      }
      return this.isMuted;
    }
    getMuted() {
      return this.isMuted;
    }
    disconnect() {
      if (this.audioStream) {
        this.audioStream.getTracks().forEach((track) => track.stop());
        this.audioStream = null;
      }
      if (this.dc) {
        this.dc.close();
        this.dc = null;
      }
      if (this.pc) {
        this.pc.close();
        this.pc = null;
      }
      if (this.audioElement) {
        this.audioElement.pause();
        this.audioElement.srcObject = null;
        this.audioElement = null;
      }
      this.callbacks.onStatusChange?.("disconnected");
      console.log("Voice connection closed");
    }
  };

  // src/overlay.ts
  var STYLES = `
  #lumin-overlay {
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: 2147483647;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  #lumin-overlay * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  .lumin-panel {
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    border-radius: 16px;
    padding: 20px;
    min-width: 200px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1);
    color: white;
  }

  .lumin-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
  }

  .lumin-logo {
    width: 32px;
    height: 32px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 14px;
  }

  .lumin-title {
    font-size: 14px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.9);
  }

  .lumin-status {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 16px;
    padding: 12px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
  }

  .lumin-indicator {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #6b7280;
    transition: background 0.3s ease;
  }

  .lumin-indicator.connecting {
    background: #fbbf24;
    animation: lumin-pulse 1.5s ease-in-out infinite;
  }

  .lumin-indicator.listening {
    background: #10b981;
    animation: lumin-pulse 2s ease-in-out infinite;
  }

  .lumin-indicator.speaking {
    background: #3b82f6;
    animation: lumin-pulse 0.5s ease-in-out infinite;
  }

  .lumin-indicator.disconnected {
    background: #ef4444;
  }

  @keyframes lumin-pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.6; transform: scale(1.1); }
  }

  .lumin-status-text {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.8);
    flex: 1;
  }

  .lumin-controls {
    display: flex;
    gap: 10px;
  }

  .lumin-btn {
    flex: 1;
    padding: 10px 16px;
    border: none;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
  }

  .lumin-btn:hover {
    transform: translateY(-1px);
  }

  .lumin-btn:active {
    transform: translateY(0);
  }

  .lumin-btn-mute {
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .lumin-btn-mute:hover {
    background: rgba(255, 255, 255, 0.15);
  }

  .lumin-btn-mute.muted {
    background: #f59e0b;
    color: #1a1a2e;
    border-color: #f59e0b;
  }

  .lumin-btn-end {
    background: #ef4444;
    color: white;
  }

  .lumin-btn-end:hover {
    background: #dc2626;
  }

  .lumin-transcript {
    margin-top: 12px;
    max-height: 150px;
    overflow-y: auto;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    padding: 10px;
  }

  .lumin-transcript::-webkit-scrollbar {
    width: 4px;
  }

  .lumin-transcript::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 2px;
  }

  .lumin-transcript-entry {
    margin-bottom: 8px;
    line-height: 1.4;
  }

  .lumin-transcript-entry.user {
    color: #93c5fd;
  }

  .lumin-transcript-entry.ai {
    color: #c4b5fd;
  }

  .lumin-transcript-entry span {
    opacity: 0.6;
    font-size: 10px;
    margin-right: 6px;
  }

  /* Minimized state */
  .lumin-panel.minimized {
    min-width: auto;
    padding: 12px;
    cursor: pointer;
  }

  .lumin-panel.minimized .lumin-header,
  .lumin-panel.minimized .lumin-status,
  .lumin-panel.minimized .lumin-controls,
  .lumin-panel.minimized .lumin-transcript {
    display: none;
  }

  .lumin-minimize-indicator {
    display: none;
    align-items: center;
    gap: 8px;
  }

  .lumin-panel.minimized .lumin-minimize-indicator {
    display: flex;
  }
`;
  var VoiceOverlay = class {
    constructor() {
      this.callbacks = {};
      this.isMuted = false;
      this.isMinimized = false;
      this.injectStyles();
      this.container = document.createElement("div");
      this.container.id = "lumin-overlay";
      this.container.innerHTML = this.getHTML();
      document.body.appendChild(this.container);
      this.panel = this.container.querySelector(".lumin-panel");
      this.statusIndicator = this.container.querySelector(".lumin-indicator");
      this.statusText = this.container.querySelector(".lumin-status-text");
      this.muteBtn = this.container.querySelector(".lumin-btn-mute");
      this.endBtn = this.container.querySelector(".lumin-btn-end");
      this.transcriptContainer = this.container.querySelector(".lumin-transcript");
      this.muteBtn.addEventListener("click", () => this.handleMute());
      this.endBtn.addEventListener("click", () => this.handleEnd());
      this.panel.addEventListener("click", (e) => this.handlePanelClick(e));
    }
    injectStyles() {
      if (document.getElementById("lumin-styles"))
        return;
      const style = document.createElement("style");
      style.id = "lumin-styles";
      style.textContent = STYLES;
      document.head.appendChild(style);
    }
    getHTML() {
      return `
      <div class="lumin-panel">
        <div class="lumin-minimize-indicator">
          <div class="lumin-indicator connecting"></div>
          <span style="color: white; font-size: 12px;">Lumin</span>
        </div>
        <div class="lumin-header">
          <div class="lumin-logo">L</div>
          <div class="lumin-title">Voice Interview</div>
        </div>
        <div class="lumin-status">
          <div class="lumin-indicator connecting"></div>
          <span class="lumin-status-text">Connecting...</span>
        </div>
        <div class="lumin-controls">
          <button class="lumin-btn lumin-btn-mute">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
              <line x1="12" y1="19" x2="12" y2="23"></line>
              <line x1="8" y1="23" x2="16" y2="23"></line>
            </svg>
            Mute
          </button>
          <button class="lumin-btn lumin-btn-end">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
            End
          </button>
        </div>
        <div class="lumin-transcript"></div>
      </div>
    `;
    }
    setCallbacks(callbacks) {
      this.callbacks = callbacks;
    }
    setStatus(status) {
      this.statusIndicator.className = `lumin-indicator ${status}`;
      const minIndicator = this.container.querySelector(".lumin-minimize-indicator .lumin-indicator");
      if (minIndicator) {
        minIndicator.className = `lumin-indicator ${status}`;
      }
      const statusTexts = {
        disconnected: "Disconnected",
        connecting: "Connecting...",
        listening: "Listening...",
        speaking: "AI Speaking..."
      };
      this.statusText.textContent = statusTexts[status] || status;
    }
    addTranscript(text, speaker) {
      const entry = document.createElement("div");
      entry.className = `lumin-transcript-entry ${speaker}`;
      entry.innerHTML = `<span>${speaker === "user" ? "You" : "AI"}:</span>${text}`;
      this.transcriptContainer.appendChild(entry);
      this.transcriptContainer.scrollTop = this.transcriptContainer.scrollHeight;
    }
    handleMute() {
      this.isMuted = !this.isMuted;
      this.muteBtn.classList.toggle("muted", this.isMuted);
      this.muteBtn.innerHTML = this.isMuted ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
           <line x1="1" y1="1" x2="23" y2="23"></line>
           <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path>
           <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path>
           <line x1="12" y1="19" x2="12" y2="23"></line>
           <line x1="8" y1="23" x2="16" y2="23"></line>
         </svg>
         Unmute` : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
           <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
           <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
           <line x1="12" y1="19" x2="12" y2="23"></line>
           <line x1="8" y1="23" x2="16" y2="23"></line>
         </svg>
         Mute`;
      this.callbacks.onMute?.();
    }
    handleEnd() {
      this.callbacks.onEnd?.();
    }
    handlePanelClick(e) {
      if (this.isMinimized && e.target === this.panel) {
        this.expand();
      }
    }
    minimize() {
      this.isMinimized = true;
      this.panel.classList.add("minimized");
    }
    expand() {
      this.isMinimized = false;
      this.panel.classList.remove("minimized");
    }
    destroy() {
      this.container.remove();
      const styles = document.getElementById("lumin-styles");
      if (styles)
        styles.remove();
    }
  };

  // src/tracker.ts
  var ActionTracker = class {
    constructor() {
      this.ws = null;
      this.callbacks = {};
      this.reconnectAttempts = 0;
      this.maxReconnectAttempts = 3;
      this.apiEndpoint = "";
      this.sessionId = "";
      this.handleClick = (e) => {
        const target = e.target;
        if (!target)
          return;
        const targetInfo = this.getTargetInfo(target);
        this.track({
          action_type: "click",
          target: targetInfo,
          page_url: window.location.href,
          metadata: {
            tagName: target.tagName,
            id: target.id || void 0,
            className: target.className || void 0
          }
        });
      };
      this.handleNavigation = () => {
        this.track({
          action_type: "navigate",
          target: window.location.pathname,
          page_url: window.location.href,
          metadata: { method: "popstate" }
        });
      };
    }
    connect(apiEndpoint, sessionId) {
      this.apiEndpoint = apiEndpoint;
      this.sessionId = sessionId;
      const wsUrl = apiEndpoint.replace("http", "ws");
      const url = `${wsUrl}/session/${sessionId}/actions`;
      console.log(`Connecting action tracker to: ${url}`);
      try {
        this.ws = new WebSocket(url);
        this.ws.onopen = () => {
          console.log("Action tracker connected");
          this.reconnectAttempts = 0;
          this.callbacks.onConnectionChange?.(true);
        };
        this.ws.onclose = () => {
          console.log("Action tracker disconnected");
          this.callbacks.onConnectionChange?.(false);
          this.attemptReconnect();
        };
        this.ws.onerror = (error) => {
          console.error("Action tracker error:", error);
        };
        this.ws.onmessage = (event) => {
          console.log("Action tracker message:", event.data);
        };
      } catch (error) {
        console.error("Failed to connect action tracker:", error);
      }
      this.attachListeners();
    }
    attemptReconnect() {
      if (this.reconnectAttempts < this.maxReconnectAttempts) {
        this.reconnectAttempts++;
        console.log(`Reconnecting action tracker (attempt ${this.reconnectAttempts})...`);
        setTimeout(() => {
          this.connect(this.apiEndpoint, this.sessionId);
        }, 1e3 * this.reconnectAttempts);
      }
    }
    attachListeners() {
      document.addEventListener("click", this.handleClick, true);
      window.addEventListener("popstate", this.handleNavigation);
      this.interceptHistoryMethods();
    }
    interceptHistoryMethods() {
      const originalPushState = history.pushState.bind(history);
      const originalReplaceState = history.replaceState.bind(history);
      history.pushState = (...args) => {
        originalPushState(...args);
        this.track({
          action_type: "navigate",
          target: window.location.pathname,
          page_url: window.location.href,
          metadata: { method: "pushState" }
        });
      };
      history.replaceState = (...args) => {
        originalReplaceState(...args);
        this.track({
          action_type: "navigate",
          target: window.location.pathname,
          page_url: window.location.href,
          metadata: { method: "replaceState" }
        });
      };
    }
    getTargetInfo(element) {
      const text = element.innerText?.trim().slice(0, 50);
      if (text)
        return text;
      const ariaLabel = element.getAttribute("aria-label");
      if (ariaLabel)
        return ariaLabel;
      const title = element.getAttribute("title");
      if (title)
        return title;
      if (element instanceof HTMLInputElement) {
        return element.placeholder || element.name || element.tagName;
      }
      let identifier = element.tagName.toLowerCase();
      if (element.id)
        identifier += `#${element.id}`;
      else if (element.className)
        identifier += `.${element.className.split(" ")[0]}`;
      return identifier;
    }
    setCallbacks(callbacks) {
      this.callbacks = callbacks;
    }
    track(action) {
      const fullAction = {
        ...action,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      };
      console.log("Tracking action:", fullAction);
      if (this.ws?.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify(fullAction));
      }
      this.callbacks.onAction?.(fullAction);
    }
    disconnect() {
      document.removeEventListener("click", this.handleClick, true);
      window.removeEventListener("popstate", this.handleNavigation);
      if (this.ws) {
        this.ws.close();
        this.ws = null;
      }
      console.log("Action tracker disconnected");
    }
  };

  // src/index.ts
  var LuminSDK = class {
    constructor(options) {
      this.overlay = null;
      this.config = null;
      this.sessionId = null;
      this.callbacks = {};
      this.showOverlay = true;
      this.trackActions = true;
      this.voice = new VoiceConnection();
      this.tracker = new ActionTracker();
      this.showOverlay = options?.showOverlay ?? true;
      this.trackActions = options?.trackActions ?? true;
      if (options?.systemPrompt) {
        this.voice.setSystemPrompt(options.systemPrompt);
      }
    }
    setCallbacks(callbacks) {
      this.callbacks = callbacks;
    }
    async start(apiEndpoint, sessionId) {
      this.config = { apiEndpoint };
      this.sessionId = sessionId;
      console.log(`Starting Lumin SDK for session: ${sessionId}`);
      if (this.trackActions) {
        this.tracker.setCallbacks({
          onAction: (action) => {
            console.log("User action:", action);
            this.callbacks.onAction?.(action);
            this.voice.injectAction(action.action_type, action.target);
          }
        });
        this.tracker.connect(apiEndpoint, sessionId);
      }
      if (this.showOverlay) {
        this.overlay = new VoiceOverlay();
        this.overlay.setCallbacks({
          onMute: () => {
            this.toggleMute();
          },
          onEnd: () => {
            this.end();
          }
        });
      }
      this.voice.setCallbacks({
        onStatusChange: (status) => {
          console.log(`Voice status: ${status}`);
          this.overlay?.setStatus(status);
          this.callbacks.onStatusChange?.(status);
        },
        onTranscript: (text, speaker) => {
          console.log(`[${speaker.toUpperCase()}]: ${text}`);
          this.overlay?.addTranscript(text, speaker);
          this.callbacks.onTranscript?.(text, speaker);
          this.storeTranscript(text, speaker);
        },
        onError: (error) => {
          console.error("Voice error:", error);
          this.callbacks.onError?.(error);
        }
      });
      const tokenUrl = `${apiEndpoint}/session/${sessionId}/token`;
      console.log(`Fetching token from: ${tokenUrl}`);
      const res = await fetch(tokenUrl);
      if (!res.ok) {
        throw new Error(`Failed to get token: ${res.status} ${res.statusText}`);
      }
      const { token } = await res.json();
      console.log("Got ephemeral token");
      await this.voice.connect(token);
      console.log("Voice connected!");
    }
    toggleMute() {
      return this.voice.toggleMute();
    }
    isMuted() {
      return this.voice.getMuted();
    }
    storeTranscript(text, speaker) {
      if (!this.config?.apiEndpoint || !this.sessionId)
        return;
      const entry = {
        text,
        speaker,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      };
      fetch(`${this.config.apiEndpoint}/session/${this.sessionId}/transcript`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry)
      }).catch((err) => {
        console.warn("Failed to store transcript:", err);
      });
    }
    end() {
      this.voice.disconnect();
      this.tracker.disconnect();
      this.overlay?.destroy();
      this.overlay = null;
      this.callbacks.onEnd?.();
      console.log("Session ended");
    }
  };
  window.LuminSDK = LuminSDK;
  var initFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("lumin_session");
    if (sessionId && window.LuminConfig?.apiEndpoint) {
      console.log("Auto-initializing Lumin SDK from URL");
      const sdk = new LuminSDK({ showOverlay: true });
      sdk.start(window.LuminConfig.apiEndpoint, sessionId).catch(console.error);
    }
  };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initFromUrl);
  } else {
    initFromUrl();
  }
})();
//# sourceMappingURL=lumin-sdk.js.map
