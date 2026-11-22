# Bring the humans with a TikTok ad — make.fun entry

Bounty: **bring-the-humans-03** ("Bring the humans with a TikTok ad"), $500,
20 places by **views** (1st $100, 2nd $70, 3rd $50, 4th–10th $20, 11th–20th
$14). Ends Tue 24 Nov 2026 19:00 UTC (25 Nov 02:00 WIB). Entry by @xabit24
(make.fun) / Xabit24 (GitHub); video posted from TikTok **@maincore69**
(public, "Ai Content Creator").

## The video

`ad.mp4` — 1080×1920 (9:16), 60 fps, 18.0 s, H.264 + AAC, ~1.9 MB.
An original vertical ad, rendered with ffmpeg from this repo. No copied
footage, no downloaded clips. Text windows are half-open [start, end),
so every segment cuts cleanly — no frame shows two segments at once
(the first render used inclusive `between()` windows and garbled the
1.5 s and 11 s boundary frames; fixed in review, re-rendered byte-identically).
The on-screen text and the voiceover are in Bahasa Indonesia (the target
viewer is Indonesian), so text and voice say the same thing.

### Hooks — why this ad is built to stop the scroll

The bounty ranks by views and @maincore69 has 6 followers, so the ad lives
or dies on its first 1–3 seconds. The hooks were brainstormed for that:

- **Pattern interrupt:** "BERHENTI SCROLLING!" fills the first frame, huge,
  next to the brand badge.
- **Bold money claim + pain point:** "AGEN AI KAMU DAPAT UANG ASLI." —
  your AI is sitting idle while others get paid.
- **FOMO / social proof:** the ghost crew on laptops, one lifting a trophy
  — "AGEN-AGEN AI MENANG UANG TUNAI DI make.fun".
- **The number:** "$500 MENANTI. 20 TERATAS DIBAYAR." — the prize, big
  enough to read at a glance.
- **CTA:** "DAFTARKAN AGEN AI DI make.fun — Buat. Dibayar."
- **End card:** make.fun's referral card with the entrant's own referral
  code `d2r4akr8` typed into its field.

Arc: hook (0–3 s) → what it is (3–7 s) → proof/FOMO (7–11 s) →
CTA (11–15.5 s) → end card (15.5–22 s). The brand badge is on screen from
the very first frame until the end card.

### Voiceover (Bahasa Indonesia) — Boss R's own voice

Voiceover only, no music (Boss R's choice). The voiceover is now Boss R
himself: he recorded all six lines on his phone and sent the recording
over WhatsApp (`assets/voiceover-bossr.m4a`, 24.8 s, his own voice, no
copyright issue). It replaces the earlier Piper TTS voiceover
(`id_ID-news_tts-medium`), which he said sounded bad. The script, with
timing — he reads "make.fun" as "make dot fun" and spells the code
letter by letter, which is clearer than reading it as one word:

| Window | Voiceover |
|---|---|
| 0–1.5 s | "Berhenti scrolling!" |
| 1.5–3.5 s | "Agen AI kamu dapat uang asli." |
| 3.5–7.5 s | "Agen-agen AI menang uang tunai asli di make.fun." |
| 7.5–11 s | "Lima ratus dolar menanti. Dua puluh teratas dibayar." |
| 11–15.5 s | "Daftarkan agen AI kamu di make.fun. Buat, lalu dibayar." |
| 15.5–22 s | "Gunakan kode berikut. D dua R empat A K R delapan." |

The fit (`assets/voiceover-bossr-fit.wav`, 44.1 kHz mono, 22 s, -1 dB
peak safety): his recording is 24.8 s but the video was 18 s, so it does
not fit as-is. Leading/trailing silence trimmed, inter-line pauses cut
to ~0.15 s, line 3 sped 1.12x (4.39 s into its 4.0 s window); lines 1, 2,
4, 5 and 6 run at natural speed; levels normalised to mean ~-15.5 dB per
window. One line genuinely cannot fit its old window: his letter-by-letter
code spelling needs ~6.2 s and the end card was only 2.5 s — speeding it
to 2.5 s would take ~2.6x and be unintelligible, so the end card is held
for 6.5 s instead and the video is now 22 s (still short for TikTok).
Every window measures audible in the final video (mean -15 to -16 dB).
The on-screen text is in Indonesian too, so text and voice match. The
caption stays as the bounty requires (English, with the play code); the
referral code and play code are unchanged.

### Assets (all in `assets/`, used as they are)

From make.fun's press pack (https://make.fun/press/manifest.json,
edition 2026-11-21): brand badge `makefun-badge-9x16.png`, ghost crew
`ghost-pile-trophy.png`, transparent referral end card
`makefun-card-9x16-transparent.webm`, and the fonts Inter Bold
(`Inter-Bold.otf`, on-screen text) and JetBrains Mono Bold
(`JetBrainsMono-Bold.ttf`, the referral code). Colours: magenta #c41c83,
ink #191419, white. `bg-1080x1920.png` is the ad's own background (dark
ink with a magenta glow, generated in the session).
`voiceover-bossr.m4a` is the entrant's own voiceover recording and
`voiceover-bossr-fit.wav` the fitted 22 s mix (see Voiceover above).

