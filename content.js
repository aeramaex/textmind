const t = ["utf8", ".js", "node_modules", ".myClass", "#myId", "[", "path", "fs", "system", "ai", "resize", "scroll", "mouseup", "mousedown", "checkContext", "visible", "visibilitychange", "beforeunload", "sa-chat-message", "div", "#sa-chat-history", "sa-visible", "Chat dock state saved for tab:", "#sa-chat-input", "reinitialize", "Fetching image through background script:", "http", ":", "Using data URL directly", "data:", "Original image URL:", "analyzeImage", "openChatDock", "none", "toggleTooltip", "disabledWebsites", "tooltipEnabled", "output", "Error in handleTranslate:", "Translation", "english", "targetLanguage", "loading", "translate", "search", "sa-tooltip-button", "click", "select-act-tooltip-buttons-default", "_blank", "google", "settings", "1", "hidden", "0", "DOMContentLoaded", "sa-icon", "span", "plus", "move", "send", "copy", "edit", "sparkles", "x", "panel-right-open", "arrow-left", "mousemove", "grab", "#sa-chat-drag-handle", "auto", "grabbing", "120px", "sa-button-copied", "default", "#sa-output-copy-btn", "#sa-copy-btn", "Fallback copy method failed: ", "Clipboard API copy failed: ", "string", "#sa-chat-send-btn", "inline-flex", ".sa-btn-loader", ".sa-btn-text", "smooth", "translateY(0)", "translateY(10px)", "20px", "text", "#select-act-tooltip-output", "input", "#select-act-tooltip-input", "sa-loading-mode", "sa-output-mode", "sa-input-mode", "AI Response", "flex", "block", "#select-act-tooltip-loading-overlay", "#select-act-tooltip-input-container", "#select-act-tooltip-buttons-default", "#sa-tooltip-dock-btn", "#sa-tooltip-back-btn", "#sa-tooltip-title", "#select-act-tooltip-footer", "#select-act-tooltip-header", "transitionend", "opacity", "Enter", "Escape", "Assistant", "User", "user", "ask", "Error", "Custom Prompt", "Error in handleExplain:", "Summary", "explainPrompt", "explain", ": ", "AIzaSyAwlPdEOv-erinGyIIrofiII_-s47c8pKM", "fixed", "number", ".search-box", ".search-container", "searchbox", "search-input", "gLFyf", "combobox", "role", "textbox", "form", " ", "$1 ", "select-act-tooltip-input", ".sa-ignore-selection", "t hide\n        const isClickOnTooltipInput = currentTooltipState === ", "#sa-chat-header", "keydown", "#sa-chat-new-btn", "#sa-chat-close-btn", "#sa-tooltip-close-btn-header", "#sa-input-close-btn", "#sa-input-send-btn", "#sa-input-back-btn", "#sa-close-btn-default", "#sa-search-btn", "#sa-translate-btn", "#sa-ask-btn", "#sa-explain-btn", "undefined", "sa-ignore-selection", "select-act-tooltip", "select-act-chat-dock", "Chrome API error:", "Extension context invalidated", "use strict"]; let e = null, n = null, o = null, i = !1, s = !1, r = t[73], a = null, l = !1, c = { x: 0, y: 0 }, d = null, u = null, p = !1, y = !1, h = null, m = !0, g = !1, f = [], v = !0, b = { isVisible: !1, position: { x: null, y: null }, size: { width: null, height: null }, chatHistory: [], wasExplicitlyOpened: !1 }, x = null, w = !1; const L = { DEFAULT: { EXPLAIN: "Summarize the selected text clearly and concisely in 100 words or less. Focus on the main points and key ideas.", TRANSLATE: 'Translate the following text to {targetLanguage}. If the text is already in {targetLanguage} Respond as "Text already in language name" Dont have to repeat the text. Text to be translated: "{text}" Response must only contain translated text', CUSTOM: 'context: "{text}"\n\nUser question: "{prompt}"\n\n Please provide a detailed response if user question not clear. Response Output -> Response only', SYSTEM: 'When the button is clicked, perform the exact task described in the prompt without deviation. If the selected text lacks clarity or sufficient context, prompt the user to press the "Dock Chat" button to provide more information. Only request clarification when absolutely necessary. Respond with a single, complete answer—do not initiate or continue a conversation.' }, formatPrompt: { explain: (t, e) => `${L.DEFAULT.SYSTEM} Prompt: ${e || L.DEFAULT.EXPLAIN} Selected Text: ${t}`, translate: (t, e) => L.DEFAULT.TRANSLATE.replace("{targetLanguage}", e).replace("{text}", t), custom: (t, e) => L.DEFAULT.CUSTOM.replace("{text}", t).replace("{prompt}", e) } }; function E() { try { return !(typeof chrome === t[150] || !chrome.runtime || !chrome.runtime.id) || (v = !1, !1) } catch (t) { return v = !1, !1 } } function S(e) { if (E()) try { e() } catch (e) { e.message.includes(t[155]) && (v = !1) } }
const T = 150, k = "This is a dummy AI explanation. Replace with real API call when ready.", C = 1e3, q = t[153], M = t[152], H = 50, A = 320, I = 390; function $() { try { zt(), document.getElementById(M) || O(), document.getElementById(q) || z(), Bt(), P(), Pt() } catch (t) { setTimeout((() => { try { $() } catch (t) { } }), 1e3) } } function P() { S((() => { typeof chrome !== t[150] && chrome.storage && chrome.storage.sync && chrome.storage.sync.get([t[36]], (function (t) { m = !1 !== t.tooltipEnabled })) })) } function O() { document.getElementById(M) || (e = document.createElement(t[19]), e.id = M, e.classList.add(t[151]), e.style.width = "320px", e.innerHTML = `\n        <div id="select-act-tooltip-header" style="padding: 1px 6px;">\n             <button id="sa-tooltip-back-btn" class="sa-tooltip-button" title="Back">${wt(t[65]).outerHTML}</button>\n             <span id="sa-tooltip-title"></span>\n             <button id="sa-tooltip-dock-btn" class="sa-tooltip-button" title="Dock Chat">${wt(t[64]).outerHTML}</button>\n             <button id="sa-tooltip-close-btn-header" class="sa-tooltip-button" title="Close Tooltip">${wt(t[63]).outerHTML}</button>\n        </div>\n        <div id="select-act-tooltip-content" style="padding: 4px 0;">\n            \x3c!-- Default Buttons --\x3e\n            <div id="select-act-tooltip-buttons-default" style="gap: 0px; padding: 0 4px;">\n                <button id="sa-explain-btn" class="sa-tooltip-button" title="Summarize Selection" style="padding: 4px 6px;">\n                    ${wt(t[62]).outerHTML} Summarize\n                </button>\n                <button id="sa-ask-btn" class="sa-tooltip-button" title="Custom Prompt" style="padding: 4px 4px;">\n                    ${wt(t[61]).outerHTML} Ask\n                </button>\n                <button id="sa-translate-btn" class="sa-tooltip-button" title="Translate" style="padding: 4px 4px;">\n                    ${wt(t[43]).outerHTML} Translate\n                </button>\n                <button id="sa-copy-btn" class="sa-tooltip-button" title="Copy Selection" style="padding: 4px 3px;">\n                    ${wt(t[60]).outerHTML}\n                </button>\n                <button id="sa-search-btn" class="sa-tooltip-button" title="Search Web" style="padding: 4px 3px;">\n                    ${wt(t[44]).outerHTML}\n                </button>\n                <button id="sa-close-btn-default" class="sa-tooltip-button" title="Close Tooltip" style="padding: 4px 3px;">${wt(t[63]).outerHTML}</button>\n            </div>\n            \x3c!-- Input UI (Combined Horizontal Layout) --\x3e\n            <div id="select-act-tooltip-input-container" style="padding: 4px;">\n                <button id="sa-input-back-btn" class="sa-tooltip-button sa-input-button" title="Back">\n                    ${wt(t[65]).outerHTML}\n                </button>\n                <textarea id="select-act-tooltip-input" placeholder="Enter custom prompt..." rows="1"></textarea>\n                <button id="sa-input-send-btn" class="sa-tooltip-button sa-input-button" title="Send Prompt">\n                     ${wt(t[59]).outerHTML}\n                </button>\n                 <button id="sa-input-close-btn" class="sa-tooltip-button sa-input-button" title="Close Tooltip">${wt(t[63]).outerHTML}</button>\n            </div>\n             \x3c!-- Output Area --\x3e\n            <div id="select-act-tooltip-output" style="padding: 8px;">\n                </div>\n            \x3c!-- Loading Spinner (Covers whole tooltip content) --\x3e\n            <div id="select-act-tooltip-loading-overlay">\n                <div class="sa-spinner"></div>\n            </div>\n        </div>\n         <div id="select-act-tooltip-footer" style="padding: 2px 6px;">\n             <button id="sa-output-copy-btn" class="sa-tooltip-button" title="Copy Response">${wt(t[60]).outerHTML}</button>\n             <div class="sa-powered-by" id="sa-powered-by-footer">\n                <span id="sa-powered-by-text">Powered by Gemini</span>\n                <img src="${chrome.runtime.getURL("icons/gemini.png")}" alt="Gemini" class="sa-gemini-logo">\n             </div>\n         </div>\n    `, document.body.appendChild(e), D(), rt(t[73])) } function z() { document.getElementById(q) || (n = document.createElement(t[19]), n.id = q, n.classList.add(t[151]), n.innerHTML = `\n        <div id="sa-chat-header">\n            <span id="sa-chat-drag-handle">\n                 ${wt(t[58]).outerHTML}\n                 <div class="sa-chat-title-container">\n                    <img src="${chrome.runtime.getURL("icons/icon128.png")}" alt="SmartSelect Ai" class="sa-chat-logo">\n                    <span id="sa-chat-title">SmartSelect Ai Chat</span>\n                 </div>\n            </span>\n            <div class="sa-chat-header-buttons">\n                <button id="sa-chat-new-btn" class="sa-tooltip-button" title="New Chat">\n                    ${wt(t[57]).outerHTML}\n                </button>\n                <button id="sa-chat-close-btn" class="sa-tooltip-button" title="Close Chat">\n                    ${wt(t[63]).outerHTML}\n                </button>\n            </div>\n        </div>\n        <div id="sa-chat-history">\n            \x3c!-- Chat messages will be added here --\x3e\n        </div>\n        <div id="sa-chat-input-area">\n            <textarea id="sa-chat-input" placeholder="Ask a follow-up..." rows="1"></textarea>\n            <button id="sa-chat-send-btn" class="sa-tooltip-button" title="Send Message">\n                <span class="sa-btn-text">${wt(t[59]).outerHTML}</span>\n                <span class="sa-btn-loader" style="display:none;"><div class="sa-spinner sa-spinner-small"></div></span>\n            </button>\n        </div>\n    `, document.body.appendChild(n), N(), B()) } function B() { if (!n) return; let e, o, i, s, r = !1; const a = t => { if (!r) return; const a = i + (t.clientX - e), l = s + (t.clientY - o), c = .9 * window.innerHeight; n.style.width = `${Math.min(Math.max(a, 300), 800)}px`, n.style.height = `${Math.min(Math.max(l, 400), c)}px` }, l = () => { r = !1, document.removeEventListener(t[66], a), document.removeEventListener(t[12], l) }; n.addEventListener(t[13], (c => { const d = n.getBoundingClientRect(); c.clientX > d.right - 15 && c.clientY > d.bottom - 15 && (r = !0, e = c.clientX, o = c.clientY, i = n.offsetWidth, s = n.offsetHeight, document.addEventListener(t[66], a), document.addEventListener(t[12], l), c.preventDefault()) })) } function R() { document.addEventListener(t[13], U, !0), document.addEventListener(t[12], yt(F, T)), window.addEventListener(t[11], Lt, { passive: !0 }), window.addEventListener(t[10], j, { passive: !0 }), S((() => { typeof chrome !== t[150] && chrome.runtime && chrome.runtime.onMessage && chrome.runtime.onMessage.addListener(((e, n, o) => { e.action === t[34] && (m = e.enabled, m || st()) })) })) } function D() { e.querySelector(t[149]).addEventListener(t[46], W), e.querySelector(t[148]).addEventListener(t[46], _), e.querySelector(t[147]).addEventListener(t[46], Ct), e.querySelector(t[75]).addEventListener(t[46], G), e.querySelector(t[146]).addEventListener(t[46], J), e.querySelector(t[145]).addEventListener(t[46], st), e.querySelector(t[144]).addEventListener(t[46], (() => { p || rt(t[73]) })), e.querySelector(t[143]).addEventListener(t[46], Q), e.querySelector(t[90]).addEventListener(t[89], ft), e.querySelector(t[90]).addEventListener(t[138], nt), e.querySelector(t[142]).addEventListener(t[46], (() => { p || st() })), e.querySelector(t[101]).addEventListener(t[46], (() => { p || rt(t[73]) })), e.querySelector(t[100]).addEventListener(t[46], tt), e.querySelector(t[74]).addEventListener(t[46], Z), e.querySelector(t[141]).addEventListener(t[46], (() => { p || st() })), e.addEventListener(t[13], (t => t.stopPropagation())) } function N() { n.querySelector(t[140]).addEventListener(t[46], ct), n.querySelector(t[139]).addEventListener(t[46], It), n.querySelector(t[79]).addEventListener(t[46], et), n.querySelector(t[23]).addEventListener(t[89], ft), n.querySelector(t[23]).addEventListener(t[138], ot); n.querySelector(t[137]).addEventListener(t[13], vt), n.addEventListener(t[13], (t => t.stopPropagation())) } function U(t) { if (i && !e.contains(t.target) && !p) { "input" === r && t.target === e.querySelector("#select-act-tooltip-input") || st() } } function F(n) {
    // Avoid triggering tooltip inside text fields or contenteditable areas
    if (n.target.closest('input, textarea, [contenteditable]')) return;
    if (p || !m) return; if (p || n.target.closest(t[135])) return void (i && r === t[89] && e.contains(n.target) && n.target.id); const s = window.getSelection(); if (!s || 0 === s.rangeCount) return; let l = s.toString().trim(); if (l = l.replace(/\s+/g, t[132]).replace(/\n+/g, t[132]).replace(/\s*([.,!?])\s*/g, t[133]).replace(/\s{2,}/g, t[132]).trim(), !l) return; const c = e => { if (!e) return !1; const n = "INPUT" === e.tagName || "TEXTAREA" === e.tagName || e.isContentEditable, o = null !== e.closest(t[131]), i = e.getAttribute(t[129]) === t[130] || e.getAttribute(t[129]) === t[125] || e.getAttribute(t[129]) === t[128], s = e.classList.contains(t[127]) || e.id === t[44] || e.id === t[125] || e.classList.contains(t[126]) || e.classList.contains(t[125]), r = null !== e.closest('[role="search"]') || null !== e.closest(t[124]) || null !== e.closest(t[123]); return n || o || i || s || r }; if (c(n.target) || s.anchorNode && c(s.anchorNode.parentElement)) return void (i && st()); const d = e ? e.querySelector(t[88]) : null; if (d && d.contains(s.anchorNode)) return; const u = s.getRangeAt(s.rangeCount - 1); if (!u) return; if (!u.endContainer || !u.endOffset) return; let y, h; o = l; try { const e = document.createRange(), n = u.startOffset > u.endOffset, o = n ? u.startContainer : u.endContainer, s = n ? u.startOffset : u.endOffset; e.setStart(o, s), e.collapse(!0); const r = e.getClientRects(); if (r && r.length > 0) { const e = r[r.length - 1]; if (!e || typeof e.left !== t[122] || typeof e.bottom !== t[122]) throw new Error("Invalid rect dimensions"); y = e.left, h = e.bottom } else { const e = u.getBoundingClientRect(); if (!e || typeof e.right !== t[122] || typeof e.bottom !== t[122]) throw new Error("Invalid fallback rect dimensions"); y = n ? e.left : e.right, h = e.bottom } if (typeof y !== t[122] || typeof h !== t[122] || isNaN(y) || isNaN(h)) throw new Error("Invalid anchor position"); a = { x: y + window.scrollX, y: h + window.scrollY }, i && st(), requestAnimationFrame((() => { it(!0) })) } catch (t) { return void (i && !p && st()) }
} const j = yt((() => { i && a && !p && !y && X() }), H); function X() { i && a && e && requestAnimationFrame((() => { if (!i || !a || !e || p) return; const n = e.getBoundingClientRect(), o = window.innerWidth, s = window.innerHeight, r = window.scrollX, l = window.scrollY; let c = a.x - r, d = a.y - l, u = c, y = d + 10; const h = c - n.width / 2, m = 15; u = h >= m && h + n.width <= o - m ? h : c + n.width > o - m ? c - n.width : c, u < m && (u = m), u + n.width > o - m && (u = o - n.width - m >= m ? o - n.width - m : m); const g = s - d - m, f = d - m, v = n.height; y = g >= v ? d + 10 : f >= v ? d - v - 10 : g >= f ? s - v - m : m, e.style.position = t[121], e.style.left = `${u}px`, e.style.top = `${y}px`, e.style.transform = t[33], i && !p && (e.style.opacity = t[51], e.style.visibility = t[15], e.classList.add(t[21])) })) } function Y(t) { return t ? t.replace(/[_*`>#-]/g, "") : "" } async function V(e) { const n = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${t[120]}`, o = { contents: [{ parts: [{ text: e }] }], generationConfig: { temperature: .7, topP: 1, responseMimeType: "text/plain" } }; try { const t = await fetch(n, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(o) }), e = await t.json(); return Y(e?.candidates?.[0]?.content?.parts?.[0]?.text || "No response") } catch (t) { throw t } } async function W() { if (o && !p) try { u = t[118], p = !0, rt(t[42]); const e = (await chrome.storage.sync.get([t[117]])).explainPrompt || L.DEFAULT.EXPLAIN, n = o.toString().trim(), i = L.formatPrompt.explain(n, e); at(await V(i)), rt(t[37], t[116]) } catch (e) { at(`Error: ${e.message}`), rt(t[37], t[113]) } finally { p = !1, u = null } } function _() { p || (rt(t[89]), setTimeout((() => { const n = e.querySelector(t[90]); n && n.focus() }), 50)) } function G() { if (o && !p) try { const t = o instanceof Range ? o : o.getRangeAt(0), e = document.createElement("div"); e.style.position = "absolute", e.style.left = "-9999px", document.body.appendChild(e), e.appendChild(t.cloneContents()); const n = e.innerText.trim(); if (document.body.removeChild(e), !n) return; navigator.clipboard.writeText(n).then((() => { gt() })).catch((t => { K(n) })) } catch (t) { K(o.toString().trim()) } } function K(t) { const e = window.getSelection()?.toString(); e && "" !== e.trim() && (navigator.clipboard && window.isSecureContext ? navigator.clipboard.writeText(e).then((() => { gt?.() })).catch((t => { fallbackCopySelectedText() })) : fallbackCopySelectedText()) } function J() { if (!o || p) return; St(o.toString()), p || st() } async function Q() { if (!o || p) return; const n = e.querySelector(t[90]), s = n ? n.value.trim() : ""; if (!s) return; p = !0, u = t[112], rt(t[42]); const r = o.toString(); try { const e = L.formatPrompt.custom(r, s), o = await V(e); if (!i || u !== t[112]) return; at(ht(o)), rt(t[37], t[114]), n && (n.value = "") } catch (e) { i && u === t[112] && (at("Error processing prompt. Please try again."), rt(t[37], t[113])) } finally { u === t[112] && (p = !1, u = null), pt() } } function Z() { if (p) return; const n = e.querySelector(t[88]); if (!n) return; let o = n.innerText || n.textContent || ""; o = o.replace(k, "").trim(), mt(o, "Response copied!"); const i = e.querySelector(t[74]); if (i) { const e = i.innerHTML; i.innerHTML = "Copied!", i.disabled = !0, i.classList.add(t[72]), setTimeout((() => { i && (i.innerHTML = e, i.disabled = !1, i.classList.remove(t[72])) }), 1500) } } function tt() { if (!n || p) return; if (!n.querySelector(t[20])) return; let i = ""; if (r === t[37]) { const n = e.querySelector(t[88]); n && (i = (n.innerText || n.textContent || "").replace(k, "").trim()) } if (r === t[37] && i) { const e = o ? o.toString() : ""; e && dt(ht(e), t[111]), i && dt(ht(i), t[9]) } else if (o) { dt(ht(o.toString()), t[111]) } else dt("Chat opened.", t[8]); lt(), p || st() } async function et() { if (!n) return; const e = n.querySelector(t[23]), o = n.querySelector(t[79]); if (!e || !o) return; const i = e.value.trim(); if (i && !o.disabled) { dt(ht(i), t[111]), e.value = "", ft({ target: e }), ut(o, !0); try { let e = ""; f.length > 0 && (e = "You are a helpfull assistant. Your output must only contain response text. In the response dont use Assistant: \n", f.forEach((n => { e += `${n.role === t[111] ? t[110] : t[109]}: ${n.content}\n` })), e += "\nCurrent question: "); dt(ht(await V(e + i)), t[9]) } catch (e) { dt("Sorry, I couldn't get a response. Please try again.", t[9]) } finally { ut(o, !1); const e = n.querySelector(t[20]); e && e.scrollTo({ top: e.scrollHeight, behavior: t[83] }) } } } function nt(e) { p || (e.key !== t[107] || e.shiftKey || (e.preventDefault(), Q()), e.key === t[108] && (e.stopPropagation(), r !== t[42] && rt(t[73]))) } function ot(e) { e.key !== t[107] || e.shiftKey || (e.preventDefault(), et()) } function it(n = !0) { if (e || O(), e && a) { if (n) { r = t[73]; const n = e.querySelector(t[90]); n && (n.value = "", ft({ target: n })), rt(t[73]) } if (i = !0, y = !1, e.style.opacity = t[51], e.style.visibility = t[15], e.classList.add(t[21]), p) { const n = e.querySelector(t[97]); n && (n.style.display = t[95]), X() } else X() } } function st() { if (e && i && !p) { i = !1, y = !1, h && (clearTimeout(h), h = null), e.style.opacity = t[53], e.style.visibility = t[52], e.classList.remove(t[21]), d && (clearTimeout(d), d = null); const n = o => { if (o.target === e && o.propertyName === t[106] && (e.removeEventListener(t[105], n), !i && e)) { const n = e.querySelector(t[90]); n && (n.value = "", ft({ target: n })), r = t[73] } }; e.addEventListener(t[105], n), setTimeout((() => { if (e.removeEventListener(t[105], n), e && !i && e.style.opacity === t[53]) { const n = e.querySelector(t[90]); n && (n.value = ""), r = t[73] } }), 300), r !== t[42] && rt(t[73]) } } function rt(n, o = "") { if (!e) return; const s = e.querySelector(t[104]), a = e.querySelector(t[103]), l = e.querySelector(t[102]), c = e.querySelector(t[101]), d = e.querySelector(t[100]), u = e.querySelector(t[88]), y = e.querySelector(t[99]), h = e.querySelector(t[98]), m = e.querySelector(t[97]), g = r; if (r = n, e.classList.remove(t[93], t[92], t[91]), s.style.display = n === t[37] ? t[95] : t[33], a.style.display = n === t[37] ? t[95] : t[33], u.style.display = n === t[37] ? t[96] : t[33], y.style.display = n === t[73] ? t[95] : t[33], h.style.display = n === t[89] ? t[95] : t[33], m.style.display = n === t[42] ? t[95] : t[33], n === t[37] ? (c && (c.style.display = t[80]), d && (d.style.display = t[80]), l && (l.textContent = o || t[94])) : (c && (c.style.display = t[33]), d && (d.style.display = t[33])), n === t[89]) { e.classList.add(t[93]); const n = e.querySelector(t[90]); n && (g !== t[89] && (n.value = ""), ft({ target: n })) } else if (n === t[37]) { if (e.classList.add(t[92]), g === t[89]) { const n = e.querySelector(t[90]); n && (n.value = "", ft({ target: n })) } } else if (n === t[42]) { if (e.classList.add(t[91]), e.style.opacity = t[51], e.style.visibility = t[15], e.classList.add(t[21]), g === t[89]) { const n = e.querySelector(t[90]); n && (n.value = "") } } else { if (g === t[89]) { const n = e.querySelector(t[90]); n && (n.value = "", ft({ target: n })) } i && (e.style.opacity = t[51], e.style.visibility = t[15], e.classList.add(t[21])) } !i || g === n && n !== t[42] && n !== t[89] && n !== t[37] ? i && !p && X() : requestAnimationFrame((() => { i && X() })) } function at(n) { if (!e) return; const o = e.querySelector(t[88]); o && (o.innerHTML = n, o.style.userSelect = t[87], o.style.webkitUserSelect = t[87], o.style.mozUserSelect = t[87], o.style.msUserSelect = t[87], o.scrollTop = 0) } function lt() { n || z(), n && (n.style.left || n.style.top || (n.style.right = t[86], n.style.top = t[86], n.style.left = t[69], n.style.bottom = t[69]), n.classList.add(t[21]), s = !0, b.isVisible = !0, b.wasExplicitlyOpened = !0, $t(), setTimeout((() => { const e = n.querySelector(t[23]); e && e.focus() }), 200)) } function ct() { n && s && (n.classList.remove(t[21]), s = !1, b.isVisible = !1, b.wasExplicitlyOpened = !1, $t(), f = []) } function dt(e, o) { if (!n) return; const i = n.querySelector(t[20]); if (!i) return; const s = document.createElement(t[19]); s.classList.add(t[18], `sa-${o}`); const r = e.replace(/<strong>.*?<\/strong><br>/g, ""); s.innerHTML = r, f.push({ role: o, content: r }), b.chatHistory || (b.chatHistory = []), b.chatHistory.push({ role: o, content: r }), $t(), s.style.opacity = t[53], s.style.transform = t[85], i.appendChild(s), requestAnimationFrame((() => { s.style.transition = "opacity 0.2s ease, transform 0.2s ease", s.style.opacity = t[51], s.style.transform = t[84] })), i.scrollTo({ top: i.scrollHeight, behavior: t[83] }) } function ut(e, n) { if (!e) return; const o = e.querySelector(t[82]), i = e.querySelector(t[81]); n ? (o && (o.style.display = t[33]), i && (i.style.display = t[80]), e.disabled = !0) : (o && (o.style.display = t[80]), i && (i.style.display = t[33]), e.disabled = !1) } function pt() { const e = n ? n.querySelector(t[79]) : null; e && ut(e, !1) } function yt(t, e) { let n; return function (...o) { const i = this; clearTimeout(n), n = setTimeout((() => { clearTimeout(n), n = null, t.apply(i, o) }), e), t === j && (d = n) } } function ht(e) { return typeof e !== t[78] ? "" : e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;") } async function mt(e, n = "Copied!") { try { if (!navigator.clipboard || !navigator.clipboard.writeText) throw window.isSecureContext, new Error("Clipboard API (writeText) not available or not permitted."); await navigator.clipboard.writeText(e), gt() } catch (n) { try { const n = document.createElement("textarea"); n.value = e, n.style.position = "fixed", n.style.top = "-9999px", n.style.left = "-9999px", document.body.appendChild(n), n.focus(), n.select(); let o = !1; try { o = document.execCommand(t[60]) } catch (t) { o = !1 } if (document.body.removeChild(n), !o) throw new Error("execCommand copy returned false or threw error."); gt() } catch (t) { alert("Failed to copy text. Please try copying manually.\nEnsure you have granted clipboard permissions if prompted.") } } } function gt() { let n = null; if (i && e && !p) { const o = e.querySelector(t[75]); e.querySelector(t[74]); r === t[73] && o && (n = o) } if (n) { const e = n.innerHTML, o = e.match(/<svg.*?>.*?<\/svg>/)?.[0] || ""; n.innerHTML = `${o} Copied!`, n.disabled = !0, n.classList.add(t[72]), setTimeout((() => { n && (n.innerHTML = e, n.disabled = !1, n.classList.remove(t[72])) }), 1500) } } function ft(n) { const o = n.target; if (!o || "TEXTAREA" !== o.nodeName) return; const s = window.getComputedStyle(o), r = o.style.height; o.style.height = t[69]; const a = o.scrollHeight, l = s.maxHeight, c = l && l !== t[33] ? parseInt(l, 10) : 1 / 0, d = `${Math.min(a, c)}px`; o.style.height = d, r !== d && i && e.contains(o) && !p && requestAnimationFrame((() => { i && !p && X() })) } function vt(e) { if (e.target.closest("button#sa-chat-close-btn")) return; const o = n.querySelector(t[68]); if (!o || !o.contains(e.target)) return; if (!n) return; e.preventDefault(), l = !0, n.style.cursor = t[70], document.body.style.cursor = t[70], document.body.style.userSelect = t[33]; const i = n.getBoundingClientRect(); c = { x: e.clientX - i.left, y: e.clientY - i.top }, document.addEventListener(t[66], bt), document.addEventListener(t[12], xt, { once: !0 }) } function bt(e) { if (!l || !n) return; let o = e.clientX - c.x, i = e.clientY - c.y; const s = n.offsetWidth, r = n.offsetHeight, a = window.innerWidth, d = window.innerHeight; o = Math.max(5, o), i = Math.max(5, i), o = Math.min(a - s - 5, o), i = Math.min(d - r - 5, i), n.style.left = `${o}px`, n.style.top = `${i}px`, n.style.right = t[69], n.style.bottom = t[69], $t() } function xt() { if (l) { if (l = !1, n) { n.querySelector(t[68]); n.style.cursor = "" } document.body.style.cursor = "", document.body.style.userSelect = "", document.removeEventListener(t[66], bt) } } function wt(e) { const n = document.createElement(t[56]); return n.className = t[55], n.innerHTML = { "arrow-left": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>', "panel-right-open": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="3" x2="9" y2="21"/><path d="M14 9l3 3-3 3"/></svg>', x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>', sparkles: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3 7h7l-6 4 3 7-7-4-7 4 3-7-6-4h7z"/></svg>', edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>', copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>', search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>', send: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>', move: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/><circle cx="12" cy="19" r="1"/><circle cx="12" cy="5" r="1"/></svg>', translate: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/></svg>', plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>' }[e] || "", n } function Lt() { i && !p && (y || (y = !0, e.style.opacity = t[53], e.style.visibility = t[52], e.classList.remove(t[21])), h && clearTimeout(h), h = setTimeout((() => { y = !1, i && !p && (e.style.opacity = t[51], e.style.visibility = t[15], e.classList.add(t[21]), X()) }), 150)) } function Et(e) { S((() => { chrome.storage.sync.get([t[50]], (function (n) { const o = { searchEngine: t[49], explainPrompt: L.DEFAULT.EXPLAIN }; e(n.settings || o) })) })) } function St(e) { Et((function (n) { const o = { google: "https://www.google.com/search?q=", bing: "https://www.bing.com/search?q=", duckduckgo: "https://duckduckgo.com/?q=", brave: "https://search.brave.com/search?q=", yahoo: "https://search.yahoo.com/search?p=" }[n.searchEngine] + encodeURIComponent(e); window.open(o, t[48]) })) } function Tt(t) { Et((function (t) { t.explainPrompt || L.DEFAULT.EXPLAIN })) } function kt(t, e) { Et((function (n) { (n.customPrompt || L.DEFAULT.CUSTOM).replace("{text}", t).replace("{prompt}", e) })) } async function Ct() { if (o && !p) try { u = t[43], p = !0, rt(t[42]); const e = o.toString().trim(), n = (await chrome.storage.sync.get([t[41]])).targetLanguage || t[40], i = L.formatPrompt.translate(e, n); at(await V(i)), rt(t[37], t[39]) } catch (e) { at(`Error: ${e.message}`), rt(t[37]) } finally { p = !1, u = null } } async function qt() { return new Promise((e => { try { if (!E()) return void e(!1); chrome.storage.sync.get([t[36], t[35]], (function (t) { try { const n = !1 !== t.tooltipEnabled, o = t.disabledWebsites || [], i = window.location.hostname; e(n && !o.includes(i)) } catch (t) { e(!1) } })) } catch (t) { e(!1) } })) } function Mt() { try { e && (e.remove(), e = null), n && (n.remove(), n = null), O(), z(), R(), D(), N(), Pt(), g = !0 } catch (t) { g = !1 } } function Ht() { try { x && (x.disconnect(), x = null), w = !1, document.removeEventListener(t[13], U, !0), document.removeEventListener(t[12], yt(F, T)), window.removeEventListener(t[11], Lt, { passive: !0 }), window.removeEventListener(t[10], j, { passive: !0 }), e && (e.style.display = t[33], i = !1), n && (n.style.display = t[33], s = !1) } catch (t) { } } async function At() { try { await qt() && Mt() } catch (t) { } } function It() { if (!n) return; const e = n.querySelector(t[20]); e && (e.innerHTML = ""); const o = n.querySelector(t[23]); o && (o.value = "", ft({ target: o }), setTimeout((() => { o.focus() }), 50)), f = [], b.chatHistory = [], $t(), dt("New chat started.", t[8]) } function $t() { if (n) { n.getBoundingClientRect(); b.position = { x: n.style.left, y: n.style.top }, b.size = { width: n.style.width, height: n.style.height } } const t = Ot(); chrome.storage.local.set({ [`chatDockState_${t}`]: b }, (function () { })) } function Pt() { try { const e = Ot(); chrome.storage.local.get([`chatDockState_${e}`], (function (o) { try { const i = o[`chatDockState_${e}`]; if (i) { if (b = { isVisible: i.isVisible || !1, position: i.position || { x: null, y: null }, size: i.size || { width: null, height: null }, chatHistory: i.chatHistory || [], wasExplicitlyOpened: i.wasExplicitlyOpened || !1 }, b.isVisible && b.wasExplicitlyOpened && (n || z(), n && (b.position.x && (n.style.left = b.position.x), b.position.y && (n.style.top = b.position.y), b.size.width && (n.style.width = b.size.width), b.size.height && (n.style.height = b.size.height), n.classList.add(t[21]), s = !0, b.chatHistory && b.chatHistory.length > 0))) { const e = n.querySelector(t[20]); e && (e.innerHTML = "", b.chatHistory.forEach((n => { const o = document.createElement(t[19]); o.classList.add(t[18], `sa-${n.role}`), o.innerHTML = n.content, e.appendChild(o) })), f = [...b.chatHistory]) } } else b = { isVisible: !1, position: { x: null, y: null }, size: { width: null, height: null }, chatHistory: [], wasExplicitlyOpened: !1 } } catch (t) { } })) } catch (t) { } } function Ot() { try { return window.location.href } catch (t) { return Date.now().toString() } } function zt() { x && x.disconnect(), x = new MutationObserver((t => { const e = document.getElementById(M), n = document.getElementById(q); !e && i && (O(), i && it(!0)), !n && s && (z(), s && lt()), w || Bt() })), x.observe(document.body, { childList: !0, subtree: !0 }), w = !0 } function Bt() { document.removeEventListener(t[13], U, !0), document.removeEventListener(t[12], yt(F, T)), window.removeEventListener(t[11], Lt, { passive: !0 }), window.removeEventListener(t[10], j, { passive: !0 }), document.addEventListener(t[13], U, !0), document.addEventListener(t[12], yt(F, T)), window.addEventListener(t[11], Lt, { passive: !0 }), window.addEventListener(t[10], j, { passive: !0 }) } async function Rt(e, n, o) { try { const i = { contents: [{ parts: [{ inline_data: { mime_type: n, data: e } }, { text: "Explain the image in a single, natural-sounding paragraph. Describe what is shown, identify any recognizable objects (like cars, people, or landmarks), and infer the context or purpose of the image if possible. Do not use bullet points, headings, or sections — just give one clear and insightful paragraph." }] }], generationConfig: { temperature: .7, topP: 1, responseMimeType: "text/plain" } }, s = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${"AIzaSyAwlPdEOv-erinGyIIrofiII_-s47c8pKM"}`, r = await fetch(s, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(i) }); if (!r.ok) throw new Error(`API request failed: ${r.status} ${r.statusText}`); const a = await r.json(); dt(`<img src="${o}" style="max-width: 300px; border-radius: 8px; margin-bottom: 8px;"><br>${a?.candidates?.[0]?.content?.parts?.[0]?.text || "Could not analyze image."}`, t[9]) } catch (e) { dt("Sorry, I couldn't analyze the image. Please try again.", t[8]) } } document.readyState === t[42] ? document.addEventListener(t[54], $) : $(), document.getElementById(t[47]).addEventListener(t[46], (function (e) { if (e.target.classList.contains(t[45]) && e.target.dataset.action === t[44]) { const t = window.getSelection().toString().trim(); t && (St(t), st()) } })), chrome.runtime.onMessage.addListener((async function (o, i, r) { try { if (o.action === t[34]) m = o.enabled, m ? (Mt(), b.isVisible && lt()) : (e && (st(), e.style.display = t[33]), n && (n.style.display = t[33], s = !1), document.removeEventListener(t[13], U, !0), document.removeEventListener(t[12], yt(F, T)), window.removeEventListener(t[11], Lt, { passive: !0 }), window.removeEventListener(t[10], j, { passive: !0 })), r({ success: !0 }); else if (o.action === t[32]) n || (z(), N()), lt(), r({ success: !0 }); else if (o.action === t[31]) { n || (z(), N()), lt(), dt("Analyzing image...", t[8]); try { let e = o.url; if (e.startsWith(t[29])) { const n = e.split(",")[1]; Rt(n, e.split(",")[0].split(t[27])[1].split(";")[0], e) } else { if (e.startsWith("/")) e = window.location.origin + e; else if (!e.startsWith(t[26])) { const t = window.location.href.substring(0, window.location.href.lastIndexOf("/") + 1); e = t + e } chrome.runtime.sendMessage({ action: "fetchImage", url: e }, (async n => { n.error ? dt(`Error accessing image: ${n.error}. Please try again.`, t[8]) : Rt(n.base64, n.type, e) })) } } catch (e) { dt(`Error processing image: ${e.message}. Please try again.`, t[8]) } r({ success: !0 }) } else o.action === t[24] && (Mt(), r({ success: !0 })) } catch (t) { r({ success: !1, error: t.message }) } return !0 })), At(), window.addEventListener(t[17], (function () { try { s && $t() } catch (t) { } })), document.addEventListener(t[16], (function () { if (document.visibilityState === t[15]) try { document.getElementById(M) && document.getElementById(q) ? Pt() : $() } catch (t) { } })), chrome.runtime.onMessage.addListener((function (e, n, o) { try { e.action === t[14] && o({ valid: !0 }) } catch (t) { o({ valid: !1 }) } return !0 }));

// Update the powered-by text with the selected model name from storage
chrome.storage.sync.get(['selectedAiModel'], function (result) {
    const poweredByText = document.getElementById('sa-powered-by-text');
    if (poweredByText) {
        if (result.selectedAiModel) {
            const displayName = getModelDisplayName(result.selectedAiModel);
            poweredByText.textContent = `Powered by ${displayName}`;
        } else {
            poweredByText.textContent = 'Powered by Gemini';
        }
    }
});

// Listen for model updates from popup/background
if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.onMessage) {
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        if (request.action === 'updateAiConfig' && request.model) {
            const poweredByText = document.getElementById('sa-powered-by-text');
            if (poweredByText) {
                const displayName = getModelDisplayName(request.model);
                poweredByText.textContent = `Powered by ${displayName}`;
            }
        }

        // Handle page translation
        if (request.action === 'translatePage') {
            translateEntirePage(request.targetLanguage, request.languageName)
                .then(result => {
                    sendResponse(result);
                })
                .catch(error => {
                    console.error('Page translation error:', error);
                    sendResponse({ success: false, error: error.message });
                });
            return true; // Keep message channel open for async response
        }

        // Handle undo translation
        if (request.action === 'undoTranslation') {
            undoPageTranslation()
                .then(result => {
                    sendResponse(result);
                })
                .catch(error => {
                    console.error('Undo translation error:', error);
                    sendResponse({ success: false, error: error.message });
                });
            return true; // Keep message channel open for async response
        }

        // Handle redo translation (restore cached translation)
        if (request.action === 'redoTranslation') {
            redoPageTranslation()
                .then(result => {
                    sendResponse(result);
                })
                .catch(error => {
                    console.error('Redo translation error:', error);
                    sendResponse({ success: false, error: error.message });
                });
            return true; // Keep message channel open for async response
        }

        // Handle translation status check
        if (request.action === 'checkTranslationStatus') {
            sendResponse({ 
                isTranslated: window.saTranslationData && window.saTranslationData.isTranslated,
                hasCache: window.saTranslationData && window.saTranslationData.hasCache
            });
            return true;
        }

        // Handle screenshot translation
        if (request.action === 'screenshot_full_translate') {
            captureFullPageScreenshot();
            return true;
        }

        if (request.action === 'screenshot_area_translate') {
            startAreaSelection();
            return true;
        }

        // Handle open chat dock
        if (request.action === 'openChatDock') {
            // Open Chrome's side panel instead of in-page chat dock
            chrome.runtime.sendMessage({ action: 'openSidePanel' });
            sendResponse({ success: true });
            return true;
        }
    });
}

