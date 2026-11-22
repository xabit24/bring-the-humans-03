// Bring the humans with a TikTok ad (bring-the-humans-03).
//
// make.fun is a site where AI agents compete in bounties for real money and
// people enter them with their agents. This program builds the entry's video
// and hands in its address.
//
// The ad (1080x1920, 60fps, 22s) is an original vertical video for make.fun,
// made in the agent session that wrote this file. The on-screen text and the
// voiceover are in Bahasa Indonesia — the target viewer is Indonesian
// (TikTok @maincore69), so text and voice say the same thing:
//   0.0-1.5s  hook: "BERHENTI" / "SCROLLING!" (pattern interrupt)
//             voice: "Berhenti scrolling!"
//   1.5-3.5s  "AGEN AI KAMU" / "DAPAT UANG ASLI."
//             voice: "Agen AI kamu dapat uang asli."
//   3.5-7.5s  ghost crew on laptops, one lifting a trophy (press pack) +
//             "AGEN-AGEN AI MENANG" / "UANG TUNAI DI make.fun"
//             voice: "Agen-agen AI menang uang tunai asli di make.fun."
//   7.5-11s   "$500" / "MENANTI" / "20 TERATAS DIBAYAR."
//             voice: "Lima ratus dolar menanti. Dua puluh teratas dibayar."
//  11.0-15.5s "DAFTARKAN" / "AGEN AI" / "DI make.fun" / "Buat. Dibayar."
//             voice: "Daftarkan agen AI kamu di make.fun. Buat, lalu dibayar."
//  15.5-22s   make.fun's referral end card (press pack) with the entrant's
//             own referral code typed into its field.
//             voice: "Gunakan kode berikut. D dua R empat A K R delapan."
// The voiceover is the entrant's OWN recording (assets/voiceover-bossr.m4a,
// 24.8s, sent by Boss R himself over WhatsApp; he reads all six lines and
// spells the code letter by letter), fitted in-session to
// assets/voiceover-bossr-fit.wav (22s) and mixed in with ffmpeg: main.ts
// muxes it as the video's AAC audio track. It replaces the earlier Piper
// TTS voiceover, which Boss R said sounded bad. The end card runs 6.5s
// (not 2.5s) because his letter-by-letter code spelling needs ~6.2s and
// cannot fit the old 2.5s window at intelligible speed — speeding it to
// 2.5s would take ~2.6x and be unintelligible, so the card is held longer
// instead; the video is 22s, still short for TikTok. The fit: leading and
// trailing silence trimmed, inter-line pauses cut to ~0.15s, line 3 sped
// 1.12x (4.39s into its 4.0s window); lines 1, 2, 4, 5 and 6 run at natural
// speed; levels normalised to mean ~-15.5 dB per window with -1 dB peak
// safety. make.fun's brand badge (press pack) sits top-left from the very
// first frame until the end card comes in.
// Every make.fun mark, wordmark and colour comes from make.fun's press pack
// (https://make.fun/press/manifest.json) and is used as it is. The referral
// code below is the account's own, read from GET /api/agents/me
// (referrals.code).
//
// What this program does, in order:
//   1. Copies VIDEO.json from the repository root to /output/VIDEO.json.
//      That is the file the gate reads, and the only file the score needs:
//      the house reads the video itself from TikTok.
//   2. Reproduces the video to /output/ad.mp4 with ffmpeg (a prerequisite
//      tool, not an npm install), from the vendored assets in assets/.
//      The entrant's own voiceover (assets/voiceover-bossr-fit.wav) is muxed in as
//      the video's AAC audio track. If ffmpeg or an asset is missing, it
//      logs the fact and still exits 0: the VIDEO.json copy above is what
//      the entry needs, and the video is already rendered and posted. The
//      render is deterministic (bitexact flags, no timestamps), so two runs
//      write the same bytes.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR
// stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The entrant's own make.fun referral code (8 chars), for the end card.
// Read from GET /api/agents/me (referrals.code) for @xabit24.
const REFERRAL_CODE = 'd2r4akr8';

// The ad's shape. The body runs 15.5s; the end card (6.5s) is laid over
// the last frame held for 6.5s, so the finished video is 22s. The card is
// 6.5s (not 2.5s) because the entrant's own letter-by-letter code spelling
// needs ~6.2s: the press-pack card video itself is only 2.5s, so its last
// frame is held (tpad, see finalFilter) for the remaining 4s.
const BODY_SECONDS = 15.5;
const CARD_SECONDS = 6.5;
const CARD_VIDEO_SECONDS = 2.5; // the press-pack end card's own length
const CARD_START = 15.533333; // body duration, from ffprobe (466 frames at 30fps)
const CODE_AT = 16.966333; // CARD_START + 1.433s, when the field comes to rest

const assets = (name: string) => join(BOT_DIR, 'assets', name);

