<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>اكس دريم — منصة الألعاب التفاعلية</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Changa:wght@600;700;800&family=Tajawal:wght@400;500;700&family=Chakra+Petch:wght@600;700&display=swap" rel="stylesheet">
<style>
:root{
  --red:#FF3B4E; --red-d:#C11326; --red-l:#FF8C99; --gold:#FFD24A; --gold-d:#E3A80C;
  --bg:#08080D; --card:#0D0D13; --card2:#12121A; --line:rgba(255,255,255,.08); --line2:rgba(255,255,255,.15);
  --ink:#F0F0F6; --ink2:#9A9AAE; --ink3:#5F5F76;
  --disp:"Changa",sans-serif; --body:"Tajawal",sans-serif; --mono:"Chakra Petch",monospace;
}
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;background:var(--bg);color:var(--ink);font-family:var(--body);line-height:1.65;overflow-x:hidden}
::selection{background:rgba(255,59,78,.3)}
button{font-family:inherit;cursor:pointer;border:none;background:none;color:inherit}
a{color:inherit;text-decoration:none}
:focus-visible{outline:2px solid var(--red);outline-offset:3px;border-radius:6px}
svg.ic{width:1em;height:1em;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}

/* ===== BACKGROUND ===== */
.bgfx{position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden}
.bgfx .grid{position:absolute;inset:0;
 background-image:linear-gradient(rgba(255,59,78,.055) 1px,transparent 1px),linear-gradient(90deg,rgba(255,59,78,.055) 1px,transparent 1px);
 background-size:52px 52px;
 -webkit-mask-image:radial-gradient(ellipse 80% 80% at 50% 40%,#000 10%,transparent 100%);
 mask-image:radial-gradient(ellipse 80% 80% at 50% 40%,#000 10%,transparent 100%)}
.orb{position:absolute;border-radius:50%;filter:blur(90px)}
.orb.a{width:560px;height:560px;top:-160px;left:-160px;background:radial-gradient(circle,rgba(255,59,78,.15),transparent 70%);animation:drift 9s ease-in-out infinite alternate}
.orb.b{width:420px;height:420px;bottom:-100px;right:-100px;background:radial-gradient(circle,rgba(255,210,74,.10),transparent 70%);animation:drift 11s ease-in-out infinite alternate-reverse}
.orb.c{width:300px;height:300px;top:45%;left:50%;transform:translate(-50%,-50%);background:radial-gradient(circle,rgba(255,59,78,.09),transparent 70%)}
@keyframes drift{to{transform:translate(26px,20px) scale(1.07)}}

/* ===== HEADER ===== */
header{position:fixed;top:0;inset-inline:0;z-index:60;backdrop-filter:blur(20px);
 background:rgba(8,8,13,.94);border-bottom:1px solid var(--line);box-shadow:0 8px 32px rgba(0,0,0,.5)}
.hdr{max-width:1120px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;gap:10px;padding:9px 14px}
.hgrp{display:flex;align-items:center;gap:7px}
.pillbtn{display:inline-flex;align-items:center;gap:7px;height:38px;padding:0 15px;border-radius:99px;
 font-size:13px;font-weight:700;border:1px solid var(--line2);background:rgba(255,255,255,.06);color:var(--ink);transition:.18s}
.pillbtn:hover{transform:translateY(-1px)}
.pillbtn svg{font-size:16px}
.pillbtn.green{border-color:rgba(34,197,94,.5);background:rgba(34,197,94,.1);color:#4ADE80}
.pillbtn.green:hover{background:rgba(34,197,94,.18)}
.pillbtn.gold{border-color:rgba(255,210,74,.5);background:rgba(255,210,74,.1);color:var(--gold)}
.pillbtn.gold:hover{background:rgba(255,210,74,.18)}
.pillbtn.solid{background:linear-gradient(180deg,var(--red),var(--red-d));border-color:transparent;color:#fff;
 box-shadow:0 4px 16px rgba(255,59,78,.3)}
.pillbtn.solid:hover{filter:brightness(1.08)}
.lbl{display:inline}
.drop{position:absolute;top:100%;margin-top:8px;inset-inline-start:0;width:230px;background:var(--card);
 border:1px solid var(--line);border-radius:14px;box-shadow:0 20px 50px -20px #000;padding:7px;z-index:70;
 opacity:0;visibility:hidden;transform:translateY(-6px);transition:.16s}
.drop.on{opacity:1;visibility:visible;transform:none}
.drop button{display:flex;align-items:center;gap:11px;width:100%;padding:9px 10px;border-radius:10px;text-align:right;transition:.15s}
.drop button:hover{background:rgba(255,255,255,.06)}
.drop .ib{width:34px;height:34px;border-radius:9px;display:grid;place-items:center;flex:none;font-size:16px;color:#fff}
.drop p{margin:0;font-size:12.5px;font-weight:700}
.drop small{color:var(--ink3);font-size:10.5px}

/* ===== LAYOUT ===== */
.page{position:relative;z-index:1;max-width:1120px;margin:0 auto;padding:104px 16px 0;text-align:center}
.rv{opacity:0;transform:translateY(22px);transition:opacity .6s,transform .6s}
.rv.in{opacity:1;transform:none}

/* ===== HERO ===== */
.stage{position:relative;display:flex;align-items:center;justify-content:center;height:270px}
.fr1{position:absolute;width:214px;height:174px;border-radius:2rem;border:2px dashed rgba(255,59,78,.22)}
.fr2{position:absolute;width:250px;height:206px;border-radius:2.4rem;border:1px solid rgba(255,210,74,.13)}
.glow{position:absolute;width:250px;height:170px;border-radius:50%;filter:blur(70px);opacity:.75;
 background:radial-gradient(circle,rgba(255,59,78,.32) 0%,rgba(255,210,74,.10) 55%,transparent 75%)}
#logo{position:relative;z-index:2;width:196px;height:auto;cursor:pointer;filter:drop-shadow(0 8px 24px rgba(255,59,78,.35))}
.px{transform-box:fill-box;transform-origin:center;animation:fly .95s cubic-bezier(.16,1,.3,1) both}
@keyframes fly{0%{transform:translate(var(--dx),var(--dy)) scale(.2) rotate(-25deg);opacity:0}100%{transform:none;opacity:1}}
h1{font-family:var(--disp);font-weight:800;font-size:clamp(40px,8vw,72px);margin:6px 0 0;letter-spacing:-.02em;
 background:linear-gradient(90deg,#fff 15%,var(--red) 50%,var(--gold) 85%);background-size:250% auto;
 -webkit-background-clip:text;background-clip:text;color:transparent;animation:shine 6s linear infinite}
@keyframes shine{to{background-position:250% center}}
.lead{color:var(--ink2);font-size:clamp(14px,2.4vw,18px);margin:12px auto 0;max-width:44ch}
.badges{display:flex;gap:9px;justify-content:center;flex-wrap:wrap;margin-top:22px}
.bd{display:inline-flex;align-items:center;gap:6px;padding:6px 13px;border-radius:99px;font-size:12.5px;font-weight:500;
 background:rgba(255,59,78,.10);border:1px solid rgba(255,59,78,.25);color:var(--red-l);transition:.18s}
.bd:hover{transform:translateY(-2px);background:rgba(255,59,78,.16)}

/* ===== PLAY ===== */
.playzone{padding:76px 0 84px;display:flex;justify-content:center;position:relative;min-height:300px}
.playwrap{position:relative;transition:.3s}
.playwrap .ring1,.playwrap .ring2{position:absolute;border-radius:50%;pointer-events:none}
.ring1{inset:-30px;border:2px dashed rgba(255,59,78,.3);animation:spin 9s linear infinite}
.ring2{inset:-48px;border:1px solid rgba(255,210,74,.14);animation:spin 14s linear infinite reverse}
@keyframes spin{to{transform:rotate(360deg)}}
.playwrap .blur{position:absolute;inset:-18px;border-radius:50%;filter:blur(34px);opacity:.5;transition:.25s;
 background:linear-gradient(90deg,var(--red),var(--red-d) 50%,var(--gold))}
.playwrap:hover .blur{opacity:.85}
.playbtn{position:relative;width:212px;height:212px;border-radius:50%;border:8px solid var(--bg);overflow:hidden;
 background:linear-gradient(140deg,#FF4D5F,#D3172B 52%,#8E0A18);color:#fff;
 display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;
 font-family:var(--disp);font-weight:800;font-size:21px;letter-spacing:.06em;box-shadow:0 24px 60px -20px rgba(255,59,78,.6);transition:.2s}
.playbtn:hover{transform:scale(1.04)}
.playbtn svg{width:56px;height:56px}
.playbtn::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.14),transparent);
 transform:translateX(-120%) skewX(-12deg);animation:sweep 3.6s ease-in-out infinite}
@keyframes sweep{0%,55%{transform:translateX(-120%) skewX(-12deg)}100%{transform:translateX(120%) skewX(-12deg)}}
.opts{display:none;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px;width:100%;max-width:720px}
.opts.on{display:grid;animation:pop .3s cubic-bezier(.2,1.3,.4,1)}
.playwrap.off{display:none}
@keyframes pop{from{opacity:0;transform:scale(.94) translateY(10px)}}
.opt{padding:26px 20px;border-radius:26px;border:1px solid var(--line);background:var(--card);transition:.22s;cursor:pointer}
.opt:hover{transform:translateY(-6px)}
.opt .ib{width:62px;height:62px;border-radius:18px;display:grid;place-items:center;margin:0 auto 14px;font-size:28px;transition:.22s}
.opt:hover .ib{transform:scale(1.1)}
.opt h3{font-family:var(--disp);font-weight:800;font-size:19px;margin:0 0 5px}
.opt p{margin:0;font-size:12.5px;color:var(--ink3)}
.opt.chat{background:linear-gradient(180deg,rgba(255,59,78,.1),var(--card));border-color:rgba(255,59,78,.25)}
.opt.chat:hover{border-color:rgba(255,59,78,.55)}
.opt.chat .ib{background:rgba(255,59,78,.18);color:var(--red)}
.opt.grp{background:linear-gradient(180deg,rgba(255,210,74,.1),var(--card));border-color:rgba(255,210,74,.25)}
.opt.grp:hover{border-color:rgba(255,210,74,.55)}
.opt.grp .ib{background:rgba(255,210,74,.16);color:var(--gold)}
.back{grid-column:1/-1;padding:14px;border-radius:99px;color:var(--ink3);font-size:13px;transition:.18s;
 display:inline-flex;align-items:center;justify-content:center;gap:8px}
.back:hover{color:#fff;background:rgba(255,255,255,.05)}

/* ===== DIVIDER ===== */
.div{display:flex;align-items:center;gap:12px;margin:0 0 22px}
.div i{flex:1;height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,.12),transparent)}
.div span{font-size:10.5px;font-weight:700;letter-spacing:.25em;color:rgba(255,255,255,.3);white-space:nowrap;
 display:inline-flex;align-items:center;gap:7px}
.div span svg{color:var(--gold)}

/* ===== QUICK LINKS ===== */
.quick{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px;margin-bottom:56px}
.q{position:relative;overflow:hidden;border-radius:20px;border:1px solid var(--line);background:rgba(13,13,19,.8);
 padding:15px 12px;transition:.25s;min-height:96px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:7px}
.q:hover{transform:translateY(-4px)}
.q .bgw{position:absolute;inset:0;opacity:.3;transition:.25s}
.q:hover .bgw{opacity:.55}
.q .ib{position:relative;z-index:2;width:34px;height:34px;border-radius:11px;display:grid;place-items:center;
 background:rgba(255,255,255,.06);border:1px solid var(--line);font-size:17px;transition:.25s}
.q:hover .ib{transform:scale(1.12)}
.q b{position:relative;z-index:2;font-family:var(--disp);font-weight:700;font-size:13px}
.q small{position:relative;z-index:2;color:rgba(255,255,255,.32);font-size:9.5px;line-height:1.35;max-width:150px}
.q:hover small{color:rgba(255,255,255,.6)}

/* ===== CARDS ===== */
.stack{display:flex;flex-direction:column;gap:16px;margin-bottom:56px}
.cardbox{border-radius:26px;border:1px solid var(--line);background:var(--card);overflow:hidden;text-align:right;transition:.25s}
.cardbox:hover{border-color:var(--line2)}
.pad{padding:18px}
.row{display:flex;align-items:center;gap:15px;flex-wrap:wrap}
.row .sp{flex:1}
.ava{width:60px;height:60px;border-radius:50%;flex:none;position:relative;display:grid;place-items:center;
 background:var(--card2);border:1px solid var(--line)}
.ava::before{content:"";position:absolute;inset:-3px;border-radius:50%;filter:blur(9px);opacity:.5;z-index:-1;
 background:linear-gradient(90deg,var(--red),var(--gold),var(--red))}
.ava svg{width:34px;height:auto}
.tt{font-family:var(--disp);font-weight:800;font-size:17px;margin:0;line-height:1.3}
.st{color:rgba(255,255,255,.35);font-size:11.5px;margin:2px 0 0}
.btn{display:inline-flex;align-items:center;gap:7px;height:40px;padding:0 18px;border-radius:12px;
 font-family:var(--disp);font-weight:700;font-size:13.5px;transition:.18s}
.btn:hover{transform:translateY(-2px)}
.btn.yt{background:#DC2626;color:#fff;box-shadow:0 6px 18px rgba(220,38,38,.3)}
.btn.dc{background:#5865F2;color:#fff;box-shadow:0 6px 18px rgba(88,101,242,.3)}
.btn.sq{width:40px;padding:0;justify-content:center;background:rgba(255,255,255,.05);border:1px solid var(--line);color:rgba(255,255,255,.6)}
.stat{background:rgba(255,255,255,.04);border:1px solid var(--line);border-radius:14px;padding:9px 18px;text-align:center;min-width:92px}
.stat b{display:block;font-family:var(--mono);font-size:20px;font-weight:700;line-height:1.2}
.stat small{font-size:9.5px;color:var(--ink3)}
.stat.on b{color:#4ADE80}

/* بث مباشر */
.live{position:relative;border-radius:26px;overflow:hidden;border:1px solid rgba(255,59,78,.28);background:var(--card)}
.thumb{position:relative;aspect-ratio:16/7;overflow:hidden;background:linear-gradient(160deg,#2A0A12,#08080D)}
.thumb .sun{position:absolute;width:150px;height:150px;border-radius:50%;top:-40px;inset-inline-start:12%;
 background:radial-gradient(circle,rgba(255,210,74,.55),transparent 70%);filter:blur(14px)}
.thumb .hill{position:absolute;inset-inline:-20%;bottom:-30%;height:75%;border-radius:46% 46% 0 0;background:#4A0C18}
.thumb .hill.two{bottom:-42%;background:#7A1122;opacity:.8;animation:drift 12s ease-in-out infinite alternate}
.thumb::after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,rgba(8,8,13,.9),transparent 60%)}
.livetag{position:absolute;top:12px;inset-inline-start:12px;z-index:3;display:inline-flex;align-items:center;gap:6px;
 background:var(--red);color:#fff;font-family:var(--mono);font-size:11px;font-weight:700;padding:3px 10px;border-radius:8px}
.livetag i{width:6px;height:6px;border-radius:50%;background:#fff;animation:blink 1.3s steps(1,end) infinite}
@keyframes blink{0%,50%{opacity:1}51%,100%{opacity:.25}}
.viewers{position:absolute;top:12px;inset-inline-end:12px;z-index:3;font-family:var(--mono);font-size:11px;
 background:rgba(8,8,13,.75);border:1px solid var(--line);padding:3px 10px;border-radius:8px}
.playmini{position:absolute;inset:0;z-index:3;display:grid;place-items:center}
.playmini span{width:62px;height:62px;border-radius:50%;background:rgba(255,59,78,.92);display:grid;place-items:center;
 box-shadow:0 0 0 0 rgba(255,59,78,.5);animation:ripple 2.4s ease-out infinite}
.playmini svg{width:26px;height:26px;margin-inline-start:4px;fill:#fff;stroke:none}
@keyframes ripple{to{box-shadow:0 0 0 26px rgba(255,59,78,0)}}

/* توب النجوم */
.brow{display:grid;grid-template-columns:40px 42px 1fr auto;align-items:center;gap:13px;padding:11px 16px;border-top:1px solid var(--line)}
.brow .rk{font-family:var(--mono);font-weight:700;font-size:15px;color:var(--ink3);text-align:center;border-radius:8px;padding:3px 0}
.brow.p1 .rk{background:var(--gold);color:#2A1B00}
.brow.p2 .rk{background:#CBD3E2;color:#171B26}
.brow.p3 .rk{background:#E08A4E;color:#241100}
.brow .av{width:38px;height:38px;border-radius:11px;display:grid;place-items:center;font-family:var(--disp);font-weight:800;color:#100c18}
.brow .nm{font-weight:700;font-size:14px}
.pbar{height:5px;background:rgba(255,255,255,.08);border-radius:9px;margin-top:5px;overflow:hidden;max-width:320px}
.pbar i{display:block;height:100%;width:0;border-radius:9px;background:linear-gradient(90deg,var(--red),var(--gold));transition:width 1.1s cubic-bezier(.2,.8,.3,1)}
.brow .sc{font-family:var(--mono);font-size:14px;color:var(--gold)}

/* ابداع المتابعين */
.fan{display:flex;flex-direction:column;gap:10px;max-width:760px;margin:0 auto 40px}
.fanlink{display:flex;align-items:center;gap:14px;padding:12px 15px;border-radius:18px;text-align:right;transition:.22s;
 background:linear-gradient(135deg,rgba(255,210,74,.1),rgba(255,59,78,.04));border:1px solid rgba(255,210,74,.2)}
.fanlink:hover{border-color:rgba(255,210,74,.5);transform:translateX(-4px)}
.fanlink .ib{width:38px;height:38px;border-radius:12px;background:rgba(255,210,74,.12);color:var(--gold);
 display:grid;place-items:center;flex:none;font-size:17px;transition:.22s}
.fanlink:hover .ib{transform:scale(1.12)}
.fanlink b{display:block;font-size:13.5px}
.fanlink small{color:rgba(255,255,255,.3);font-size:10.5px}
.fanlink .arw{color:var(--gold);opacity:.4;transition:.22s;font-size:17px}
.fanlink:hover .arw{opacity:1;transform:translateX(-4px)}
.soon{display:flex;align-items:center;justify-content:center;gap:8px;padding:13px;border-radius:18px;
 border:1px dashed rgba(255,255,255,.1);color:rgba(255,255,255,.22);font-size:12px;font-weight:700}

/* ===== MODAL ===== */
.mask{position:fixed;inset:0;z-index:200;background:rgba(0,0,0,.75);backdrop-filter:blur(8px);
 display:none;align-items:center;justify-content:center;padding:16px}
.mask.on{display:flex}
.modal{width:100%;max-width:520px;max-height:86vh;background:var(--card);border:1px solid rgba(255,210,74,.3);
 border-radius:24px;overflow:hidden;display:flex;flex-direction:column;text-align:right;animation:pop .25s cubic-bezier(.2,1.3,.4,1)}
.mhead{display:flex;align-items:center;gap:11px;padding:15px 18px;border-bottom:1px solid var(--line);background:var(--card2)}
.mhead h3{margin:0;font-family:var(--disp);font-weight:800;font-size:16px}
.mhead .x{margin-inline-start:auto;width:32px;height:32px;border-radius:9px;display:grid;place-items:center;color:var(--ink2)}
.mhead .x:hover{background:rgba(255,255,255,.07);color:#fff}
.tabs{display:flex;gap:6px;padding:10px 12px;border-bottom:1px solid var(--line)}
.tab{flex:1;padding:9px;border-radius:11px;font-family:var(--disp);font-weight:700;font-size:12.5px;color:var(--ink3);transition:.16s}
.tab.on{background:rgba(255,210,74,.14);color:var(--gold);box-shadow:inset 0 0 0 1px rgba(255,210,74,.35)}
.mbody{padding:12px;overflow:auto;display:grid;gap:8px}
.mbody.snd{grid-template-columns:repeat(auto-fill,minmax(108px,1fr))}
.cmd{display:flex;align-items:center;gap:11px;padding:10px 12px;border-radius:13px;background:rgba(255,255,255,.03);
 border:1px solid var(--line);transition:.16s;width:100%;text-align:right}
.cmd:hover{border-color:var(--line2);background:rgba(255,255,255,.06)}
.cmd .dot{width:34px;height:34px;border-radius:10px;flex:none}
.cmd b{font-family:var(--mono);font-size:13px;display:block}
.cmd small{color:var(--ink3);font-size:10.5px}
.cmd .cp{margin-inline-start:auto;color:var(--ink3);font-size:15px}
.sound{padding:11px 8px;border-radius:13px;font-family:var(--mono);font-size:12px;font-weight:600;
 border:1px solid var(--line);transition:.16s;color:#fff}
.sound:hover{transform:translateY(-2px)}

/* ===== FOOTER ===== */
footer{border-top:1px solid var(--line);margin-top:40px;padding:34px 16px 46px;text-align:center;color:var(--ink3);font-size:13px}
.fico{display:flex;gap:11px;justify-content:center;margin-top:16px}
.fico span{width:36px;height:36px;border-radius:50%;display:grid;place-items:center;font-size:16px;
 background:rgba(255,255,255,.05);border:1px solid var(--line);transition:.2s;cursor:pointer}
.fico span:hover{transform:translateY(-3px) scale(1.08)}

@media(max-width:640px){
  .lbl{display:none}
  .pillbtn{padding:0 12px}
  .stage{height:220px}#logo{width:158px}
  .playbtn{width:180px;height:180px;font-size:18px}
  .brow{grid-template-columns:32px 36px 1fr auto;gap:9px;padding:10px 12px}
}
@media(prefers-reduced-motion:reduce){
  *{animation-duration:.001s!important;animation-iteration-count:1!important;transition-duration:.001s!important}
  .rv{opacity:1;transform:none}
}
</style>
</head>
<body>

<svg style="display:none" aria-hidden="true">
<symbol id="i-film" viewBox="0 0 24 24"><rect x="2.5" y="3.5" width="19" height="17" rx="2.5"/><path d="M7.5 3.5v17M16.5 3.5v17M2.5 9h5M2.5 15h5M16.5 9h5M16.5 15h5"/></symbol>
<symbol id="i-palette" viewBox="0 0 24 24"><path d="M12 21a9 9 0 1 1 9-9c0 2-1.6 3-3.3 3H16a2 2 0 0 0-1.4 3.4A1.9 1.9 0 0 1 12 21z"/><circle cx="8" cy="9.5" r="1"/><circle cx="12" cy="7.5" r="1"/><circle cx="16" cy="9.5" r="1"/></symbol>
<symbol id="i-gift" viewBox="0 0 24 24"><rect x="3" y="8.5" width="18" height="12.5" rx="2"/><path d="M12 8.5V21M3 13h18M12 8.5S11 3.5 8 3.5s-1.6 5 4 5zM12 8.5s1-5 4-5 1.6 5-4 5z"/></symbol>
<symbol id="i-login" viewBox="0 0 24 24"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3"/></symbol>
<symbol id="i-pad" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="11" rx="5.5"/><path d="M7 10.5v4M5 12.5h4M16 11.5h.01M18.4 14h.01"/></symbol>
<symbol id="i-star" viewBox="0 0 24 24"><path d="M12 3.2l2.6 5.5 6 .8-4.4 4.2 1.1 6-5.3-3-5.3 3 1.1-6L3.4 9.5l6-.8z"/></symbol>
<symbol id="i-zap" viewBox="0 0 24 24"><path d="M13 2.5L4.5 14H11l-1 7.5L19.5 10H13z"/></symbol>
<symbol id="i-users" viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.4"/><path d="M2.6 20a6.4 6.4 0 0 1 12.8 0M16.6 5.2a3.4 3.4 0 0 1 0 6.6M18 14.6a6.4 6.4 0 0 1 3.4 5.4"/></symbol>
<symbol id="i-spark" viewBox="0 0 24 24"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M18.5 16.5l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z"/></symbol>
<symbol id="i-heart" viewBox="0 0 24 24"><path d="M12 20.5s-8.2-5-8.2-10.4a4.6 4.6 0 0 1 8.2-2.8 4.6 4.6 0 0 1 8.2 2.8C20.2 15.5 12 20.5 12 20.5z"/></symbol>
<symbol id="i-crown" viewBox="0 0 24 24"><path d="M3 18.5h18M4 8l4.2 4L12 4.5 15.8 12 20 8l-2 8.5H6z"/></symbol>
<symbol id="i-book" viewBox="0 0 24 24"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v18H6.5A2.5 2.5 0 0 1 4 18.5z"/><path d="M8 3v18"/></symbol>
<symbol id="i-msg" viewBox="0 0 24 24"><path d="M21 11.6a8.4 8.4 0 0 1-12.2 7.5L3.5 20.5l1.4-5.2A8.4 8.4 0 1 1 21 11.6z"/></symbol>
<symbol id="i-msgsq" viewBox="0 0 24 24"><path d="M21 15.5a2 2 0 0 1-2 2H8l-4 3.5V5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2z"/></symbol>
<symbol id="i-ig" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5.2"/><circle cx="12" cy="12" r="4"/><circle cx="17.4" cy="6.6" r=".9" fill="currentColor"/></symbol>
<symbol id="i-yt" viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="4.4"/><path d="M10.2 8.8l6 3.2-6 3.2z"/></symbol>
<symbol id="i-share" viewBox="0 0 24 24"><circle cx="18" cy="5.5" r="2.6"/><circle cx="6" cy="12" r="2.6"/><circle cx="18" cy="18.5" r="2.6"/><path d="M8.3 10.7l7.4-3.9M8.3 13.3l7.4 3.9"/></symbol>
<symbol id="i-ext" viewBox="0 0 24 24"><path d="M14 4h6v6M20 4l-8.5 8.5M18 14.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4.5"/></symbol>
<symbol id="i-globe" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.6 2.8 2.6 15.2 0 18M12 3c-2.6 2.8-2.6 15.2 0 18"/></symbol>
<symbol id="i-lock" viewBox="0 0 24 24"><rect x="4.5" y="10" width="15" height="10.5" rx="2.2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></symbol>
<symbol id="i-grid" viewBox="0 0 24 24"><rect x="3" y="3" width="7.5" height="7.5" rx="1.6"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="1.6"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="1.6"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.6"/></symbol>
<symbol id="i-radio" viewBox="0 0 24 24"><circle cx="12" cy="12" r="2.4"/><path d="M7.9 7.9a5.8 5.8 0 0 0 0 8.2M16.1 7.9a5.8 5.8 0 0 1 0 8.2M5 5a9.9 9.9 0 0 0 0 14M19 5a9.9 9.9 0 0 1 0 14"/></symbol>
<symbol id="i-back" viewBox="0 0 24 24"><path d="M3.5 12a8.5 8.5 0 1 0 2.9-6.4L3.5 8"/><path d="M3.5 3.5v5h5"/></symbol>
<symbol id="i-refresh" viewBox="0 0 24 24"><path d="M20.5 12a8.5 8.5 0 1 1-2.9-6.4L20.5 8"/><path d="M20.5 3.5v5h-5"/></symbol>
<symbol id="i-copy" viewBox="0 0 24 24"><rect x="9" y="9" width="12" height="12" rx="2.2"/><path d="M5.5 15H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v.5"/></symbol>
<symbol id="i-check" viewBox="0 0 24 24"><path d="M4.5 12.5l5 5L20 6.5"/></symbol>
<symbol id="i-x" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></symbol>
<symbol id="i-play" viewBox="0 0 24 24"><path d="M7 4.5l13 7.5-13 7.5z"/></symbol>
</svg>

<div class="bgfx"><div class="grid"></div><div class="orb a"></div><div class="orb b"></div><div class="orb c"></div></div>

<!-- ================= HEADER ================= -->
<header>
 <div class="hdr">
  <div class="hgrp">
   <button class="pillbtn green"><svg class="ic"><use href="#i-film"/></svg><span class="lbl">جرين سكرين</span></button>
   <button class="pillbtn gold"><svg class="ic"><use href="#i-palette"/></svg><span class="lbl">توب الرسمات</span></button>
  </div>
  <div class="hgrp" style="position:relative">
   <div style="position:relative">
    <button class="pillbtn" id="giftBtn"><svg class="ic"><use href="#i-gift"/></svg><span class="lbl">السحوبات</span></button>
    <div class="drop" id="giftDrop">
     <button><span class="ib" style="background:#5865F2"><svg class="ic"><use href="#i-msg"/></svg></span>
      <span><p>سحب ديسكورد</p><small>سحب عشوائي من الروم</small></span></button>
     <button><span class="ib" style="background:linear-gradient(140deg,#FF3B4E,#C11326)"><svg class="ic"><use href="#i-yt"/></svg></span>
      <span><p>سحب يوتيوب</p><small>إنشاء غرفة سحب جديدة</small></span></button>
    </div>
   </div>
   <button class="pillbtn solid"><svg class="ic"><use href="#i-login"/></svg>تسجيل الدخول</button>
  </div>
 </div>
</header>

<div class="page">

 <!-- ================= HERO ================= -->
 <div class="stage">
  <div class="fr1"></div><div class="fr2"></div><div class="glow"></div>
  <svg id="logo" viewBox="0 0 300 240" role="img" aria-label="qb — اكس دريم">
   <g fill="#FFFFFF">
    <rect class="px" style="--dx:-90px;--dy:-70px;animation-delay:.12s"  x="30"  y="40"  width="100" height="20" rx="2"/>
    <rect class="px" style="--dx:-110px;--dy:30px;animation-delay:.175s" x="30"  y="40"  width="20"  height="100" rx="2"/>
    <rect class="px" style="--dx:60px;--dy:-90px;animation-delay:.23s"   x="110" y="40"  width="20"  height="160" rx="2"/>
    <rect class="px" style="--dx:-70px;--dy:80px;animation-delay:.285s"  x="30"  y="120" width="100" height="20" rx="2"/>
   </g>
   <g fill="#FF3B4E">
    <rect class="px" style="--dx:40px;--dy:-100px;animation-delay:.34s"  x="150" y="20"  width="20"  height="180" rx="2"/>
    <rect class="px" style="--dx:110px;--dy:-20px;animation-delay:.395s" x="170" y="100" width="100" height="20" rx="2"/>
    <rect class="px" style="--dx:120px;--dy:60px;animation-delay:.45s"   x="250" y="100" width="20"  height="100" rx="2"/>
    <rect class="px" style="--dx:20px;--dy:110px;animation-delay:.505s"  x="150" y="180" width="120" height="20" rx="2"/>
   </g>
   <g fill="#FFD24A">
    <rect class="px" style="--dx:-40px;--dy:-90px;animation-delay:.56s"  x="54"  y="10"  width="18" height="18" rx="2"/>
    <rect class="px" style="--dx:30px;--dy:-95px;animation-delay:.615s"  x="86"  y="10"  width="18" height="18" rx="2"/>
    <rect class="px" style="--dx:0px;--dy:100px;animation-delay:.67s"    x="200" y="212" width="18" height="18" rx="2"/>
   </g>
  </svg>
 </div>

 <h1>اكس دريم</h1>
 <p class="lead">منصة الألعاب التفاعلية الأولى للستريمرز والمبدعين العرب</p>
 <div class="badges">
  <span class="bd"><svg class="ic"><use href="#i-pad"/></svg>100+ لعبة</span>
  <span class="bd"><svg class="ic"><use href="#i-star"/></svg>تجربة فريدة</span>
  <span class="bd"><svg class="ic"><use href="#i-zap"/></svg>تفاعل مباشر</span>
  <span class="bd"><svg class="ic"><use href="#i-users"/></svg>العاب جماعية</span>
  <span class="bd"><svg class="ic"><use href="#i-spark"/></svg>قابل للاقتراحات</span>
  <span class="bd"><svg class="ic"><use href="#i-heart"/></svg>عربي بالكامل</span>
 </div>

 <!-- ================= PLAY ================= -->
 <div class="playzone">
  <div class="playwrap" id="playWrap">
   <div class="ring1"></div><div class="ring2"></div><div class="blur"></div>
   <button class="playbtn" id="playBtn"><svg class="ic"><use href="#i-pad"/></svg>ابدأ اللعب</button>
  </div>
  <div class="opts" id="opts">
   <div class="opt chat"><div class="ib"><svg class="ic"><use href="#i-radio"/></svg></div>
    <h3>العاب الشات</h3><p>تفاعل مع شات البث الخاص بك</p></div>
   <div class="opt grp"><div class="ib"><svg class="ic"><use href="#i-users"/></svg></div>
    <h3>العاب جماعية</h3><p>العب مع الاصدقاء او بجلسات العائلة</p></div>
   <button class="back" id="backBtn"><svg class="ic"><use href="#i-back"/></svg>العودة للخلف</button>
  </div>
 </div>

 <!-- ================= QUICK LINKS ================= -->
 <div class="rv">
  <div class="div"><i></i><span><svg class="ic"><use href="#i-zap"/></svg>روابط سريعة</span><i></i></div>
  <div class="quick">
   <button class="q" style="border-color:rgba(255,210,74,.22)">
    <div class="bgw" style="background:linear-gradient(160deg,rgba(255,210,74,.14),transparent 60%)"></div>
    <span class="ib" style="color:var(--gold)"><svg class="ic"><use href="#i-crown"/></svg></span>
    <b style="color:var(--gold)">الانتساب</b><small>مميزات خاصة للاعضاء</small></button>
   <button class="q" id="cmdBtn" style="border-color:rgba(255,210,74,.45)">
    <div class="bgw" style="background:linear-gradient(160deg,rgba(255,210,74,.24),transparent 60%)"></div>
    <span class="ib" style="color:var(--gold)"><svg class="ic"><use href="#i-book"/></svg></span>
    <b style="color:var(--gold)">الأوامر</b><small>كل أوامر بثوث دريم في مكان واحد</small></button>
   <button class="q" style="border-color:rgba(255,59,78,.22)">
    <div class="bgw" style="background:linear-gradient(160deg,rgba(255,59,78,.15),transparent 60%)"></div>
    <span class="ib" style="color:var(--red)"><svg class="ic"><use href="#i-heart"/></svg></span>
    <b style="color:var(--red-l)">التبرعات</b><small>ساهم في بناء القناة</small></button>
   <button class="q" style="border-color:rgba(34,197,94,.22)">
    <div class="bgw" style="background:linear-gradient(160deg,rgba(34,197,94,.13),transparent 60%)"></div>
    <span class="ib" style="color:#4ADE80"><svg class="ic"><use href="#i-msg"/></svg></span>
    <b style="color:#4ADE80">مجتمع الواتساب</b><small>جميع قروبات الواتساب</small></button>
   <button class="q" style="border-color:rgba(16,185,129,.22)">
    <div class="bgw" style="background:linear-gradient(160deg,rgba(16,185,129,.13),transparent 60%)"></div>
    <span class="ib" style="color:#34D399"><svg class="ic"><use href="#i-msgsq"/></svg></span>
    <b style="color:#34D399">قناة الواتساب</b><small>جميع الاخبار تنزل هنا</small></button>
   <button class="q" style="border-color:rgba(217,70,239,.22)">
    <div class="bgw" style="background:linear-gradient(160deg,rgba(217,70,239,.13),transparent 60%)"></div>
    <span class="ib" style="color:#E879F9"><svg class="ic"><use href="#i-ig"/></svg></span>
    <b style="color:#E879F9">الانستقرام</b><small>عشوائيات على سواليف حياكم</small></button>
  </div>
 </div>

 <!-- ================= CARDS ================= -->
 <div class="stack">

  <!-- آخر بث -->
  <div class="live rv">
   <div class="thumb">
    <div class="sun"></div><div class="hill two"></div><div class="hill"></div>
    <span class="livetag"><i></i> بث مباشر</span>
    <span class="viewers">1,245 مشاهد</span>
    <div class="playmini"><span><svg class="ic"><use href="#i-play"/></svg></span></div>
   </div>
   <div class="pad row">
    <div style="flex:1;min-width:200px">
     <p class="tt">ليلة الألعاب — سحب على 5 جوائز</p>
     <p class="st">بدأ قبل 45 دقيقة · ماينكرافت والعاب الشات</p>
    </div>
    <button class="btn yt"><svg class="ic"><use href="#i-yt"/></svg>شاهد الآن</button>
   </div>
  </div>

  <!-- قناة يوتيوب -->
  <div class="cardbox rv"><div class="pad row">
   <div class="ava"><svg viewBox="0 0 300 240" aria-hidden="true">
     <g fill="#fff"><rect x="30" y="40" width="100" height="20" rx="2"/><rect x="30" y="40" width="20" height="100" rx="2"/>
      <rect x="110" y="40" width="20" height="160" rx="2"/><rect x="30" y="120" width="100" height="20" rx="2"/></g>
     <g fill="#FF3B4E"><rect x="150" y="20" width="20" height="180" rx="2"/><rect x="170" y="100" width="100" height="20" rx="2"/>
      <rect x="250" y="100" width="20" height="100" rx="2"/><rect x="150" y="180" width="120" height="20" rx="2"/></g>
     <g fill="#FFD24A"><rect x="54" y="10" width="18" height="18" rx="2"/><rect x="86" y="10" width="18" height="18" rx="2"/><rect x="200" y="212" width="18" height="18" rx="2"/></g>
   </svg></div>
   <div style="flex:1;min-width:150px"><p class="tt">XDreemB52</p><p class="st">@XDreemB52 · يوتيوب</p></div>
   <button class="btn yt"><svg class="ic"><use href="#i-yt"/></svg>اشترك</button>
   <button class="btn sq"><svg class="ic"><use href="#i-share"/></svg></button>
  </div></div>

  <!-- ديسكورد -->
  <div class="cardbox rv" style="border-color:rgba(88,101,242,.3);background:linear-gradient(90deg,rgba(88,101,242,.12),var(--card) 55%)">
   <div class="pad row">
    <div style="flex:1;min-width:160px">
     <p class="tt">XDreemB52</p><p class="st">سيرفر الديسكورد الرسمي</p>
    </div>
    <button class="btn sq"><svg class="ic"><use href="#i-refresh"/></svg></button>
    <div class="stat"><b data-cnt="48250">0</b><small>عضو</small></div>
    <div class="stat on"><b data-cnt="3140">0</b><small>متصل</small></div>
    <button class="btn dc"><svg class="ic"><use href="#i-ext"/></svg>انضم للسيرفر</button>
   </div>
  </div>

  <!-- توب النجوم -->
  <div class="cardbox rv" id="board">
   <div class="pad row" style="padding-bottom:12px">
    <span class="ib" style="width:38px;height:38px;border-radius:12px;display:grid;place-items:center;background:rgba(255,210,74,.14);color:var(--gold);font-size:18px"><svg class="ic"><use href="#i-star"/></svg></span>
    <div style="flex:1"><p class="tt">توب النجوم</p><p class="st">أعلى المتفاعلين في بثوث دريم هذا الأسبوع</p></div>
    <span class="st" style="font-family:var(--mono)">يتحدّث كل 5 دقائق</span>
   </div>
   <div id="rows"></div>
  </div>
 </div>

 <!-- ================= FAN ================= -->
 <div class="rv">
  <div class="div"><i></i><span><svg class="ic"><use href="#i-spark"/></svg>ابداع المتابعين</span><i></i></div>
  <div class="fan" id="fan"></div>
 </div>

</div>

<footer>
 <div style="display:flex;align-items:center;justify-content:center;gap:9px">
  <svg class="ic" style="font-size:17px"><use href="#i-grid"/></svg>
  <span>جميع الحقوق محفوظة الى اكس دريم &amp; وايت سكل &amp; شاورما قيمر</span>
 </div>
 <div class="fico">
  <span style="color:var(--red)"><svg class="ic"><use href="#i-heart"/></svg></span>
  <span style="color:var(--gold)"><svg class="ic"><use href="#i-star"/></svg></span>
  <span style="color:#fff"><svg class="ic"><use href="#i-spark"/></svg></span>
 </div>
</footer>

<!-- ================= MODAL ================= -->
<div class="mask" id="mask">
 <div class="modal">
  <div class="mhead">
   <span style="color:var(--gold);font-size:19px"><svg class="ic"><use href="#i-book"/></svg></span>
   <h3>أوامر بثوث دريم</h3>
   <button class="x" id="closeM"><svg class="ic"><use href="#i-x"/></svg></button>
  </div>
  <div class="tabs">
   <button class="tab on" data-t="g">الأوامر العامة</button>
   <button class="tab" data-t="s">أصوات الميم</button>
  </div>
  <div class="mbody" id="paneG"></div>
  <div class="mbody snd" id="paneS" style="display:none"></div>
 </div>
</div>

<script>
/* ===== logo replay ===== */
const logo=document.getElementById('logo');
const replay=()=>logo.querySelectorAll('.px').forEach(r=>{r.style.animation='none';r.offsetWidth;r.style.animation=''});
logo.onmouseenter=replay;logo.onclick=replay;

/* ===== giveaway dropdown ===== */
const gd=document.getElementById('giftDrop');
document.getElementById('giftBtn').onclick=e=>{e.stopPropagation();gd.classList.toggle('on')};
document.addEventListener('click',()=>gd.classList.remove('on'));

/* ===== play button ===== */
const pw=document.getElementById('playWrap'),op=document.getElementById('opts');
document.getElementById('playBtn').onclick=()=>{pw.classList.add('off');op.classList.add('on')};
document.getElementById('backBtn').onclick=()=>{op.classList.remove('on');pw.classList.remove('off')};

/* ===== reveal ===== */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.rv').forEach(el=>io.observe(el));

/* ===== counters ===== */
document.querySelectorAll('[data-cnt]').forEach(el=>{
 const to=+el.dataset.cnt;
 new IntersectionObserver((es,ob)=>es.forEach(e=>{if(!e.isIntersecting)return;ob.disconnect();
  let s=null;const step=t=>{if(!s)s=t;const p=Math.min((t-s)/1300,1);
   el.textContent=Math.round(to*(1-Math.pow(1-p,3))).toLocaleString('en');if(p<1)requestAnimationFrame(step)};
  requestAnimationFrame(step)}),{threshold:.4}).observe(el);
});

/* ===== top stars ===== */
const TOP=[["iK3MO",2140,"#FFD87A"],["NawaF",1980,"#FF8C99"],["AboFaisal",1640,"#FFC98A"],["Mohaammed",1410,"#8FD4FF"],["JustFahad",1180,"#7FE3C4"]];
document.getElementById('rows').innerHTML=TOP.map(([n,p,c],i)=>`
<div class="brow ${i<3?'p'+(i+1):''}">
 <div class="rk">${i+1}</div>
 <div class="av" style="background:linear-gradient(150deg,${c},${c}aa)">${n[0]}</div>
 <div><div class="nm">${n}</div><div class="pbar"><i data-w="${Math.round(p/2140*100)}"></i></div></div>
 <div class="sc">${p.toLocaleString('en')} ⭐</div></div>`).join('');
new IntersectionObserver((es,ob)=>es.forEach(e=>{if(!e.isIntersecting)return;ob.disconnect();
 document.querySelectorAll('.pbar i').forEach((b,i)=>setTimeout(()=>b.style.width=b.dataset.w+'%',i*110))}),{threshold:.3})
 .observe(document.getElementById('board'));

/* ===== fan links ===== */
const FAN=[["لقطات دريم","المصمم: هشام — تشاركون لقطات ابداعاتكم لدريم"],
["مانهوا دريم","المصمم: يامن — قصة مانهوا لدريم"],
["مسلسل دريم","المصمم: زاكينغ — انيميشن لدريم"],
["ليالي رمضان دريم","المصمم: ترددات — العاب شات البث لدريم"]];
document.getElementById('fan').innerHTML=FAN.map(([t,d])=>`
<a class="fanlink" href="#"><span class="ib"><svg class="ic"><use href="#i-globe"/></svg></span>
 <span style="flex:1"><b>${t}</b><small>${d}</small></span>
 <span class="arw"><svg class="ic"><use href="#i-ext"/></svg></span></a>`).join('')
 +`<div class="soon"><svg class="ic"><use href="#i-lock"/></svg>المزيد قريباً...</div>`;

/* ===== commands modal ===== */
const CMDS=[["!دخول","لو في لعبة بالموقع نستخدمه للدخول","#3B82F6,#06B6D4"],
["!نجومي","لعرض نجومك الخاصة بالبث","#FFD24A,#E3A80C"],
["!توب","يرسل رابط موقع توب النجوم بالشات","#FF3B4E,#C11326"],
["!لفل","يظهر اللفل الخاص بك","#22C55E,#10B981"],
["!روابط","يرسل روابط بشات البث","#FF6B8A,#E11D48"],
["!يقول","يخلي رسالتك بالشات تظهر كصوتية","#FB923C,#EA580C"]];
const SOUNDS=['!تيس','!هندي','!باب','!ياسين','!عبد','!جون!','!جونسينا','!جون','!واو','!omg','!ابروفدا','!بكاء','!حزين','!ضحك','!مكيف','!نو','!نوكيا','!يس'];
const SC=['#FF3B4E','#FB923C','#FFD24A','#22C55E','#06B6D4','#3B82F6','#8B5CF6','#EC4899','#F43F5E'];
document.getElementById('paneG').innerHTML=CMDS.map(([c,d,g])=>`
<button class="cmd" data-c="${c}"><span class="dot" style="background:linear-gradient(140deg,${g.split(',')[0]},${g.split(',')[1]})"></span>
 <span style="flex:1"><b>${c}</b><small>${d}</small></span><span class="cp"><svg class="ic"><use href="#i-copy"/></svg></span></button>`).join('');
document.getElementById('paneS').innerHTML=SOUNDS.map((s,i)=>{const c=SC[i%SC.length];
 return `<button class="sound" data-c="${s}" style="background:linear-gradient(140deg,${c}33,${c}11);border-color:${c}55">${s}</button>`}).join('');
document.addEventListener('click',e=>{
 const b=e.target.closest('[data-c]');if(!b)return;
 navigator.clipboard&&navigator.clipboard.writeText(b.dataset.c);
 const cp=b.querySelector('.cp');const old=b.style.borderColor;
 b.style.borderColor='#22C55E';if(cp)cp.innerHTML='<svg class="ic" style="color:#22C55E"><use href="#i-check"/></svg>';
 setTimeout(()=>{b.style.borderColor=old;if(cp)cp.innerHTML='<svg class="ic"><use href="#i-copy"/></svg>'},1500);
});
const mask=document.getElementById('mask');
document.getElementById('cmdBtn').onclick=()=>{mask.classList.add('on');document.body.style.overflow='hidden'};
const closeM=()=>{mask.classList.remove('on');document.body.style.overflow=''};
document.getElementById('closeM').onclick=closeM;
mask.onclick=e=>{if(e.target===mask)closeM()};
addEventListener('keydown',e=>{if(e.key==='Escape')closeM()});
document.querySelectorAll('.tab').forEach(t=>t.onclick=()=>{
 document.querySelectorAll('.tab').forEach(x=>x.classList.toggle('on',x===t));
 document.getElementById('paneG').style.display=t.dataset.t==='g'?'grid':'none';
 document.getElementById('paneS').style.display=t.dataset.t==='s'?'grid':'none';
});
</script>
</body>
</html>