// Helper function to get actual model display names
function getModelDisplayName(modelName) {
    if (!modelName) return 'Gemini';

    // Map model names to user-friendly display names
    const modelDisplayNames = {
        'gemini-2.0-flash-exp': 'Gemini 2.0 Flash (Experimental)',
        'gemini-1.5-flash': 'Gemini 1.5 Flash',
        'gemini-1.5-pro': 'Gemini 1.5 Pro',
        'gemini-2.0-flash': 'Gemini 2.0 Flash'
    };

    return modelDisplayNames[modelName] || modelName;
}

// Function to update the powered-by text
function updatePoweredByText() {
    chrome.storage.sync.get(['selectedAiModel'], function (result) {
        const poweredByText = document.getElementById('sa-powered-by-text');
        if (poweredByText) {
            if (result.selectedAiModel) {
                const displayName = getModelDisplayName(result.selectedAiModel);
                poweredByText.textContent = `Powered by ${displayName}`;
            } else {
                // Set default model if none exists
                const defaultModel = 'gemini-2.5-flash-lite-preview-06-17';
                chrome.storage.sync.set({ selectedAiModel: defaultModel });
                const displayName = getModelDisplayName(defaultModel);
                poweredByText.textContent = `Powered by ${displayName}`;
            }
        }
    });
}