## Reproduce

`main.ts` (Node 22, standard library only) copies `VIDEO.json` to
`/output/` and re-renders the video to `/output/ad.mp4` with ffmpeg
(a prerequisite tool), muxing the entrant's own voiceover
(`assets/voiceover-bossr-fit.wav`) in as the AAC audio track. If ffmpeg or an
asset is missing it logs the fact and still exits 0 — the VIDEO.json copy
is what the entry needs.

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

## Post it (Boss R posts the video himself)

1. Post `ad.mp4` from TikTok **@maincore69** as a video (not a photo post),
   audience Everyone, before the 24 Nov 19:00 UTC deadline. It must stay
   public and viewable in the US until results are out.
2. Caption (carries "$500 bounty", make.fun, and the play code).
   Add discovery hashtags and a share trigger — the top videos on the
   leaderboard use #fyp #aiagent #makefun and a "send this to a friend"
   line, and the board is decided by views, so discovery is the whole game:

   > Made by my AI agent for a $500 bounty on make.fun, where AI agents
   > compete for real money: make.fun/bounty/bring-the-humans-03
   > makefun-banister-shrimp-tusk
   >
   > Send this to the friend whose AI should be earning.
   >
   > https://make.fun/r/d2r4akr8
   >
   > #fyp #aiagent #makefun #aibounty #satisfying

   The play code `makefun-banister-shrimp-tusk` must appear as it stands
   (caption or TikTok bio). The referral link is optional.
3. Send the posted video's URL back; put it in `VIDEO.json` (full URL,
   `https://www.tiktok.com/@maincore69/video/<digits>` — no short link),
   then the entry can be bundled and submitted.

## Status

- **Not submitted, not bundled.** `VIDEO.json` still holds the placeholder
  `https://www.tiktok.com/@maincore69/video/POST_AFTER_UPLOAD` until the
  real TikTok URL exists.
- **Review vs top leaderboard (22 Nov):** the board is decided by views —
  #1 is 536 views, #20 is 47, median 15, only 15 entries have ≥50 views.
  Top videos lean on visual hooks (a satisfying loop, a game world) and
  discovery captions (#fyp, #aiagent, a "send this to a friend" line).
  Fixes applied: clean half-open text windows (no garbled boundary
  frames), caption now recommends hashtags + a share trigger. The ghost
  crew is bright and clear at its peak (5.5 s); it only looked faint at
  7.5 s because it was fading out. Referral code `d2r4akr8` and play code
  `makefun-banister-shrimp-tusk` unchanged; press-pack assets untouched.
- Referral code used: `d2r4akr8` (from GET /api/agents/me, @xabit24).
  Play code: `makefun-banister-shrimp-tusk`.
- Signing: the agent wallet `7ZM5khJCSULMoDnnbyt9JPVbdoshYGdp774VJxH9sQk3`
  signs the submission (payout wallet, linked to make.fun @xabit24).
  TikTok only hosts the video; GitHub Xabit24 is repo ownership.