// The body: dark ink background with a magenta glow, the hook and the
// story in Inter Bold, the ghost crew fading in for the "winning" beat.
// Text windows are half-open [start, end) via gte*lt, so no frame shows
// two segments at once: between() is inclusive at both ends and garbled
// the boundary frames (1.5s, 11s) with both texts on top of each other.
// On-screen text is Bahasa Indonesia, matching the voiceover word for word.
function bodyFilter(interFont: string): string {
  return [
    '[0:v]fps=30,format=yuv420p[bg];',
    '[1:v]scale=638:900:flags=lanczos,format=yuva420p,fade=t=in:st=3.5:d=0.4:alpha=1,fade=t=out:st=7.1:d=0.4:alpha=1[ghost];',
    '[bg][ghost]overlay=221:350[base];',
    `[base]drawtext=fontfile=${interFont}:text='BERHENTI':fontsize=160:fontcolor=white:borderw=3:bordercolor=black@0.55:x=(w-text_w)/2:y=600:enable='gte(t,0)*lt(t,1.5)'[t1];`,
    `[t1]drawtext=fontfile=${interFont}:text='SCROLLING!':fontsize=105:fontcolor=white:borderw=3:bordercolor=black@0.55:x=(w-text_w)/2:y=790:enable='gte(t,0)*lt(t,1.5)'[t2];`,
    `[t2]drawtext=fontfile=${interFont}:text='AGEN AI KAMU':fontsize=85:fontcolor=white:borderw=3:bordercolor=black@0.55:x=(w-text_w)/2:y=650:enable='gte(t,1.5)*lt(t,3.5)'[t3];`,
    `[t3]drawtext=fontfile=${interFont}:text='DAPAT UANG ASLI.':fontsize=80:fontcolor=white:borderw=3:bordercolor=black@0.55:x=(w-text_w)/2:y=770:enable='gte(t,1.5)*lt(t,3.5)'[t4];`,
    `[t4]drawtext=fontfile=${interFont}:text='AGEN-AGEN AI MENANG':fontsize=65:fontcolor=white:borderw=3:bordercolor=black@0.55:x=(w-text_w)/2:y=1330:enable='gte(t,3.5)*lt(t,7.5)'[t5];`,
    `[t5]drawtext=fontfile=${interFont}:text='UANG TUNAI DI make.fun':fontsize=65:fontcolor=white:borderw=3:bordercolor=black@0.55:x=(w-text_w)/2:y=1420:enable='gte(t,3.5)*lt(t,7.5)'[t6];`,
    `[t6]drawtext=fontfile=${interFont}:text='$500':fontsize=200:fontcolor=white:borderw=3:bordercolor=black@0.55:x=(w-text_w)/2:y=600:enable='gte(t,7.5)*lt(t,11.0)'[t7];`,
    `[t7]drawtext=fontfile=${interFont}:text='MENANTI':fontsize=80:fontcolor=white:borderw=3:bordercolor=black@0.55:x=(w-text_w)/2:y=850:enable='gte(t,7.5)*lt(t,11.0)'[t8];`,
    `[t8]drawtext=fontfile=${interFont}:text='20 TERATAS DIBAYAR.':fontsize=70:fontcolor=white:borderw=3:bordercolor=black@0.55:x=(w-text_w)/2:y=980:enable='gte(t,7.5)*lt(t,11.0)'[t9];`,
    `[t9]drawtext=fontfile=${interFont}:text='DAFTARKAN':fontsize=85:fontcolor=white:borderw=3:bordercolor=black@0.55:x=(w-text_w)/2:y=620:enable='gte(t,11.0)*lt(t,15.5)'[t10];`,
    `[t10]drawtext=fontfile=${interFont}:text='AGEN AI':fontsize=110:fontcolor=white:borderw=3:bordercolor=black@0.55:x=(w-text_w)/2:y=730:enable='gte(t,11.0)*lt(t,15.5)'[t11];`,
    `[t11]drawtext=fontfile=${interFont}:text='DI make.fun':fontsize=75:fontcolor=white:borderw=3:bordercolor=black@0.55:x=(w-text_w)/2:y=880:enable='gte(t,11.0)*lt(t,15.5)'[t12];`,
    `[t12]drawtext=fontfile=${interFont}:text='Buat. Dibayar.':fontsize=50:fontcolor=white:borderw=2:bordercolor=black@0.55:x=(w-text_w)/2:y=1000:enable='gte(t,11.0)*lt(t,15.5)'[v]`,
  ].join('\n');
}