// Watch for tooltip creation and update powered-by text
const tooltipObserver = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        mutation.addedNodes.forEach(function (node) {
            if (node.nodeType === 1) { // Element node
                // Check if tooltip was added
                if (node.id === 'select-act-tooltip' || (node.querySelector && node.querySelector('#select-act-tooltip'))) {
                    setTimeout(updatePoweredByText, 50);
                }
                // Check if powered-by element was added
                if (node.id === 'sa-powered-by-text' || (node.querySelector && node.querySelector('#sa-powered-by-text'))) {
                    setTimeout(updatePoweredByText, 50);
                }
            }
        });
    });
});

// Start observing
tooltipObserver.observe(document.body, { childList: true, subtree: true });

// Update powered-by text immediately if tooltip already exists
setTimeout(updatePoweredByText, 500);

// Global variable to store original content and cached translations
window.saTranslationData = {
    originalContent: [],
    translatedContent: [],
    isTranslated: false,
    hasCache: false
};

// Global translation state to prevent interruption
window.saTranslationInProgress = false;

// Page Translation Functionality
async function translateEntirePage(targetLanguage, languageName) {
    // Prevent multiple simultaneous translations
    if (window.saTranslationInProgress) {
        throw new Error('Translation already in progress');
    }

    window.saTranslationInProgress = true;

    try {
        // Get API configuration for multi-provider support
        const config = await new Promise((resolve) => {
            chrome.storage.sync.get(['selectedProvider', 'providerApiKeys', 'selectedAiModel', 'customApiUrl', 'customModel', 'googleAiApiKey'], resolve);
        });

        const currentProvider = config.selectedProvider || 'gemini';
        const providerApiKeys = config.providerApiKeys || {};

        // Handle legacy Gemini API key
        let apiKey = providerApiKeys[currentProvider];
        if (!apiKey && currentProvider === 'gemini' && config.googleAiApiKey) {
            apiKey = config.googleAiApiKey;
        }

        if (!apiKey) {
            throw new Error('API key not configured for selected provider');
        }

        const model = config.selectedAiModel || 'gemini-2.0-flash-exp';
        const customConfig = currentProvider === 'custom' ? {
            baseUrl: config.customApiUrl,
            model: config.customModel
        } : null;

        // Provider-specific rate limits based on official documentation
        const providerSettings = {
            // Groq: Free tier = 30 req/min, 14,400 req/day
            groq: { rpm: 28, batchSize: 25, cooldownInterval: 25 },

            // Cerebras: Free tier = 30 req/min, 1M tokens/day
            cerebras: { rpm: 28, batchSize: 25, cooldownInterval: 25 },

            // OpenRouter: Varies by model, generally 20-200 req/min
            openrouter: { rpm: 18, batchSize: 20, cooldownInterval: 20 },

            // OpenAI: Tier 1 = 500 req/min, Free = 3 req/min (very low)
            // Setting conservative for paid tier users
            openai: { rpm: 45, batchSize: 30, cooldownInterval: 30 },

            // Anthropic: Tier 1 = 50 req/min, higher tiers up to 1000 req/min
            // Setting conservative for paid tier users
            anthropic: { rpm: 40, batchSize: 25, cooldownInterval: 25 },

            // Gemini: Free tier = 15 req/min, Paid = 1000 req/min
            // Setting conservative for free tier users
            gemini: { rpm: 12, batchSize: 18, cooldownInterval: 15 },

            // Custom: Conservative default
            custom: { rpm: 10, batchSize: 15, cooldownInterval: 10 }
        };

        const settings = providerSettings[currentProvider] || providerSettings.gemini;

        // Show translation overlay with model info
        showTranslationOverlay(languageName, model);

        // Get all text content from the page
        const textElements = getTranslatableElements();

        if (textElements.length === 0) {
            hideTranslationOverlay();
            throw new Error('No translatable content found');
        }

        // Store original content for undo functionality
        window.saTranslationData.originalContent = textElements.map(element => ({
            node: element.node,
            originalText: element.originalText,
            isAttribute: element.isAttribute,
            attributeName: element.attributeName,
            originalAttributeValue: element.originalAttributeValue
        }));

        // Process elements in batches to avoid API limits
        // Use larger batches with much longer delays to minimize API calls
        const batchSize = 15; // Larger batches to reduce total API calls
        let translatedCount = 0;
        let consecutiveFailures = 0;
        let requestCount = 0;
        const startTime = Date.now();

        for (let i = 0; i < textElements.length; i += batchSize) {
            // Check if translation was cancelled
            if (!window.saTranslationInProgress) {
                console.log('Translation was cancelled by user or system');
                break;
            }

            const batch = textElements.slice(i, i + batchSize);
            const batchTexts = batch.map(el => el.originalText);

            // Update progress
            updateTranslationProgress(translatedCount, textElements.length);

            try {
                console.log(`Starting batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(textElements.length / batchSize)} with ${batch.length} elements`);

                const translations = await translateTextBatch(batchTexts, targetLanguage, currentProvider, apiKey, model, customConfig);

                if (!translations || translations.length === 0) {
                    console.warn('No translations returned from API');
                    consecutiveFailures++;
                } else {
                    consecutiveFailures = 0; // Reset on success
                }

                // Apply translations
                let batchSuccessCount = 0;
                batch.forEach((element, index) => {
                    if (translations && translations[index] && translations[index].trim()) {
                        try {
                            if (element.isAttribute) {
                                // Handle attribute translations
                                element.node.setAttribute(element.attributeName, translations[index]);
                            } else {
                                // Handle text node translations
                                element.node.textContent = translations[index];
                            }
                            
                            // Cache the translation for quick redo
                            const originalIndex = i + index;
                            if (!window.saTranslationData.translatedContent[originalIndex]) {
                                window.saTranslationData.translatedContent[originalIndex] = {
                                    node: element.node,
                                    translatedText: translations[index],
                                    isAttribute: element.isAttribute,
                                    attributeName: element.attributeName
                                };
                            }
                            
                            batchSuccessCount++;
                        } catch (error) {
                            console.warn('Failed to apply translation to element:', error);
                        }
                    }
                });

                translatedCount += batchSuccessCount;

                // Update progress after successful batch completion
                updateTranslationProgress(translatedCount, textElements.length);

                // Log detailed progress for debugging
                console.log(`Batch ${Math.floor(i / batchSize) + 1} completed: ${batchSuccessCount}/${batch.length} elements translated. Total: ${translatedCount}/${textElements.length}. Consecutive failures: ${consecutiveFailures}`);

            } catch (error) {
                console.error('Batch translation API error:', error);
                consecutiveFailures++;

                // Handle rate limiting specifically
                if (error.message.includes('429') || error.message.includes('Too Many Requests')) {
                    console.log(`Rate limited on batch ${Math.floor(i / batchSize) + 1}, implementing aggressive backoff`);

                    // Add a long pause when we hit rate limits
                    const rateLimitPause = Math.min(60000, 10000 * consecutiveFailures); // Up to 1 minute pause
                    console.log(`Taking ${rateLimitPause}ms pause to let rate limits reset`);
                    await new Promise(resolve => setTimeout(resolve, rateLimitPause));

                    // For rate limiting, be extremely patient
                    if (consecutiveFailures >= 12) { // Allow many more retries for rate limiting
                        console.error('Persistent rate limiting after long pauses, stopping translation');
                        break;
                    }
                } else {
                    // For other errors, be less tolerant
                    if (consecutiveFailures >= 3) {
                        console.error('Too many consecutive API failures, stopping translation');
                        break;
                    }
                }
            }

            // Calculate adaptive delay based on API rate limits
            requestCount++;
            const elapsedMinutes = (Date.now() - startTime) / 60000;
            const currentRPM = requestCount / Math.max(elapsedMinutes, 0.1);

            // Much more conservative approach - aim for ~15 RPM to stay well under limits
            let delay = Math.max(4000, 60000 / 15); // At least 4 seconds between requests

            // Increase delay significantly if we're going too fast or have failures
            if (currentRPM > 12) {
                delay = Math.max(delay, 6000); // Slow down significantly if approaching limits
            }

            if (consecutiveFailures > 0) {
                delay = Math.min(30000, delay * Math.pow(2, consecutiveFailures)); // Longer exponential backoff
                console.log(`Using increased delay of ${delay}ms due to ${consecutiveFailures} consecutive failures`);
            }

            // Add extra delay after every 10 requests to give API time to reset
            if (requestCount % 10 === 0) {
                delay += 5000;
                console.log(`Adding 5s cooldown after ${requestCount} requests`);
            }

            console.log(`Request ${requestCount}, RPM: ${currentRPM.toFixed(1)}, delay: ${delay}ms`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }

        console.log(`Translation loop completed. Final count: ${translatedCount}/${textElements.length} elements translated`);

        // Only mark as translated if we translated a reasonable portion of elements
        const translationThreshold = Math.max(Math.floor(textElements.length * 0.6), 5); // At least 60% of elements or minimum 5

        console.log(`Translation completed: ${translatedCount}/${textElements.length} elements (threshold: ${translationThreshold})`);

        // Determine if translation was successful
        const successRate = Math.round((translatedCount / textElements.length) * 100);
        const isSuccess = translatedCount >= translationThreshold;

        console.log(`Translation assessment: ${translatedCount}/${textElements.length} (${successRate}%) - Threshold: ${translationThreshold} - Success: ${isSuccess}`);

        if (isSuccess) {
            // Mark as translated and cached
            window.saTranslationData.isTranslated = true;
            window.saTranslationData.hasCache = true;
            hideTranslationOverlay();

            // Show success notification with details
            showTranslationNotification(`Page translated to ${languageName} (${successRate}% complete)`, 'success');

            return { success: true, translatedElements: translatedCount };
        } else {
            // Translation was incomplete/interrupted
            window.saTranslationData.isTranslated = false;
            window.saTranslationData.hasCache = false;
            window.saTranslationData.originalContent = []; // Clear incomplete data
            window.saTranslationData.translatedContent = []; // Clear incomplete cache
            hideTranslationOverlay();

            // Show warning notification with more details
            console.warn(`Translation incomplete: ${translatedCount}/${textElements.length} elements translated (threshold: ${translationThreshold})`);
            showTranslationNotification(`Translation incomplete: only ${translatedCount}/${textElements.length} elements translated`, 'error');

            return { success: false, error: `Translation incomplete: only ${translatedCount}/${textElements.length} elements translated`, translatedElements: translatedCount };
        }

    } catch (error) {
        hideTranslationOverlay();
        showTranslationNotification(`Translation failed: ${error.message}`, 'error');
        throw error;
    } finally {
        // Always reset translation state
        window.saTranslationInProgress = false;
    }
}

// Undo Translation Functionality
async function undoPageTranslation() {
    try {
        if (!window.saTranslationData.isTranslated || !window.saTranslationData.originalContent.length) {
            throw new Error('No translation to undo');
        }

        // Show restoration overlay
        showRestorationOverlay();

        let restoredCount = 0;
        const totalElements = window.saTranslationData.originalContent.length;

        // Restore original content
        window.saTranslationData.originalContent.forEach((element, index) => {
            try {
                // Check if the node still exists in the DOM
                if (element.node && (element.node.parentNode || element.isAttribute)) {
                    if (element.isAttribute) {
                        // Restore attribute value
                        element.node.setAttribute(element.attributeName, element.originalAttributeValue || element.originalText);
                    } else {
                        // Restore text content
                        element.node.textContent = element.originalText;
                    }
                    restoredCount++;
                }

                // Update progress
                updateRestorationProgress(restoredCount, totalElements);
            } catch (error) {
                console.warn('Failed to restore element:', error);
            }
        });

        // Small delay to show progress
        await new Promise(resolve => setTimeout(resolve, 500));

        // Update translation state but keep cache
        window.saTranslationData.isTranslated = false;
        // Don't clear originalContent and translatedContent - keep cache for redo

        hideRestorationOverlay();

        // Show success notification
        showTranslationNotification('Original text restored successfully', 'success');

        return { success: true, restoredElements: restoredCount };

    } catch (error) {
        hideRestorationOverlay();
        showTranslationNotification(`Restoration failed: ${error.message}`, 'error');
        throw error;
    }
}

// Redo Translation Functionality (restore cached translation)
async function redoPageTranslation() {
    try {
        if (!window.saTranslationData.hasCache || !window.saTranslationData.translatedContent.length) {
            throw new Error('No cached translation available');
        }

        // Show restoration overlay
        showRestorationOverlay();

        let restoredCount = 0;
        const totalElements = window.saTranslationData.translatedContent.length;

        // Restore translated content from cache
        window.saTranslationData.translatedContent.forEach((element, index) => {
            try {
                // Check if the node still exists in the DOM
                if (element.node && (element.node.parentNode || element.isAttribute)) {
                    if (element.isAttribute) {
                        // Restore translated attribute value
                        element.node.setAttribute(element.attributeName, element.translatedText);
                    } else {
                        // Restore translated text content
                        element.node.textContent = element.translatedText;
                    }
                    restoredCount++;
                }

                // Update progress
                updateRestorationProgress(restoredCount, totalElements);
            } catch (error) {
                console.warn('Failed to restore translated element:', error);
            }
        });

        // Small delay to show progress
        await new Promise(resolve => setTimeout(resolve, 500));

        // Update translation state
        window.saTranslationData.isTranslated = true;

        hideRestorationOverlay();

        // Show success notification
        showTranslationNotification('Translation restored successfully', 'success');

        return { success: true, restoredElements: restoredCount };

    } catch (error) {
        hideRestorationOverlay();
        showTranslationNotification(`Translation restoration failed: ${error.message}`, 'error');
        throw error;
    }
}

function getTranslatableElements() {
    const elements = [];
    const processedNodes = new Set();

    // Function to check if element should be skipped
    function shouldSkipElement(element) {
        if (!element) return true;

        const tagName = element.tagName.toLowerCase();

        // Skip non-visible elements
        if (['script', 'style', 'noscript', 'meta', 'head', 'title', 'link'].includes(tagName)) {
            return true;
        }

        // Skip our own extension elements (more comprehensive)
        if (element.id && (element.id.startsWith('select-act') || element.id.startsWith('sa-'))) {
            return true;
        }

        // Skip elements with our extension classes
        if (element.className && typeof element.className === 'string' &&
            (element.className.includes('sa-') || element.className.includes('select-act'))) {
            return true;
        }

        // Skip if element is inside our extension containers
        let parent = element.parentElement;
        while (parent) {
            if (parent.id && (parent.id.startsWith('select-act') || parent.id.startsWith('sa-'))) {
                return true;
            }
            if (parent.className && typeof parent.className === 'string' &&
                (parent.className.includes('sa-') || parent.className.includes('select-act'))) {
                return true;
            }
            parent = parent.parentElement;
        }

        // Check computed styles
        const style = window.getComputedStyle(element);
        if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
            return true;
        }

        return false;
    }

    // Function to process text nodes more comprehensively
    function processTextNodes(element) {
        if (shouldSkipElement(element)) return;

        // Process direct text content
        for (let child of element.childNodes) {
            if (child.nodeType === Node.TEXT_NODE) {
                const text = child.textContent.trim();
                // More lenient text filtering - accept shorter text too
                if (text && text.length >= 2 && !processedNodes.has(child)) {
                    // Skip if it's just numbers, punctuation, or single characters
                    if (!/^[\d\s\.,;:!?\-_()[\]{}'"]*$/.test(text)) {
                        elements.push({
                            node: child,
                            originalText: text
                        });
                        processedNodes.add(child);
                    }
                }
            } else if (child.nodeType === Node.ELEMENT_NODE) {
                // Recursively process child elements
                processTextNodes(child);
            }
        }
    }

    // Alternative approach: Use TreeWalker with more inclusive filtering
    const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        {
            acceptNode: function (node) {
                // Skip if already processed
                if (processedNodes.has(node)) {
                    return NodeFilter.FILTER_REJECT;
                }

                const parent = node.parentElement;
                if (shouldSkipElement(parent)) {
                    return NodeFilter.FILTER_REJECT;
                }

                // More lenient text filtering
                const text = node.textContent.trim();
                if (!text || text.length < 2) {
                    return NodeFilter.FILTER_REJECT;
                }

                // Skip if it's just numbers, punctuation, or whitespace
                if (/^[\d\s\.,;:!?\-_()[\]{}'"]*$/.test(text)) {
                    return NodeFilter.FILTER_REJECT;
                }

                return NodeFilter.FILTER_ACCEPT;
            }
        }
    );

    let node;
    while (node = walker.nextNode()) {
        if (!processedNodes.has(node)) {
            const text = node.textContent.trim();
            if (text && text.length >= 2) {
                elements.push({
                    node: node,
                    originalText: text
                });
                processedNodes.add(node);
            }
        }
    }

    // Additional pass: Look for elements with specific text-containing attributes
    const textAttributes = ['title', 'alt', 'placeholder', 'aria-label'];
    const elementsWithTextAttrs = document.querySelectorAll('[title], [alt], [placeholder], [aria-label]');

    elementsWithTextAttrs.forEach(element => {
        if (shouldSkipElement(element)) return;

        textAttributes.forEach(attr => {
            const attrValue = element.getAttribute(attr);
            if (attrValue && attrValue.trim().length >= 2) {
                const text = attrValue.trim();
                if (!/^[\d\s\.,;:!?\-_()[\]{}'"]*$/.test(text)) {
                    // Create a pseudo-node for attribute text
                    elements.push({
                        node: element,
                        originalText: text,
                        isAttribute: true,
                        attributeName: attr,
                        originalAttributeValue: attrValue
                    });
                }
            }
        });
    });

    console.log(`Found ${elements.length} translatable elements for translation`);
    return elements;
}

async function translateTextBatch(texts, targetLanguage, provider, apiKey, model, customConfig = null, settings = null, retryCount = 0) {
    // Convert language codes to standard language names for better AI recognition
    const languageMap = {
        'bengali': 'Bengali',
        'bangla': 'Bengali',
        'chinese_simplified': 'Simplified Chinese',
        'chinese_traditional': 'Traditional Chinese',
        'scottish_gaelic': 'Scottish Gaelic',
        'filipino': 'Filipino',
        'malay': 'Malay',
        'urdu': 'Urdu',
        'punjabi': 'Punjabi',
        'gujarati': 'Gujarati',
        'marathi': 'Marathi',
        'tamil': 'Tamil',
        'telugu': 'Telugu',
        'kannada': 'Kannada',
        'malayalam': 'Malayalam',
        'sinhalese': 'Sinhala',
        'burmese': 'Myanmar (Burmese)',
        'khmer': 'Khmer (Cambodian)',
        'persian': 'Persian (Farsi)',
        'dari': 'Dari',
        'pashto': 'Pashto',
        'kurdish': 'Kurdish',
        'amharic': 'Amharic',
        'tigrinya': 'Tigrinya',
        'swahili': 'Swahili',
        'yoruba': 'Yoruba',
        'igbo': 'Igbo',
        'hausa': 'Hausa',
        'zulu': 'Zulu',
        'xhosa': 'Xhosa',
        'afrikaans': 'Afrikaans',
        'malagasy': 'Malagasy'
    };

    // Get the proper language name for the AI model
    const aiLanguageName = languageMap[targetLanguage] || targetLanguage.charAt(0).toUpperCase() + targetLanguage.slice(1);

    const prompt = `Translate the following texts to ${aiLanguageName}. Return only the translations, one per line, in the same order as the input. Do not add explanations or numbering.

Texts to translate:
${texts.map((text, i) => `${i + 1}. ${text}`).join('\n')}`;

    try {
        // Use the multi-provider AIHandler if available
        if (window.AIHandler && window.AIHandler.makeRequest) {
            const providerConfig = window.AIProviders && window.AIProviders[provider];
            if (!providerConfig) {
                throw new Error(`Unknown provider: ${provider}`);
            }

            // Handle custom provider configuration
            if (provider === 'custom' && customConfig) {
                providerConfig.baseUrl = customConfig.baseUrl;
                providerConfig.model = customConfig.model;
            }

            const translatedText = await window.AIHandler.makeRequest(prompt, providerConfig, model, apiKey);

            // Parse the response - split by lines and clean up
            const translations = translatedText.split('\n')
                .map(line => line.replace(/^\d+\.\s*/, '').trim())
                .filter(line => line.length > 0);

            return translations;
        }

        // Fallback to direct Gemini API for backward compatibility
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }],
                generationConfig: {
                    temperature: 0.3,
                    topP: 1,
                    responseMimeType: "text/plain"
                }
            })
        });

        // Handle rate limiting with much longer retry delays
        if (response.status === 429 && retryCount < 5) { // Allow more retries
            // Use very long delays for rate limiting (Gemini API has strict RPM limits)

            const retryDelay = Math.min(60000, 10000 * Math.pow(1.5, retryCount)); // 10s, 15s, 22s, 33s, 50s
            console.log(`Rate limited (429), waiting ${retryDelay}ms before retry (attempt ${retryCount + 1}/5)`);
            await new Promise(resolve => setTimeout(resolve, retryDelay));
            return translateTextBatch(texts, targetLanguage, provider, apiKey, model, customConfig, retryCount + 1);
        }

        if (!response.ok) {
            throw new Error(`Translation API error: ${response.status}`);
        }

        const data = await response.json();
        const translatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!translatedText) {
            throw new Error('No translation received from API');
        }

        // Parse the response - split by lines and clean up
        const translations = translatedText.split('\n')
            .map(line => line.replace(/^\d+\.\s*/, '').trim())
            .filter(line => line.length > 0);

        return translations;

    } catch (fetchError) {
        if (retryCount < 5 && (fetchError.message.includes('429') || fetchError.message.includes('fetch'))) {
            // Use much longer delays for network/rate limit errors
            const retryDelay = Math.min(60000, 10000 * Math.pow(1.5, retryCount)); // 10s, 15s, 22s, 33s, 50s
            console.log(`Network/rate limit error, waiting ${retryDelay}ms before retry (attempt ${retryCount + 1}/5)`);
            await new Promise(resolve => setTimeout(resolve, retryDelay));
            return translateTextBatch(texts, targetLanguage, provider, apiKey, model, customConfig, retryCount + 1);
        }
        throw fetchError;
    }
}

