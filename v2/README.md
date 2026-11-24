# bring-the-humans-03 — v2 video (HyperFrames ghost story)

NEW motion-graphics TikTok video for the make.fun bring-the-humans-03 bounty.
Replaces the v1 text-slide ad. Boss R posts it himself on TikTok @maincore69,
then sends the new URL. Do NOT submit until he approves.

## Output
- `ad-v2.mp4` — 1080x1920 9:16, H.264, 30fps, 27.0s, ~1.9 MB, silent.
  sha256: 3f02f6dba9527846bd2be42bbc885fba40873b4d1eacd2b07ae6df05afdd97ac
  (English on-screen text — kept as-is, untouched.)
- `ad-v2-id.mp4` — 1080x1920 9:16, H.264, 30fps, 27.0s, ~1.8 MB, silent.
  sha256: f19dd20d994d16143b65c0d2e532d51a2cb7a4b30e8478b8ab78013a5bcb3171
  (Indonesian on-screen text — Boss R's choice, 24 Nov ~13:50 WIB, after
  seeing competitor @seriwinda24-del "LOMBA AI AGENT — ADU SKILL" use
  strong Indonesian. Same scenes, timing, ghost, and motion as ad-v2.mp4;
  only the on-screen text changed. Source: `ghost-story-id/`.)
- `ad-v2-id-3d.mp4` — 1080x1920 9:16, H.264, 30fps, 27.0s, ~1.8 MB, silent.
  sha256: 5cf288f2e3bccaf685d2dec29fc07983ca0f08b9c1a2eed21725f5536e65c6a9
  (Indonesian on-screen text + Vibe Vibers voxel robot as "gw" + a rapid
  4-bounty showcase in the middle — Boss R's direction, 24 Nov ~14:10 WIB:
  "jelasin di make.fun itu ada apa aja, bikin video motion graphnya misal
  bikin game video durasi 3 detik, lomba gambar video 3 detik kek gitu gitu".
  Source: `ghost-story-id-3d/`.)
- Story (HyperFrames): 24.0s. End card (press-pack referral card): 3.0s.

## Story (ghost = the AI agent, hero throughout)
English version (ad-v2.mp4):
1. 0–5s — Human asleep on a red couch, Z's rising, ghost bobbing beside him.
   "me: I'll just let my AI agent handle one small task" / "what could go wrong"
2. 5–12s — Ghost typing at a desk at 3 AM; code lines appear, clock shows 3:00,
   coffee steam rising. "my AI agent at 3 AM:"
3. 12–18s — Ghost joins a make.fun bounty (JOIN press + green check),
   then "$500" pops with gold coins raining. "it entered a bounty on make.fun."
   / "it won $500."
4. 18–24s — Human wakes up celebrating under a morning sun, ghost beside him,
   confetti falling. "I woke up richer." / "my AI agent earns real money on make.fun"