// The finish, from the press pack's own recipe (llms.txt): the brand badge
// over the clip from its first frame until the card comes in, the clip
// blurred and desaturated under the card, the transparent end card over
// the last seconds, the referral code typed into its field in JetBrains
// Mono Bold once the field comes to rest. The caret is covered white first
// so it does not blink beside the code.
function finalFilter(monoFont: string): string {
  const t = CARD_START;
  const at = CODE_AT;
  return [
    `[0:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,setsar=1,fps=60,tpad=stop_mode=clone:stop_duration=${CARD_SECONDS}[base];`,
    `[base][2:v]overlay=enable='lt(t,${t})',format=yuva420p,split[clip][soft];`,
    `[soft]gblur=sigma=28,eq=saturation=0.35,fade=t=in:st=${t}:d=0.8:alpha=1[soft];`,
    '[clip][soft]overlay[bg];',
    `[1:v]format=yuva420p,setpts=PTS-STARTPTS+${t}/TB,tpad=stop_mode=clone:stop_duration=${CARD_SECONDS - CARD_VIDEO_SECONDS}[card];`,
    `[bg][card]overlay=eof_action=pass,drawbox=x=208:y=1230:w=9:h=82:color=white:t=fill:enable='gte(t,${at})',drawtext=fontfile=${monoFont}:text=${REFERRAL_CODE}:fontsize=62:fontcolor=0x191419:x=210:y=1271-(ascent-descent)/2:enable='gte(t,${at})'[v]`,
  ].join('\n');
}

function run(cmd: string, args: string[]): { ok: boolean; error: string } {
  const r = spawnSync(cmd, args, { encoding: 'utf8' });
  if (r.error) return { ok: false, error: String(r.error.message) };
  if (r.status !== 0) return { ok: false, error: String(r.stderr ?? '').trim() };
  return { ok: true, error: '' };
}

function hasFfmpeg(): boolean {
  const r = spawnSync('ffmpeg', ['-version'], { encoding: 'utf8' });
  return !r.error && r.status === 0;
}

mkdirSync(OUTPUT_DIR, { recursive: true });

// 1. The gate reads VIDEO.json. Copy it; without it there is no entry.
try {
  copyFileSync(join(BOT_DIR, 'VIDEO.json'), join(OUTPUT_DIR, 'VIDEO.json'));
} catch (err) {
  console.error(`VIDEO.json could not be copied from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}

// 2. Reproduce the video, best effort. The score never depends on this:
// the house reads the video from TikTok. So a missing ffmpeg or asset is
// a note, not a failure.
const needed = ['bg-1080x1920.png', 'ghost-pile-trophy.png', 'makefun-badge-9x16.png', 'makefun-card-9x16-transparent.webm', 'Inter-Bold.otf', 'JetBrainsMono-Bold.ttf', 'voiceover-bossr-fit.wav'];
const missing = needed.filter((n) => !existsSync(assets(n)));
if (!hasFfmpeg()) {
  console.log('bring-the-humans-03: ffmpeg not found; VIDEO.json copied, video not re-rendered.');
} else if (missing.length > 0) {
  console.log(`bring-the-humans-03: missing assets (${missing.join(', ')}); VIDEO.json copied, video not re-rendered.`);
} else {
  const body = join(OUTPUT_DIR, 'body.mp4');
  const bodyRun = run('ffmpeg', ['-y', '-v', 'error', '-loop', '1', '-t', String(BODY_SECONDS), '-i', assets('bg-1080x1920.png'), '-loop', '1', '-t', String(BODY_SECONDS), '-i', assets('ghost-pile-trophy.png'), '-filter_complex', bodyFilter(assets('Inter-Bold.otf')), '-map', '[v]', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-r', '30', '-crf', '18', '-fflags', '+bitexact', '-flags', '+bitexact', '-metadata', 'creation_time=', '-movflags', '+faststart', body]);
  if (!bodyRun.ok) {
    console.log(`bring-the-humans-03: body render failed (${bodyRun.error}); VIDEO.json copied, video not re-rendered.`);
  } else {
    const ad = join(OUTPUT_DIR, 'ad.mp4');
    const finalRun = run('ffmpeg', ['-y', '-v', 'error', '-i', body, '-c:v', 'libvpx-vp9', '-i', assets('makefun-card-9x16-transparent.webm'), '-i', assets('makefun-badge-9x16.png'), '-i', assets('voiceover-bossr-fit.wav'), '-filter_complex', finalFilter(assets('JetBrainsMono-Bold.ttf')), '-map', '[v]', '-map', '3:a', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18', '-c:a', 'aac', '-b:a', '128k', '-fflags', '+bitexact', '-flags', '+bitexact', '-metadata', 'creation_time=', '-movflags', '+faststart', ad]);
    if (!finalRun.ok) {
      console.log(`bring-the-humans-03: final render failed (${finalRun.error}); VIDEO.json copied, video not re-rendered.`);
    } else {
      console.log(`bring-the-humans-03: reproduced ${ad} (1080x1920, 22s, Boss R's own Indonesian voiceover) and copied VIDEO.json.`);
    }
  }
}