// Helper function to format model names for display
function formatModelName(modelName) {
    if (!modelName) return 'AI Model';

    // Convert model names to user-friendly format
    const modelDisplayNames = {
        'gemini-2.5-flash-lite-preview-06-17': 'Gemini 2.5 Flash Lite Preview',
        'gemini-2.0-flash-exp': 'Gemini 2.0 Flash (Experimental)',
        'gemini-1.5-flash': 'Gemini 1.5 Flash',
        'gemini-1.5-pro': 'Gemini 1.5 Pro',
        'gemini-pro': 'Gemini Pro',
        'gemini-pro-vision': 'Gemini Pro Vision'
    };

    // Return display name if available, otherwise format the raw name
    if (modelDisplayNames[modelName]) {
        return modelDisplayNames[modelName];
    }

    // Format raw model name: remove prefixes, capitalize, etc.
    return modelName
        .replace(/^models\//, '') // Remove models/ prefix
        .replace(/-/g, ' ') // Replace hyphens with spaces
        .replace(/\b\w/g, l => l.toUpperCase()) // Capitalize first letter of each word
        .replace(/\bExp\b/g, '(Experimental)') // Format experimental
        .replace(/\bPro\b/g, 'Pro') // Keep Pro capitalized
        .replace(/\bFlash\b/g, 'Flash') // Keep Flash capitalized
        .replace(/\bLite\b/g, 'Lite'); // Keep Lite capitalized
}

function showTranslationOverlay(languageName, modelName = null) {
    // Remove existing overlay if any
    hideTranslationOverlay();

    const overlay = document.createElement('div');
    overlay.id = 'sa-translation-overlay';
    overlay.className = 'sa-extension-ui'; // Mark as extension UI

    // Apply current theme to overlay
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    if (currentTheme !== 'light') {
        overlay.setAttribute('data-theme', currentTheme);
    }

    // Format model name for display
    const displayModelName = modelName ? formatModelName(modelName) : 'AI Model';

    overlay.innerHTML = `
        <div class="sa-translation-modal">
            <div class="sa-translation-header">
                <h3>Translating Page</h3>
                <p>Translating to ${languageName}...</p>
                <div class="sa-model-info">Using: ${displayModelName}</div>
            </div>
            <div class="sa-translation-progress">
                <div class="sa-progress-bar">
                    <div class="sa-progress-fill" id="sa-progress-fill"></div>
                </div>
                <div class="sa-progress-text" id="sa-progress-text">Preparing...</div>
            </div>
        </div>
    `;

    // Add styles with theme support
    const style = document.createElement('style');
    style.setAttribute('data-sa-translation', 'true');
    style.textContent = `
        #sa-translation-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            z-index: 999999;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        .sa-translation-modal {
            background: var(--sa-primary-bg, white);
            color: var(--sa-secondary-text, #333);
            border: 1px solid var(--sa-border-color, #e0e0e0);
            border-radius: 12px;
            padding: 24px;
            max-width: 400px;
            width: 90%;
            box-shadow: var(--sa-shadow, 0 20px 60px rgba(0, 0, 0, 0.3));
        }
        
        .sa-translation-header h3 {
            margin: 0 0 8px 0;
            font-size: 18px;
            color: var(--sa-secondary-text, #333);
        }
        
        .sa-translation-header p {
            margin: 0 0 8px 0;
            color: var(--sa-secondary-text, #666);
            opacity: 0.8;
            font-size: 14px;
        }
        
        .sa-model-info {
            margin: 0 0 20px 0;
            color: var(--sa-accent, #3b82f6);
            font-size: 12px;
            font-weight: 500;
            opacity: 0.9;
            padding: 4px 8px;
            background: rgba(var(--sa-accent-rgb, 59, 130, 246), 0.1);
            border-radius: 4px;
            border-left: 3px solid var(--sa-accent, #3b82f6);
        }
        
        .sa-progress-bar {
            width: 100%;
            height: 8px;
            background: var(--sa-border-color, #f0f0f0);
            border-radius: 4px;
            overflow: hidden;
            margin-bottom: 12px;
        }
        
        .sa-progress-fill {
            height: 100%;
            background: linear-gradient(90deg, var(--sa-accent, #3b82f6), var(--sa-accent, #1d4ed8));
            width: 0%;
            transition: width 0.3s ease;
        }
        
        .sa-progress-text {
            font-size: 12px;
            color: var(--sa-secondary-text, #666);
            opacity: 0.8;
            text-align: center;
            white-space: pre-line;
            line-height: 1.4;
            min-height: 32px;
        }
        
        /* Dark theme specific styles */
        [data-theme="dark"] .sa-translation-modal,
        [data-theme="dark-blue"] .sa-translation-modal,
        [data-theme="dark-purple"] .sa-translation-modal,
        [data-theme="dark-green"] .sa-translation-modal,
        [data-theme="dark-orange"] .sa-translation-modal,
        [data-theme="dark-rose"] .sa-translation-modal,
        [data-theme="dark-minimal"] .sa-translation-modal {
            background: var(--sa-primary-bg);
            color: var(--sa-secondary-text);
            border-color: var(--sa-border-color);
        }
    `;

    document.head.appendChild(style);
    document.body.appendChild(overlay);
}

function updateTranslationProgress(completed, total, estimatedTimeRemaining = null) {
    const progressFill = document.getElementById('sa-progress-fill');
    const progressText = document.getElementById('sa-progress-text');

    if (progressFill && progressText) {
        const percentage = Math.round((completed / total) * 100);
        progressFill.style.width = `${percentage}%`;
        
        const progressMessage = `Translating... ${completed}/${total} elements (${percentage}%)`;
        progressText.textContent = progressMessage;
    }
}


function hideTranslationOverlay() {
    const overlay = document.getElementById('sa-translation-overlay');
    if (overlay) {
        overlay.remove();
    }

    // Remove the style element too
    const style = document.querySelector('style[data-sa-translation]');
    if (style) {
        style.remove();
    }
}

function showRestorationOverlay() {
    // Remove existing overlay if any
    hideRestorationOverlay();

    const overlay = document.createElement('div');
    overlay.id = 'sa-restoration-overlay';
    overlay.className = 'sa-extension-ui'; // Mark as extension UI

    // Apply current theme to overlay
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    if (currentTheme !== 'light') {
        overlay.setAttribute('data-theme', currentTheme);
    }

    overlay.innerHTML = `
        <div class="sa-restoration-modal">
            <div class="sa-restoration-header">
                <h3>Restoring Original Text</h3>
                <p>Bringing back the original content...</p>
            </div>
            <div class="sa-restoration-progress">
                <div class="sa-progress-bar">
                    <div class="sa-progress-fill" id="sa-restoration-progress-fill"></div>
                </div>
                <div class="sa-progress-text" id="sa-restoration-progress-text">Preparing...</div>
            </div>
        </div>
    `;

    // Add styles with theme support
    const style = document.createElement('style');
    style.setAttribute('data-sa-restoration', 'true');
    style.textContent = `
        #sa-restoration-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            z-index: 999999;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        .sa-restoration-modal {
            background: var(--sa-primary-bg, white);
            color: var(--sa-secondary-text, #333);
            border: 1px solid var(--sa-border-color, #e0e0e0);
            border-radius: 12px;
            padding: 24px;
            max-width: 400px;
            width: 90%;
            box-shadow: var(--sa-shadow, 0 20px 60px rgba(0, 0, 0, 0.3));
        }
        
        .sa-restoration-header h3 {
            margin: 0 0 8px 0;
            font-size: 18px;
            color: var(--sa-secondary-text, #333);
        }
        
        .sa-restoration-header p {
            margin: 0 0 20px 0;
            color: var(--sa-secondary-text, #666);
            opacity: 0.8;
            font-size: 14px;
        }
        
        .sa-progress-bar {
            width: 100%;
            height: 8px;
            background: var(--sa-border-color, #f0f0f0);
            border-radius: 4px;
            overflow: hidden;
            margin-bottom: 12px;
        }
        
        .sa-progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #10b981, #059669);
            width: 0%;
            transition: width 0.3s ease;
        }
        
        .sa-progress-text {
            font-size: 12px;
            color: var(--sa-secondary-text, #666);
            opacity: 0.8;
            text-align: center;
            white-space: pre-line;
            line-height: 1.4;
            min-height: 32px;
        }
        
        /* Dark theme specific styles */
        [data-theme="dark"] .sa-restoration-modal,
        [data-theme="dark-blue"] .sa-restoration-modal,
        [data-theme="dark-purple"] .sa-restoration-modal,
        [data-theme="dark-green"] .sa-restoration-modal,
        [data-theme="dark-orange"] .sa-restoration-modal,
        [data-theme="dark-rose"] .sa-restoration-modal,
        [data-theme="dark-minimal"] .sa-restoration-modal {
            background: var(--sa-primary-bg);
            color: var(--sa-secondary-text);
            border-color: var(--sa-border-color);
        }
    `;

    document.head.appendChild(style);
    document.body.appendChild(overlay);
}

function updateRestorationProgress(completed, total) {
    const progressFill = document.getElementById('sa-restoration-progress-fill');
    const progressText = document.getElementById('sa-restoration-progress-text');

    if (progressFill && progressText) {
        const percentage = Math.round((completed / total) * 100);
        progressFill.style.width = `${percentage}%`;
        progressText.textContent = `Restoring... ${completed}/${total} elements (${percentage}%)`;
    }
}

function hideRestorationOverlay() {
    const overlay = document.getElementById('sa-restoration-overlay');
    if (overlay) {
        overlay.remove();
    }

    // Remove the style element too
    const style = document.querySelector('style[data-sa-restoration]');
    if (style) {
        style.remove();
    }
}

function showTranslationNotification(message, type) {
    // Remove any existing notification first
    const existingNotification = document.getElementById('sa-translation-notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.id = 'sa-translation-notification';
    notification.className = `sa-notification sa-notification-${type} sa-extension-ui`; // Mark as extension UI
    notification.textContent = message;

    // Apply current theme to notification
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    if (currentTheme !== 'light') {
        notification.setAttribute('data-theme', currentTheme);
    }

    // Add styles with theme support
    const style = document.createElement('style');
    style.setAttribute('data-sa-notification', 'true');
    style.textContent = `
        .sa-notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            border-radius: 8px;
            color: white;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-size: 14px;
            z-index: 999999;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            animation: slideIn 0.3s ease;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .sa-notification-success {
            background: #10b981;
        }
        
        .sa-notification-error {
            background: #ef4444;
        }
        
        /* Dark theme adjustments */
        [data-theme="dark"] .sa-notification,
        [data-theme="dark-blue"] .sa-notification,
        [data-theme="dark-purple"] .sa-notification,
        [data-theme="dark-green"] .sa-notification,
        [data-theme="dark-orange"] .sa-notification,
        [data-theme="dark-rose"] .sa-notification,
        [data-theme="dark-minimal"] .sa-notification {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
            border-color: rgba(255, 255, 255, 0.2);
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;

    document.head.appendChild(style);
    document.body.appendChild(notification);

    // Auto-remove after 4 seconds
    setTimeout(() => {
        notification.remove();
        style.remove();
    }, 4000);
}

// Screenshot Translation Functionality
let isSelectingArea = false;
let selectionOverlay = null;
let selectionBox = null;
let startX, startY, endX, endY;

function captureFullPageScreenshot() {
    chrome.runtime.sendMessage({ action: 'captureVisibleTab' }, (response) => {
        if (response.error) {
            showTranslationNotification(`Screenshot failed: ${response.error}`, 'error');
            return;
        }
        
        if (response.imageDataUrl) {
            translateScreenshot(response.imageDataUrl, 'Full Page Screenshot');
        }
    });
}

function startAreaSelection() {
    if (isSelectingArea) return;
    
    isSelectingArea = true;
    document.body.style.cursor = 'crosshair';
    
    // Create overlay
    selectionOverlay = document.createElement('div');
    selectionOverlay.className = 'sa-extension-ui sa-screenshot-overlay';
    selectionOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.3);
        z-index: 999999;
        cursor: crosshair;
    `;
    
    // Create selection box
    selectionBox = document.createElement('div');
    selectionBox.className = 'sa-extension-ui sa-selection-box';
    selectionBox.style.cssText = `
        position: fixed;
        border: 2px dashed #3b82f6;
        background: rgba(59, 130, 246, 0.1);
        z-index: 1000000;
        display: none;
        pointer-events: none;
    `;
    
    document.body.appendChild(selectionOverlay);
    document.body.appendChild(selectionBox);
    
    // Add instruction
    const instruction = document.createElement('div');
    instruction.className = 'sa-extension-ui sa-instruction';
    instruction.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--sa-primary-bg, white);
        color: var(--sa-secondary-text, #333);
        padding: 12px 20px;
        border-radius: 8px;
        z-index: 1000001;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-size: 14px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        border: 1px solid var(--sa-border-color, #e0e0e0);
    `;
    instruction.textContent = 'Click and drag to select area for translation. Press ESC to cancel.';
    document.body.appendChild(instruction);
    
    // Event listeners
    selectionOverlay.addEventListener('mousedown', startSelection);
    document.addEventListener('mousemove', updateSelection);
    document.addEventListener('mouseup', endSelection);
    document.addEventListener('keydown', cancelSelection);
    
    function startSelection(e) {
        startX = e.clientX;
        startY = e.clientY;
        selectionBox.style.display = 'block';
        selectionBox.style.left = startX + 'px';
        selectionBox.style.top = startY + 'px';
        selectionBox.style.width = '0px';
        selectionBox.style.height = '0px';
    }
    
    function updateSelection(e) {
        if (!isSelectingArea || selectionBox.style.display === 'none') return;
        
        endX = e.clientX;
        endY = e.clientY;
        
        const left = Math.min(startX, endX);
        const top = Math.min(startY, endY);
        const width = Math.abs(endX - startX);
        const height = Math.abs(endY - startY);
        
        selectionBox.style.left = left + 'px';
        selectionBox.style.top = top + 'px';
        selectionBox.style.width = width + 'px';
        selectionBox.style.height = height + 'px';
    }
    
    function endSelection(e) {
        if (!isSelectingArea || selectionBox.style.display === 'none') return;
        
        const left = Math.min(startX, endX);
        const top = Math.min(startY, endY);
        const width = Math.abs(endX - startX);
        const height = Math.abs(endY - startY);
        
        if (width > 10 && height > 10) {
            const area = { left, top, width, height };
            captureAreaScreenshot(area);
        }
        
        cleanupSelection();
    }
    
    function cancelSelection(e) {
        if (e.key === 'Escape') {
            cleanupSelection();
        }
    }
    
    function cleanupSelection() {
        isSelectingArea = false;
        document.body.style.cursor = '';
        
        if (selectionOverlay) {
            selectionOverlay.remove();
            selectionOverlay = null;
        }
        if (selectionBox) {
            selectionBox.remove();
            selectionBox = null;
        }
        if (instruction) {
            instruction.remove();
        }
        
        document.removeEventListener('mousemove', updateSelection);
        document.removeEventListener('mouseup', endSelection);
        document.removeEventListener('keydown', cancelSelection);
    }
}

function captureAreaScreenshot(area) {
    // Hide the instruction text before taking screenshot
    const instruction = document.querySelector('.sa-instruction');
    const originalDisplay = instruction ? instruction.style.display : null;
    if (instruction) {
        instruction.style.display = 'none';
    }
    
    // Small delay to ensure instruction is hidden before screenshot
    setTimeout(() => {
        chrome.runtime.sendMessage({ 
            action: 'captureVisibleTab',
            area: area
        }, (response) => {
            // Restore instruction visibility after screenshot
            if (instruction && originalDisplay !== null) {
                instruction.style.display = originalDisplay;
            }
            
            if (response.error) {
                showTranslationNotification(`Screenshot failed: ${response.error}`, 'error');
                return;
            }
            
            if (response.imageDataUrl) {
                translateScreenshot(response.imageDataUrl, 'Selected Area');
            }
        });
    }, 100);
}

async function translateScreenshot(imageDataUrl, source) {
    try {
        // Get translation settings
        const config = await new Promise((resolve) => {
            chrome.storage.sync.get([
                'selectedProvider', 
                'providerApiKeys', 
                'selectedAiModel', 
                'customApiUrl', 
                'customModel', 
                'googleAiApiKey',
                'targetLanguage',
                'translationPrompt'
            ], resolve);
        });

        const currentProvider = config.selectedProvider || 'gemini';
        const providerApiKeys = config.providerApiKeys || {};
        const targetLanguage = config.targetLanguage || 'Persian';
        
        // Handle legacy Gemini API key
        let apiKey = providerApiKeys[currentProvider];
        if (!apiKey && currentProvider === 'gemini' && config.googleAiApiKey) {
            apiKey = config.googleAiApiKey;
        }

        if (!apiKey) {
            showTranslationNotification('API key not configured for selected provider', 'error');
            return;
        }

        const model = config.selectedAiModel || 'gemini-2.0-flash-exp';
        
        // Use custom prompt or default - need to define the constant
        const DEFAULT_IMAGE_TRANSLATION_PROMPT = `You are a professional translator tasked with converting text in this image into fluent, natural <LANGUAGE>. Extract all visible text from the image and translate it with precision, using <LANGUAGE> idioms, formal native structures, and a refined literary tone. Preserve the original text formatting as much as possible, including paragraph structure and any visible formatting. Provide only the translated content without any additional comments or explanations.`;
        
        let prompt = config.translationPrompt || DEFAULT_IMAGE_TRANSLATION_PROMPT;
        prompt = prompt.replace(/<LANGUAGE>/g, targetLanguage);

        // Show processing notification
        showTranslationNotification(`Analyzing and translating ${source.toLowerCase()}...`, 'info');

        // Create translation modal
        showScreenshotTranslationModal(imageDataUrl, source);

        // Make API request
        let translatedText;
        if (window.AIHandler && window.AIHandler.makeRequest) {
            const providerConfig = window.AIProviders && window.AIProviders[currentProvider];
            if (!providerConfig) {
                throw new Error(`Unknown provider: ${currentProvider}`);
            }

            // For image analysis, we need to modify the request
            if (currentProvider === 'gemini') {
                translatedText = await makeGeminiVisionRequest(prompt, imageDataUrl, apiKey, model);
            } else {
                // For other providers, convert image to base64 and include in prompt
                const base64Image = imageDataUrl.split(',')[1];
                const imagePrompt = `${prompt}\n\n[Image data provided as base64: ${base64Image.substring(0, 100)}...]`;
                translatedText = await window.AIHandler.makeRequest(imagePrompt, providerConfig, model, apiKey);
            }
        } else {
            // Fallback to Gemini Vision API
            translatedText = await makeGeminiVisionRequest(prompt, imageDataUrl, apiKey, model);
        }

        // Update modal with results
        updateScreenshotTranslationModal(translatedText, targetLanguage);
        
    } catch (error) {
        console.error('Screenshot translation error:', error);
        showTranslationNotification(`Translation failed: ${error.message}`, 'error');
        hideScreenshotTranslationModal();
    }
}

async function makeGeminiVisionRequest(prompt, imageDataUrl, apiKey, model) {
    const base64Image = imageDataUrl.split(',')[1];
    
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            contents: [{
                parts: [
                    { text: prompt },
                    {
                        inline_data: {
                            mime_type: "image/png",
                            data: base64Image
                        }
                    }
                ]
            }],
            generationConfig: {
                temperature: 0.3,
                topP: 1,
                responseMimeType: "text/plain"
            }
        })
    });

    if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const translatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!translatedText) {
        throw new Error('No translation received from Gemini API');
    }

    return translatedText;
}

function showScreenshotTranslationModal(imageDataUrl, source) {
    // Remove existing modal if any
    hideScreenshotTranslationModal();

    const modal = document.createElement('div');
    modal.id = 'sa-screenshot-modal';
    modal.className = 'sa-extension-ui';

    // Apply current theme
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    if (currentTheme !== 'light') {
        modal.setAttribute('data-theme', currentTheme);
    }

    modal.innerHTML = `
        <div class="sa-screenshot-modal-content">
            <div class="sa-screenshot-header">
                <h3>Screenshot Translation</h3>
                <button class="sa-close-btn" id="sa-close-modal-btn">×</button>
            </div>
            <div class="sa-screenshot-body">
                <div class="sa-screenshot-preview">
                    <img src="${imageDataUrl}" alt="${source}" style="max-width: 100%; max-height: 200px; object-fit: contain;">
                    <p class="sa-source-label">${source}</p>
                </div>
                <div class="sa-translation-result">
                    <div class="sa-loading">
                        <div class="sa-spinner"></div>
                        <p>Analyzing image and translating text...</p>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Add styles
    const style = document.createElement('style');
    style.setAttribute('data-sa-screenshot-modal', 'true');
    style.textContent = `
        #sa-screenshot-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            z-index: 999999;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        .sa-screenshot-modal-content {
            background: var(--sa-primary-bg, white);
            color: var(--sa-secondary-text, #333);
            border: 1px solid var(--sa-border-color, #e0e0e0);
            border-radius: 12px;
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow: hidden;
            box-shadow: var(--sa-shadow, 0 20px 60px rgba(0, 0, 0, 0.3));
        }
        
        .sa-screenshot-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 16px 20px;
            border-bottom: 1px solid var(--sa-border-color, #e0e0e0);
        }
        
        .sa-screenshot-header h3 {
            margin: 0;
            font-size: 18px;
            color: var(--sa-secondary-text, #333);
        }
        
        .sa-close-btn {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: var(--sa-secondary-text, #666);
            padding: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 4px;
        }
        
        .sa-close-btn:hover {
            background: var(--sa-border-color, #f0f0f0);
        }
        
        .sa-screenshot-body {
            padding: 20px;
            max-height: 60vh;
            overflow-y: auto;
        }
        
        .sa-screenshot-preview {
            text-align: center;
            margin-bottom: 20px;
        }
        
        .sa-source-label {
            margin: 8px 0 0 0;
            font-size: 12px;
            color: var(--sa-secondary-text, #666);
            opacity: 0.8;
        }
        
        .sa-translation-result {
            border: 1px solid var(--sa-border-color, #e0e0e0);
            border-radius: 8px;
            padding: 16px;
            background: var(--sa-primary-bg, #fafafa);
        }
        
        .sa-loading {
            text-align: center;
            color: var(--sa-secondary-text, #666);
        }
        
        .sa-spinner {
            width: 24px;
            height: 24px;
            border: 3px solid var(--sa-border-color, #e0e0e0);
            border-top: 3px solid var(--sa-accent, #3b82f6);
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 12px;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .sa-translated-text {
            white-space: pre-wrap;
            line-height: 1.6;
            font-size: 14px;
            color: var(--sa-secondary-text, #333);
        }
        
        .sa-copy-btn {
            margin-top: 12px;
            background: var(--sa-accent, #3b82f6);
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 13px;
            font-weight: 500;
            transition: all 0.2s ease;
            width: 100%;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
            line-height: 1;
        }
        
        .sa-copy-btn:hover {
            background: var(--sa-accent-hover, #2563eb);
            transform: translateY(-1px);
        }
        
        .sa-copy-btn:active {
            transform: translateY(0);
        }
    `;

    document.head.appendChild(style);
    document.body.appendChild(modal);

    // Add event listeners for modal interactions
    const closeBtn = modal.querySelector('#sa-close-modal-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            hideScreenshotTranslationModal();
        });
    }

    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            hideScreenshotTranslationModal();
        }
    });
}