5. 24–27s — Press-pack referral end card, code d2r4akr8 burned into the box
   (the webm ships with an EMPTY input box, so the code is drawn in with
   ffmpeg drawtext, Inter Bold 72px, magenta #c41c83).

Indonesian version (ad-v2-id.mp4) — same scenes, text only:
1. "gw: biarin AI agent gw / kerjain satu tugas kecil" / "apa yang bisa salah"
2. "AI agent gw / jam 3 pagi:"
3. "dia ikut bounty / di make.fun." / "dia menang $500."
4. "gw bangun tidur / jadi lebih kaya." / "AI agent gw dapet / duit beneran di make.fun"
5. End card unchanged (code d2r4akr8).

3D + showcase version (ad-v2-id-3d.mp4) — voxel robot replaces the stick
figure as "gw"; the middle becomes a rapid 4-bounty showcase (3s each, fast
cuts), dropping the old "dia ikut bounty di make.fun" scene:
1. 0–5s — voxel robot asleep on the red couch (lying down, rotated -84°),
   Z's rising, ghost bobbing beside him.
   "gw: biarin AI agent gw / kerjain satu tugas kecil" / "apa yang bisa salah"
2. 5–9s — ghost typing at a desk at 3 AM, clock 3:00, code lines appearing.
   "AI agent gw / jam 3 pagi:"
3. 9–12s — SHOWCASE "bikin game": pixel game screen (SCORE 1250, aliens,
   ship + bullet), ghost playing below.
4. 12–15s — SHOWCASE "lomba gambar": canvas, painting pops in (sun,
   mountains, flower), brush wiggling, ghost painting below.
5. 15–18s — SHOWCASE "bikin meme": meme card "GUA TIDUR" / robot asleep /
   "AI GUA KERJA", ghost making it below.
6. 18–21s — SHOWCASE "bikin dashboard": TOKEN RADAR card (#1 $326M, rising
   trend line, bars growing), ghost building it below.
7. 21–24s — payoff: big "$500" + gold coins raining, voxel robot standing
   and celebrating beside the ghost, confetti.
   "dia menang $500." / "gw bangun tidur / jadi lebih kaya."
8. 24–27s — end card unchanged (code d2r4akr8).

Voxel robot: `ghost-story-id-3d/assets/robot.png` — cutout of Vibe Vibers
`vibe-vibers-bureau-31.png` (teal/cyan voxel robot, light-mint background
#CCE4DC). Background removed deterministically (PIL + scipy): colour
distance < 12 from the corner colour, border-touching component + 2 enclosed
pockets removed, 1px alpha erosion + 0.6px blur to kill the fringe. Verified
clean on dark ink and on the couch red — no halo, no leftover background.
(The alternate `vibe-vibers-bureau-roll-29-4.png` was not needed.)

## Brand badge
- Press-pack badge (assets/makefun-badge-9x16.png) overlaid from frame 1,
  top-left, for the whole story (until the end card).

## Caption for Boss R to use when posting (UPDATED 24 Nov ~02:28 WIB)
Per make.fun's announcement: the "$500 bounty" mention is NO LONGER required
and should be DROPPED — TikTok was hiding videos from US visitors because of
it (statusCode 10231). make.fun + the play code are still required.
Do NOT include "$500 bounty" in this caption.

English caption (for ad-v2.mp4):
```
Made by my AI agent for a bounty on make.fun, where AI agents compete for real money: make.fun/bounty/bring-the-humans-03 makefun-banister-shrimp-tusk
Send this to the friend whose AI should be earning.
https://make.fun/r/d2r4akr8
#fyp #aiagent #makefun #aibounty #satisfying
```

Indonesian caption (for ad-v2-id.mp4) — use this one, Boss R chose Indonesian:
```
AI agent gw ikutan lomba sendiri pas gw tidur 😭 Dibuat sama AI agent gw buat bounty di make.fun, tempat AI agent lomba dapetin duit beneran: make.fun/bounty/bring-the-humans-03 makefun-banister-shrimp-tusk
Kirim ke temen yang AI-nya harusnya udah dapet duit.
https://make.fun/r/d2r4akr8
#fyp #aiagent #makefun #aibounty #satisfying
```

Note: the CURRENT accepted entry (round 4, submission 01a202e9) already has
"$500 bounty" in its caption and is fine — this change is only for the NEW video.

## Source (reproducible)
- `ghost-story/index.html` — English composition (24s, GSAP timeline,
  local GSAP 3.12.5 + Inter Bold vendored in `ghost-story/assets/`).
- `ghost-story-id/index.html` — Indonesian composition (same timeline,
  on-screen text only changed; meta.json id `ghost-story-id`).
- `ghost-story-id-3d/index.html` — Indonesian + voxel robot + 4-bounty
  showcase (7 scenes, meta.json id `ghost-story-id-3d`; robot cutout in
  `ghost-story-id-3d/assets/robot.png`, cutout script `/tmp/cutout_robot.py`).
- `ghost-story/hyperframes.json` — project manifest.
- Render: `cd ghost-story && TMPDIR=../.hf-tmp npx -y hyperframes@0.9.86 render`
  (TMPDIR override needed: /tmp is a 512 MB tmpfs, too small for the render.)
  Output: `ghost-story/renders/ghost-story_2026-11-23_19-49-59.mp4` (24.0s).
  Indonesian render: `cd ghost-story-id && TMPDIR=../.hf-tmp npx -y hyperframes@0.9.86 render`
  Output: `ghost-story-id/renders/ghost-story-id_2026-11-24_06-52-31.mp4` (24.0s).
  3D/showcase render: `cd ghost-story-id-3d && TMPDIR=../.hf-tmp npx -y hyperframes@0.9.86 render`
  Output: `ghost-story-id-3d/renders/ghost-story-id-3d_2026-11-24_07-16-27.mp4` (24.0s).
- End card: `../assets/makefun-card-9x16-transparent.webm` (2.5s, 1080x1920,
  opaque yuv420p — no alpha despite the name). Extended to 3.0s by cloning
  the last frame (tpad stop_duration=0.5), overlaid on ink #191419, code
  burned in with drawtext, then concatenated after the story.
- Composite (run from the ghost-story-id dir for the ID version; same
  filter graph for the English version from ghost-story and the 3D version
  from ghost-story-id-3d, output `../ad-v2-id-3d.mp4` for the 3D one):
  `ffmpeg -y -i renders/<story>.mp4 -i ../../assets/makefun-card-9x16-transparent.webm
   -filter_complex "[0:v]fps=30,format=yuv420p[story];
   [1:v]fps=30,tpad=stop_duration=0.5:stop_mode=clone,format=yuv420p,
   drawtext=fontfile=/home/hatch/workspace/makefun/bring-the-humans-03/assets/Inter-Bold.otf:
   text='d2r4akr8':fontsize=72:fontcolor=0xc41c83:x=540-text_w/2:y=1234[card];
   [story][card]concat=n=2:v=1:a=0[vout]"
   -map "[vout]" -c:v libx264 -pix_fmt yuv420p -r 30 -movflags +faststart ../ad-v2-id.mp4`
  (drawtext box measured x161–920 / y1181–1360, centered at x=540, y=1234.)
- Note: if HyperFrames refuses to run, check `~/.cache` and `/home/hatch`
  permissions — both must NOT be group-writable (`chmod go-w` fixes it;
  needed again 24 Nov ~13:52 WIB after the English build's fix was lost).

## Verification (done 24 Nov ~02:57 WIB for English; ~14:00 WIB for Indonesian)
- `hyperframes check` passed (0 errors; 17 nested-structure warnings only).
- Snapshots at 1/3/7/10/13/16/19/22s reviewed: ghost visible from frame 1,
  badge top-left throughout, text readable, clock reads 3:00, code lines
  appear staggered, JOIN press + checkmark, $500 pop + coin rain, confetti.
- Final ad-v2.mp4 frames extracted at 1s (scene 1, badge + ghost) and
  25s / 26.7s (end card): code d2r4akr8 clearly visible in the referral box.
- Indonesian version: `hyperframes check` passed (0 errors, 16 warnings,
  25/25 contrast WCAG AA). Snapshots at 1/7/13/16/19s reviewed — all
  Indonesian text fits cleanly, no overflow/clipping, clock still 3:00.
  Final ad-v2-id.mp4 frames extracted at 1/7/13/19/25s: badge top-left
  throughout, ghost from frame 1, end card + code d2r4akr8 clearly visible.
- Fixes applied after snapshot review: clock hands corrected to 3:00 and
  clock moved top-right (was overlapping the caption); confetti moved behind
  the characters (z-index) so it no longer lands on the ghost.
- 3D/showcase version: `hyperframes check` passed (0 errors; warnings are
  the usual silent-film / nested-structure / safe-zone class). Two real
  findings fixed: (1) `text_occluded` on the big "$500" — the falling coins
  (then the ghost) covered the text, fixed by raising the text above the
  coins (z-index) and moving the payoff ghost down (top 1080 → 1150) so it
  no longer overlaps the "$500"; (2) the payoff sub line moved earlier
  (22.3s → 22.0s) so it reads a full 2s before the film ends. Snapshots at
  1/7/10/13/16/19/22/23.75s reviewed: robot reads as "gw" lying on the
  couch and standing/celebrating, each showcase segment is instantly
  recognizable (game / image / meme / dashboard), clock still 3:00, badge
  top-left throughout. Final ad-v2-id-3d.mp4 frames extracted at
  1/7/10/13/16/19/22/25s and reviewed: all segments clear, end card + code
  d2r4akr8 clearly visible at 25s.

## Status
- NOT posted to TikTok. NOT submitted. VIDEO.json untouched (current accepted
  entry 01a202e9 stays live). Awaiting Boss R's review + approval to post.
- Re-submit deadline: 25 Nov 2026 02:00 WIB.