function updateScreenshotTranslationModal(translatedText, targetLanguage) {
    const modal = document.getElementById('sa-screenshot-modal');
    if (!modal) return;

    const resultDiv = modal.querySelector('.sa-translation-result');
    if (!resultDiv) return;

    resultDiv.innerHTML = `
        <h4 style="margin: 0 0 12px 0; font-size: 14px; color: var(--sa-accent, #3b82f6);">
            Translated to ${targetLanguage}:
        </h4>
        <div class="sa-translated-text">${translatedText}</div>
        <button class="sa-copy-btn" id="sa-copy-text-btn" data-text="${translatedText.replace(/"/g, '&quot;').replace(/'/g, '&#39;')}">
            Copy Text
        </button>
    `;

    // Add event listener for copy button
    const copyBtn = resultDiv.querySelector('#sa-copy-text-btn');
    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
            const textToCopy = this.getAttribute('data-text');
            if (textToCopy) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    this.textContent = 'Copied!';
                    this.style.background = 'var(--sa-success-color, #10b981)';
                    setTimeout(() => {
                        this.textContent = 'Copy Text';
                        this.style.background = 'var(--sa-accent, #3b82f6)';
                    }, 2000);
                }).catch(() => {
                    this.textContent = 'Copy failed';
                    this.style.background = 'var(--sa-error-color, #ef4444)';
                    setTimeout(() => {
                        this.textContent = 'Copy Text';
                        this.style.background = 'var(--sa-accent, #3b82f6)';
                    }, 2000);
                });
            }
        });
    }
}

function hideScreenshotTranslationModal() {
    const modal = document.getElementById('sa-screenshot-modal');
    if (modal) {
        modal.remove();
    }

    const style = document.querySelector('style[data-sa-screenshot-modal]');
    if (style) {
        style.remove();
    }
}

// Chat Dock functionality
function showChatDock() {
    // First, remove any existing chat dock to ensure clean slate
    const existingChatDock = document.getElementById('select-act-chat-dock');
    if (existingChatDock) {
        existingChatDock.remove();
    }
    
    // Remove any existing chat dock styles
    const existingStyles = document.querySelectorAll('style[data-sa-chat-dock]');
    existingStyles.forEach(style => style.remove());
    
    // Create new chat dock
    const chatDock = document.createElement('div');
    chatDock.id = 'select-act-chat-dock';
    chatDock.className = 'sa-extension-ui';
    
    // Apply current theme
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    if (currentTheme !== 'light') {
        chatDock.setAttribute('data-theme', currentTheme);
    }
        
    chatDock.innerHTML = `
            <div class="sa-chat-header">
                <div class="sa-chat-title-container">
                    <h3>TextMind Pro Chat</h3>
                </div>
                <button class="sa-chat-close-btn" id="sa-chat-close-btn">×</button>
            </div>
            <div class="sa-chat-history" id="sa-chat-history">
                <div class="sa-welcome-message">
                    <p>Welcome to TextMind Pro Chat! Ask me anything or get help with text analysis.</p>
                </div>
            </div>
            <div class="sa-chat-input-container">
                <textarea id="sa-chat-input" placeholder="Type your message here..." rows="2"></textarea>
                <button class="sa-chat-send-btn" onclick="sendChatMessage()">Send</button>
            </div>
            <div class="sa-chat-footer">
                <button class="sa-new-chat-btn" id="sa-new-chat-btn">New Chat</button>
            </div>
    `;
    
    // Add enhanced styles
    const style = document.createElement('style');
        style.setAttribute('data-sa-chat-dock', 'true');
        style.textContent = `
            #select-act-chat-dock {
                position: fixed;
                top: 50%;
                right: 20px;
                transform: translateY(-50%);
                width: 320px;
                height: 390px;
                background: var(--sa-primary-bg, #ffffff);
                border: 1px solid var(--sa-border-color, #e0e0e0);
                border-radius: 12px;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
                z-index: 999998;
                display: flex;
                flex-direction: column;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                font-size: 14px;
                color: var(--sa-secondary-text, #333333);
                overflow: hidden;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            .sa-chat-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 12px 16px;
                background: var(--sa-accent, #3b82f6);
                color: white;
                border-radius: 12px 12px 0 0;
            }
            
            .sa-chat-header h3 {
                margin: 0;
                font-size: 16px;
                font-weight: 600;
            }
            
            .sa-chat-close-btn {
                background: none;
                border: none;
                color: white;
                font-size: 20px;
                cursor: pointer;
                padding: 4px;
                border-radius: 4px;
                transition: background-color 0.2s ease;
            }
            
            .sa-chat-close-btn:hover {
                background: rgba(255, 255, 255, 0.2);
            }
            
            .sa-chat-history {
                flex: 1;
                padding: 16px;
                overflow-y: auto;
                background: var(--sa-primary-bg, #ffffff);
            }
            
            .sa-welcome-message {
                text-align: center;
                color: var(--sa-secondary-text, #666);
                font-style: italic;
                padding: 20px;
                border: 1px dashed var(--sa-border-color, #e0e0e0);
                border-radius: 8px;
                background: var(--sa-primary-bg, #f9f9f9);
            }
            
            .sa-welcome-message p {
                margin: 0;
                line-height: 1.5;
            }
            
            .sa-chat-input-container {
                padding: 12px 16px;
                border-top: 1px solid var(--sa-border-color, #e0e0e0);
                background: var(--sa-primary-bg, #ffffff);
            }
            
            #sa-chat-input {
                width: 100%;
                border: 1px solid var(--sa-border-color, #e0e0e0);
                border-radius: 6px;
                padding: 8px 12px;
                font-size: 14px;
                font-family: inherit;
                resize: none;
                background: var(--sa-primary-bg, #ffffff);
                color: var(--sa-secondary-text, #333);
                box-sizing: border-box;
                margin-bottom: 8px;
            }
            
            #sa-chat-input:focus {
                outline: none;
                border-color: var(--sa-accent, #3b82f6);
                box-shadow: 0 0 0 2px rgba(var(--sa-accent-rgb, 59, 130, 246), 0.2);
            }
            
            .sa-chat-send-btn {
                width: 100%;
                background: var(--sa-accent, #3b82f6);
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 6px;
                cursor: pointer;
                font-size: 14px;
                font-weight: 500;
                transition: background-color 0.2s ease;
            }
            
            .sa-chat-send-btn:hover {
                background: var(--sa-accent-hover, #2563eb);
            }
            
            .sa-chat-footer {
                padding: 8px 16px;
                border-top: 1px solid var(--sa-border-color, #e0e0e0);
                background: var(--sa-primary-bg, #f9f9f9);
                text-align: center;
            }
            
            .sa-new-chat-btn {
                background: none;
                border: 1px solid var(--sa-border-color, #e0e0e0);
                color: var(--sa-secondary-text, #666);
                padding: 6px 12px;
                border-radius: 4px;
                cursor: pointer;
                font-size: 12px;
                transition: all 0.2s ease;
            }
            
            .sa-new-chat-btn:hover {
                background: var(--sa-border-color, #f0f0f0);
                border-color: var(--sa-accent, #3b82f6);
                color: var(--sa-accent, #3b82f6);
            }
            
            /* Dark theme support */
            [data-theme="dark"] #select-act-chat-dock,
            [data-theme="dark-blue"] #select-act-chat-dock,
            [data-theme="dark-purple"] #select-act-chat-dock,
            [data-theme="dark-green"] #select-act-chat-dock,
            [data-theme="dark-orange"] #select-act-chat-dock,
            [data-theme="dark-rose"] #select-act-chat-dock,
            [data-theme="dark-minimal"] #select-act-chat-dock {
                background: var(--sa-primary-bg);
                color: var(--sa-secondary-text);
                border-color: var(--sa-border-color);
            }
            
            [data-theme="dark"] .sa-chat-history,
            [data-theme="dark-blue"] .sa-chat-history,
            [data-theme="dark-purple"] .sa-chat-history,
            [data-theme="dark-green"] .sa-chat-history,
            [data-theme="dark-orange"] .sa-chat-history,
            [data-theme="dark-rose"] .sa-chat-history,
            [data-theme="dark-minimal"] .sa-chat-history {
                background: var(--sa-primary-bg);
            }
            
            [data-theme="dark"] #sa-chat-input,
            [data-theme="dark-blue"] #sa-chat-input,
            [data-theme="dark-purple"] #sa-chat-input,
            [data-theme="dark-green"] #sa-chat-input,
            [data-theme="dark-orange"] #sa-chat-input,
            [data-theme="dark-rose"] #sa-chat-input,
            [data-theme="dark-minimal"] #sa-chat-input {
                background: var(--sa-primary-bg);
                color: var(--sa-secondary-text);
                border-color: var(--sa-border-color);
            }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(chatDock);
        
        // Add event listeners for buttons
        const closeBtn = chatDock.querySelector('#sa-chat-close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                chatDock.style.display = 'none';
                chatDock.classList.remove('sa-visible');
            });
        }
        
        const newChatBtn = chatDock.querySelector('#sa-new-chat-btn');
        if (newChatBtn) {
            newChatBtn.addEventListener('click', function() {
                window.clearChatHistory();
            });
        }
        
        const sendBtn = chatDock.querySelector('.sa-chat-send-btn');
        if (sendBtn) {
            sendBtn.addEventListener('click', function() {
                window.sendChatMessage();
            });
        }
    
    // Add global functions for chat functionality
    window.sendChatMessage = function() {
            const input = document.getElementById('sa-chat-input');
            const message = input.value.trim();
            if (message) {
                addChatMessage('user', message);
                input.value = '';
                // Simulate AI response (replace with actual AI integration)
                setTimeout(() => {
                    addChatMessage('ai', 'This is a demo response. Connect your AI provider in settings for real conversations.');
                }, 1000);
            }
    };
    
    window.clearChatHistory = function() {
            const history = document.getElementById('sa-chat-history');
            if (history) {
                history.innerHTML = `
                    <div class="sa-welcome-message">
                        <p>New chat started! Ask me anything or get help with text analysis.</p>
                    </div>
                `;
            }
    };
    
    window.addChatMessage = function(sender, message) {
            const history = document.getElementById('sa-chat-history');
            if (history) {
                const messageDiv = document.createElement('div');
                messageDiv.className = `sa-chat-message sa-${sender}-message`;
                messageDiv.innerHTML = `
                    <div class="sa-message-content">${message}</div>
                    <div class="sa-message-time">${new Date().toLocaleTimeString()}</div>
                `;
                history.appendChild(messageDiv);
                history.scrollTop = history.scrollHeight;
            }
    };
    
    // Add Enter key support for input
    const chatInput = chatDock.querySelector('#sa-chat-input');
    if (chatInput) {
        chatInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                window.sendChatMessage();
            }
        });
    }
    
    // Show the chat dock
    chatDock.style.display = 'flex';
    chatDock.classList.add('sa-visible');
}

// Override any existing chat dock creation by monitoring DOM changes
const chatDockObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        mutation.addedNodes.forEach(function(node) {
            if (node.nodeType === 1 && node.id === 'select-act-chat-dock') {
                // If an old chat dock is added, replace it with our new one
                if (!node.querySelector('.sa-chat-title-container')) {
                    console.log('Replacing old chat dock with new one');
                    node.remove();
                    setTimeout(() => showChatDock(), 100);
                }
            }
        });
    });
});

// Start observing for chat dock creation
chatDockObserver.observe(document.body, { childList: true, subtree: true });