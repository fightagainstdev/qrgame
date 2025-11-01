const { PI, cos, sin, 
// abs,
round, 
// min,
// max,
tan, random, atan2, hypot, exp, sign, imul} = Math;
const TAU = PI * 2;
const min = (a, b) => (a < b ? a : b);
const max = (a, b) => (a > b ? a : b);
// export const round = (x: number): number => (x + 0.5) | 0;
const abs = (x) => (x > 0 ? x : -x);
// export const hypot = (x: number, y: number): number => (x * x + y * y) ** 0.5;
// export const sign = (x: number) => (x > 0 ? 1 : x < 0 ? -1 : 0);
// export const exp = (x: number): number => E ** x;

// ZzFXMicro - Zuper Zmall Zound Zynth - v1.3.1 by Frank Force ~ 1000 bytes
// audio context
let audioContext = new AudioContext();
let audioBus = audioContext.createGain();
const initZZFX = () => {
    audioBus.gain.value = 1 / 3;
    audioBus.connect(audioContext.destination);
};
const zzfx = (p = 1, k = 0.05, b = 220, e = 0, r = 0, t = 0.1, q = 0, D = 1, u = 0, y = 0, v = 0, z = 0, l = 0, E = 0, A = 0, F = 0, c = 0, w = 1, m = 0, B = 0, N = 0, R = 44100, zzfxV = 1 / 3) => {
    let G = (u *= (500 * TAU) / R / R), C = (b *= ((1 - k + 2 * k * random((k = []))) * TAU) / R), g = 0, H = 0, a = 0, n = 1, I = 0, J = 0, f = 0, h = N < 0 ? -1 : 1, x = (TAU * h * N * 2) / R, L = cos(x), Z = sin, K = Z(x) / 4, O = 1 + K, X = (-2 * L) / O, Y = (1 - K) / O, P = (1 + h * L) / 2 / O, Q = -(h + L) / O, S = P, T = 0, U = 0, V = 0, W = 0;
    e = R * e + 9;
    m *= R;
    r *= R;
    t *= R;
    c *= R;
    y *= (500 * TAU) / R ** 3;
    A *= TAU / R;
    v *= TAU / R;
    z *= R;
    l = (R * l) | 0;
    p *= zzfxV;
    for (h = (e + m + r + t + c) | 0; a < h; k[a++] = f * p)
        ++J % ((100 * F) | 0) ||
            ((f = q
                ? 1 < q
                    ? 2 < q
                        ? 3 < q
                            ? Z(g ** 3)
                            : max(min(tan(g), 1), -1)
                        : 1 - (((((2 * g) / TAU) % 2) + 2) % 2)
                    : 1 - 4 * abs(round(g / TAU) - g / TAU)
                : Z(g)),
                (f =
                    (l ? 1 - B + B * Z((TAU * a) / l) : 1) *
                        (f < 0 ? -1 : 1) *
                        abs(f) ** D *
                        (a < e
                            ? a / e
                            : a < e + m
                                ? 1 - ((a - e) / m) * (1 - w)
                                : a < e + m + r
                                    ? w
                                    : a < h - c
                                        ? ((h - a - c) / t) * w
                                        : 0)),
                (f = c
                    ? f / 2 +
                        (c > a ? 0 : ((a < h - c ? 1 : (h - a) / c) * k[(a - c) | 0]) / 2 / p)
                    : f),
                N
                    ? (f = W = S * T + Q * (T = U) + P * (U = f) - Y * V - X * (V = W))
                    : 0),
            (x = (b += u += y) * cos(A * H++)),
            (g += x + x * E * Z(a ** 5)),
            n && ++n > z && ((b += v), (C += v), (n = 0)),
            !l || ++I % l || ((b = C), (u = G), (n = n || 1));
    p = audioContext.createBuffer(1, h, R);
    p.getChannelData(0).set(k);
    b = audioContext.createBufferSource();
    b.buffer = p;
    b.connect(audioBus);
    return b;
};

const htmlBody = document.body;
const htmlCanvas = htmlBody.firstElementChild;
const ctx = htmlCanvas.getContext("2d", { alpha: false });
let pointerX = 0;
let pointerY = 0;
let pointerIsDown = 0;
let pointerDown = 0;
let pointerIsMouse = 0;
let time = 0;
let rawTime = 0;
let dt = 0;
let rawDeltaTime = 0;
let prevTime = 0;
const SIZE = 320;
let gameWidth = 0;
let gameHeight = 0;
let gameScale = 1;
let timeScale = 1;
let gameSleepTimer = 0;
let keyboardIsDown = {};
let keyboardDown = {};
let keyboardUp = {};
const setGameTimeScale = (pauseFactor) => (timeScale = pauseFactor);
const initSystem = (unlockAudio = () => audioContext.state[0] == "s" && audioContext.resume(), resize = (_, w = htmlBody.clientWidth, h = htmlBody.clientHeight, dpr = devicePixelRatio) => {
    htmlCanvas.style.width = w + "px";
    htmlCanvas.style.height = h + "px";
    htmlCanvas.width = w *= dpr;
    htmlCanvas.height = h *= dpr;
    gameScale = min(w, h) / SIZE;
    gameWidth = w / gameScale;
    gameHeight = h / gameScale;
}) => {
    ctx.imageSmoothingEnabled = false;
    //ctx.imageSmoothingQuality = "low";
    document.onkeydown = (e, k = e.code) => (keyboardDown[k] = keyboardIsDown[k] = 1);
    document.onkeyup = (e, k = e.code) => {
        unlockAudio();
        keyboardIsDown[k] = keyboardDown[k] = 0;
        keyboardUp[k] = 1;
    };
    htmlCanvas.onpointerdown = (p, scale = min(htmlBody.clientWidth, htmlBody.clientHeight) / SIZE) => {
        unlockAudio();
        if (p.isPrimary) {
            pointerX = p.x / scale;
            pointerY = p.y / scale;
            pointerIsDown = pointerDown = 1;
            pointerIsMouse = +(p.pointerType === "mouse");
        }
    };
    htmlCanvas.onpointermove = (p, scale = min(htmlBody.clientWidth, htmlBody.clientHeight) / SIZE) => {
        if (p.isPrimary) {
            pointerX = p.x / scale;
            pointerY = p.y / scale;
        }
    };
    htmlCanvas.onpointerup = (p) => {
        unlockAudio();
        if (p.isPrimary) {
            pointerIsDown = 0;
        }
    };
    onresize = resize;
    resize();
};
const isAnyKeyDown = () => pointerDown || Object.entries(keyboardDown).some(([, v]) => v);
const beginFrame = (_t) => {
    // if (_t - rawTime < 1 / 60) return 1;
    prevTime = rawTime;
    rawTime = _t;
    rawDeltaTime = min(1 / 30, rawTime - prevTime);
    dt = gameSleepTimer > 0 ? 0.0005 : rawDeltaTime * timeScale;
    time += dt;
    ctx.reset();
    ctx.scale(gameScale, gameScale);
    gameSleepTimer -= rawDeltaTime;
};
const sleepGame = (time) => (gameSleepTimer = time);
const endFrame = () => {
    pointerDown = 0;
    keyboardDown = {};
    keyboardUp = {};
};

let visibleX0 = 0;
let visibleY0 = 0;
let visibleX1 = 0;
let visibleY1 = 0;
let shakeTime = 0;
const beginCamera = (x, y, scale, hw = gameWidth / 2, hh = gameHeight / 2) => {
    visibleX0 = x - hw / scale;
    visibleX1 = x + hw / scale;
    visibleY0 = y - hh / scale;
    visibleY1 = y + hh / scale;
    shakeTime = max(0, shakeTime - dt * 8);
    ctx.save();
    ctx.translate(hw, hh);
    ctx.scale(scale, scale);
    ctx.translate(((4 * shakeTime * (random() - 0.5)) | 0) - x, ((4 * shakeTime * (random() - 0.5)) | 0) - y);
};
const shakeCamera = (value) => (shakeTime = value);
const testVisible = (x, y, padding) => x > visibleX0 - padding &&
    x < visibleX1 + padding &&
    y > visibleY0 - padding &&
    y < visibleY1 + padding;

const WORLD_SCALE_Y = 2 ** -0.5;

let groundParticles;
let overlayParticles;
let weatherParticles;
let textParticles;
let drops;
let enemies;
let projectiles;
let cat1;
let cat2;
const initEntityArrays = () => {
    groundParticles = [];
    overlayParticles = [];
    weatherParticles = [];
    textParticles = [];
    drops = [];
    enemies = [];
    projectiles = [];
    cat1 = {
        _internal_type: 0,
        _internal_hp: 100,
        _internal_hpMax: 100,
        _internal_x: -5,
        _internal_y: 0,
        _internal_x0: 0,
        _internal_y0: 0,
        _internal_x1: -10,
        _internal_y1: 0,
        _internal_x2: -10 - 10,
        _internal_y2: 0,
        _internal_x3: -10 - 10 - 20,
        _internal_y3: 0,
        _internal_hit: 0,
        _internal_shadowSize: 1.2,
        _internal_radius: 10,
        _internal_hitRadius: 10,
        _internal_wobble: 0,
        _internal_vx: 0,
        _internal_vy: 0,
        _internal_deadTime: 0,
        _internal_color: 0,
        _internal_moveSpeed: 0,
        _internal_moveDirection: 0,
        _internal_len: 0,
        _internal_deco: 0,
        _internal_collisionLayer: 0,
    };
    cat2 = { ...cat1, _internal_color: 0xffeeff, _internal_x: 20, _internal_y: 20, _internal_x1: 10 };
};
// temp arrays
let nearestEnemies;
let objectsToDraw;
const initTempArrays = () => {
    nearestEnemies = [];
    objectsToDraw = [cat1];
    // objectsToDraw = [cat, cat2];
};

const reach = (t0, t1, v) => {
    if (t0 < t1) {
        return min(t0 + v, t1);
    }
    else if (t0 > t1) {
        return max(t0 - v, t1);
    }
    return t0;
};
const lerp = (a, b, t) => a * (1 - t) + b * t;
const shuffle = (array) => {
    for (let i = 0; i < array.length; ++i) {
        const idx = (random() * array.length) | 0;
        // swap
        const temp = array[idx];
        array[idx] = array[i];
        array[i] = temp;
    }
};
const pickRandom = (array) => array[(random() * array.length) | 0];
const easeQuadOut = (t) => t * (2 - t);
const lerp_rgb = (a, b, t) => (lerp((a >> 16) & 0xff, (b >> 16) & 0xff, t) << 16) |
    (lerp((a >> 8) & 0xff, (b >> 8) & 0xff, t) << 8) |
    lerp(a & 0xff, b & 0xff, t);
const css_rgba = (color, alpha = 1) => "rgba(" +
    ((color >> 16) & 0xff) +
    "," +
    ((color >> 8) & 0xff) +
    "," +
    (color & 0xff) +
    "," +
    alpha +
    ")";
// export const formatMMSS = (seconds: number) =>
//   // [seconds / 60, seconds % 60].map((x) => (x < 10 ? "0" : "") + (x | 0))
//   [seconds / 60, seconds % 60].map((x) => ((x / 10) | 0) + "" + (x | 0))
//     .join`:`;
const formatMMSS = (seconds, mm = (seconds / 60) | 0, ss = seconds % 60 | 0) => "" + ((mm / 10) | 0) + (mm % 10) + ":" + ((ss / 10) | 0) + (ss % 10);
// {
//   const m = "" + ((seconds / 60) | 0);
//   const s = "" + (seconds % 60 | 0);
//   return m.padStart(2, "0") + ":" + s.padStart(2, "0");
// }
const clamp = (x) => min(1, max(0, x));
const makeArray = (n, v) => Array(n).fill(v);
const chance = (n = 0.5) => random() < n;
const smoothstep = (edge0, edge1, x, 
// Scale, and clamp x to 0..1 range
_t = clamp((x - edge0) / (edge1 - edge0))) => _t * _t * (3 - 2 * _t);

const MAP_BASE_COLORS = [0x667722, 0x224455, 0xccddff];
const COLORS = [
    0xffffff,
    ,
];
const CSS_WHITE = "#fff";
const CSS_BLACK = "#000";
const bwColor = (t) => css_rgba(lerp_rgb(0, COLORS[0], t));
const calcBaseColor = (rgb, add_white = 0, light = 1) => css_rgba(lerp_rgb(lerp_rgb(0, rgb, light), COLORS[0], easeQuadOut(add_white)));
const updateColors = (night, snow, rain) => {
    COLORS[1] = lerp_rgb(lerp_rgb(lerp_rgb(MAP_BASE_COLORS[0], MAP_BASE_COLORS[1], rain), MAP_BASE_COLORS[2], snow), 0, night * 0.7);
};

const getFontStyle = (sz) => "bold " + sz + "px sans-serif";
const addTextParticle = (x, y, text, color, scale = 1, speed = 2) => {
    textParticles.push({
        _internal_x: x,
        _internal_y: y,
        _internal_text: text,
        _internal_dx: (random() - 0.5) * 10,
        _internal_dy: -10 * random(),
        _internal_r: random() - 0.5,
        _internal_t: 1,
        _internal_s: speed,
        _internal_color: color,
        _internal_scale: scale,
    });
};
const drawTextParticles = () => {
    textParticles.sort((a, b) => a._internal_y - b._internal_y);
    for (let i = 0; i < textParticles.length; ++i) {
        const p = textParticles[i];
        p._internal_t -= rawDeltaTime * p._internal_s;
        if (p._internal_t > 0) {
            if (testVisible(p._internal_x, p._internal_y * WORLD_SCALE_Y, 10)) {
                const bb = 1 - p._internal_t;
                const bb2 = sin(bb * PI) ** 0.5;
                ctx.save();
                const tt = 1 - p._internal_t ** 3;
                ctx.translate(p._internal_x + p._internal_dx * tt, p._internal_y * WORLD_SCALE_Y - 10 + p._internal_dy * tt);
                ctx.rotate(bb * p._internal_r);
                ctx.scale(bb2, bb2);
                drawText(0, 0, p._internal_text, p._internal_color, 10 * p._internal_scale);
                ctx.restore();
            }
        }
        else {
            textParticles.splice(i--, 1);
        }
    }
};
const drawText = (x, y, text, color, size, al = 1, str = "" + text, off = (0.2 * size) / 10) => {
    ctx.font = getFontStyle(size);
    ctx.textAlign = ["left", "center", "right"][al];
    ctx.lineWidth = 2 * (size / 10);
    ctx.lineCap = ctx.lineJoin = "round";
    ctx.strokeStyle = CSS_BLACK;
    ctx.fillStyle = color;
    ctx.strokeText(str, x + off, y + off);
    ctx.fillText(str, x, y);
};
const images = {};
const drawIcon = (x, y, text, size) => {
    if (!images[text]) {
        const cs = 64;
        const img = document.createElement("canvas");
        const ictx = img.getContext("2d");
        img.width = cs;
        img.height = cs;
        ictx.textAlign = "center";
        ictx.font = getFontStyle(cs - 4);
        // ictx.fillStyle = CSS_WHITE;
        ictx.filter = "contrast(1.4) drop-shadow(0px 0px 1px #000)";
        ictx.fillText(text, cs / 2, cs * (1 - 11 / 64));
        ictx.drawImage(img, 0, 0);
        images[text] = img;
    }
    ctx.drawImage(images[text], x - size / 2, y - size / 2, size, size);
};

const drawChest = (timeOffset, j = sin(time * 8 + timeOffset)) => {
    ctx.save();
    ctx.scale(1 + 0.1 * j, 1 - 0.3 * j);
    ctx.translate(0, 4 - 2 * (1 - j));
    ctx.fillStyle = "#9ac";
    ctx.fillRect(-4, -3, 8, 3);
    ctx.beginPath();
    ctx.ellipse(0, 0, 4, 2, 0, 0, TAU);
    ctx.fill();
    ctx.fillStyle = bwColor(0.2 - 0.2 * sin(time * 4));
    ctx.beginPath();
    ctx.ellipse(0, -3, 4, 2, 0, 0, TAU);
    ctx.fill();
    // BEGIN FISH
    ctx.fillStyle = "#cde";
    ctx.save();
    ctx.translate(-4, -3 + 0.4);
    ctx.rotate(-0.4 + 0.4 * j * sin(time * 4));
    ctx.beginPath();
    ctx.ellipse(4, 0, 4.2, 2.2, 0, 0, TAU);
    ctx.fill();
    ctx.fillStyle = "#a9a";
    ctx.beginPath();
    ctx.moveTo(3, 0);
    ctx.quadraticCurveTo(3 + 2, -2, 3 + 4, 0);
    ctx.quadraticCurveTo(3 + 2, 2, 3 + 0, 0);
    ctx.lineTo(3 - 2, -1);
    ctx.lineTo(3 - 2, 1);
    ctx.fill();
    ctx.restore();
    // END FISH
    ctx.restore();
};
const fillWorldCircle = (x, y, r, fillColor, strokeColor, lineWidth) => {
    ctx.beginPath();
    ctx.ellipse(x, y * WORLD_SCALE_Y, r, r * WORLD_SCALE_Y, 0, 0, TAU);
    if (fillColor) {
        ctx.fillStyle = fillColor;
        ctx.fill();
    }
};
const fillCircle = (x, y, r, color) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, TAU);
    ctx.fill();
};

const drawDrop = (drop) => {
    ctx.save();
    ctx.translate(drop._internal_x, drop._internal_y * WORLD_SCALE_Y -
        2 +
        sin(time * 4 + drop._internal_anim0) / 2 +
        // -5 * (1 - (1 - drop.captureTime) ** 2)
        -12 * sin(drop._internal_captureTime * 2.5));
    if (drop._internal_item === 2) {
        ctx.rotate(PI / 6);
        ctx.fillStyle = bwColor(sin(time * 8) / 2 + 0.5);
        ctx.fillRect(-3, -2, 6, 4);
        ctx.fillStyle = "#f00";
        ctx.fillRect(-2, -1, 2, 2);
        ctx.fillStyle = "#00f";
        ctx.fillRect(0, -1, 2, 2);
    }
    else if (drop._internal_item === 3) {
        // ctx.rotate(PI / 4);
        // ctx.fillStyle = bwColor(sin(time * 4) / 2 + 0.5);
        // ctx.fillRect(-2, -2, 4, 4);
        ctx.rotate((sin(time * 4) * PI) / 10);
        const s = cos(time * 4);
        //ctx.scale(cos(time * 4) ** 0.5, 1);
        ctx.fillStyle = bwColor(sin(time * 8) / 2 + 0.5);
        ctx.fillRect(-2 * s, -2, 4 * s, 1);
        ctx.fillRect(-0.5, -4, 1, 6);
    }
    else if (drop._internal_item === 4) {
        drawChest(drop._internal_anim0);
    }
    else {
        ctx.beginPath();
        ctx.ellipse(0, 0, drop._internal_radius + sin(drop._internal_anim0 + time * 13) / 8, drop._internal_radius + cos(drop._internal_anim0 + time * 19) / 8, 0, 0, TAU);
        ctx.lineWidth = 1;
        const col = drop._internal_item === 0
            ? [0x00ff00, 0x66ffcc, 0xcc66ff][min(2, drop._internal_count - 1)]
            : 0x990000;
        ctx.fillStyle = css_rgba(col);
        ctx.strokeStyle = calcBaseColor(col, 0.5);
        ctx.stroke();
        ctx.fill();
    }
    ctx.restore();
};
const addDropItem = (x, y, item, amount, radius = item === 4 ? 5 : 1) => drops.push({
    _internal_x: x,
    _internal_y: y + 1,
    _internal_item: item,
    _internal_type: 2,
    _internal_count: amount,
    _internal_vx: 0,
    _internal_vy: 0,
    _internal_shadowSize: 1,
    _internal_radius: radius,
    _internal_captured: 0,
    _internal_captureTime: 0,
    _internal_anim0: random() * 10,
    _internal_color: item === 0
        ? [0x00ff00, 0x66ffcc, 0xcc66ff][min(2, amount - 1)]
        : item === 1
            ? 0x990000
            : 0xcccc99,
});

let seed0;
const temper = (x) => ((x ^= x >> 11),
    (x ^= (x << 7) & 0x9d2c5680),
    (x ^= (x << 15) & 0xefc60000),
    (x ^= x >> 18));
const setSeed = (seed) => (seed0 = seed);
const nextInt = (fromSeed = (seed0 = imul(1103515245, seed0) + 12345)) => temper(fromSeed) & (0x80000000 - 1);
const nextFloat = (maxExclusive = 1) => maxExclusive * (nextInt() / 0x7fffffff);
// RNG.prototype.nextFloat = function() {
//   // returns in range [0,1]
//   return this.nextInt() / (this.m - 1);
// }
// RNG.prototype.nextRange = function(start, end) {
//   // returns in range [start, end): including start, excluding end
//   // can't modulu nextInt because of weak randomness in lower bits
//   var rangeSize = end - start;
//   var randomUnder1 = this.nextInt() / this.m;
//   return start + sqrt(floor(randomUnder1 * rangeSize);
// }
// RNG.prototype.choice = function(array) {
//   return array[this.nextRange(0, array.length)];
// }

const drawGround = (x0 = visibleX0 >> 4, y0 = visibleY0 >> 4, x1 = visibleX1 >> 4, y1 = visibleY1 >> 4, blockColor = calcBaseColor(COLORS[1], 0, 0.95), flowerCenterColor = css_rgba(lerp_rgb(0xff7700, COLORS[1], 0.5)), flowerColor = css_rgba(lerp_rgb(COLORS[0], COLORS[1], 0.5))) => {
    for (let cy = y0; cy <= y1; ++cy) {
        for (let cx = x0; cx <= x1; ++cx) {
            const x = cx << 4;
            const y = cy << 4;
            setSeed((-x + (y << 8)) >>> 0);
            if (nextInt() & 1) {
                ctx.fillStyle = blockColor;
                drawBlock(x, y);
            }
            setSeed((x + (y << 8)) >>> 0);
            if (!(nextInt() & 3)) {
                drawFlower(x, y, flowerCenterColor, flowerColor);
            }
        }
    }
};
const drawFlower = (x, y, centerColor, baseColor) => {
    ctx.save();
    ctx.translate(x + nextFloat(16), y + nextFloat(16));
    ctx.rotate((nextFloat() - 0.5) / 2);
    const s = 1 + nextFloat() / 2;
    ctx.scale(s, s * 0.6);
    for (let i = 0; i < 6; ++i) {
        fillCircle(1.5 * cos((TAU * i) / 6), 1.5 * sin((TAU * i) / 6), 0.75, baseColor);
    }
    fillCircle(0, 0, 1, centerColor);
    ctx.restore();
};
const drawBlock = (x, y) => {
    ctx.save();
    ctx.translate(x + 8, y + 8);
    ctx.rotate((nextFloat() - 0.5) / 2);
    ctx.fillRect(-7, -5, 14, 5);
    ctx.fillRect(-7, 1, 14, 5);
    ctx.restore();
};

const updateAndDrawParticles = (list, deltaTime = dt) => {
    ctx.lineWidth = 1;
    for (let i = 0; i < list.length; ++i) {
        const p = list[i];
        p._internal_t += deltaTime;
        if (p._internal_t >= p._internal_maxTime) {
            list.splice(i--, 1);
        }
        else {
            p._internal_vx *= exp(-deltaTime * p._internal_damp);
            p._internal_vy *= exp(-deltaTime * p._internal_damp);
            p._internal_x += p._internal_vx * deltaTime;
            p._internal_y += p._internal_vy * deltaTime;
            if (p._internal_rs)
                p._internal_r += p._internal_rs * deltaTime;
            if (testVisible(p._internal_x, p._internal_y, 10)) {
                ctx.save();
                ctx.translate(p._internal_x, p._internal_y);
                ctx.strokeStyle = ctx.fillStyle = p._internal_color;
                drawers[p._internal_type](p, p._internal_r + p._internal_va * atan2(p._internal_vy, p._internal_vx), p._internal_t / p._internal_maxTime);
                ctx.restore();
            }
        }
    }
};
const drawers = [
    // drawPaw
    (p, r, t) => {
        ctx.rotate(r + sin(t * PI));
        ctx.translate(0, 10 * sin(-PI / 2 + t * PI));
        ctx.scale(1, 15 * sin(t * t * PI));
        ctx.beginPath();
        ctx.moveTo(0, -1);
        ctx.lineTo(0, 0);
        ctx.moveTo(-2, -1);
        ctx.lineTo(-2, 0);
        ctx.moveTo(2, -1);
        ctx.lineTo(2, 0);
        ctx.stroke();
    },
    // drawSpark
    (p, r, t, s = p._internal_scale * (1 - t ** 2)) => {
        ctx.rotate(r);
        ctx.scale(s, s * 0.5);
        ctx.beginPath();
        ctx.arc(0, 0, 4, 0, TAU);
        ctx.fill();
    },
    // drawSmoke
    (p, r, t, s = p._internal_scale * (1 - t ** 2)) => {
        ctx.rotate(r);
        ctx.scale(s, s * p._internal_sy);
        ctx.beginPath();
        ctx.arc(0, 0, 4, 0, TAU);
        ctx.fill();
    },
    // drawWhip
    (p, r, t) => {
        const s = p._internal_scale * (1 - t ** 2);
        ctx.rotate(r);
        ctx.scale(s, s * 0.5);
        ctx.beginPath();
        if (t < 0.5) {
            ctx.arc(0, 0, 4, 0, TAU, true);
            ctx.clip();
            ctx.arc(-3 + 3 * t, 0, 8 * easeQuadOut(t), 0, TAU, false);
            ctx.fill();
        }
    },
    // heart
    (p, r, t, s = p._internal_scale * sin(t * PI) ** 0.5) => {
        ctx.rotate(r);
        ctx.scale(s, s);
        drawIcon(0, 0, "❤️", 8);
    },
    // line
    (p, r, t, s = p._internal_scale * clamp(3 * sin(t * PI))) => {
        ctx.rotate(r);
        ctx.scale((s * hypot(p._internal_vy, p._internal_vx)) / 20, s / 2);
        ctx.beginPath();
        ctx.arc(0, 0, 4, 0, TAU);
        ctx.fill();
    },
];

let musicGain = audioContext.createGain();
// Chord filter
let chordOut = audioContext.createBiquadFilter();
let bassOut = audioContext.createGain();
const initMusic = () => {
    musicGain.gain.value = 0;
    bassOut.gain.value = 0.7;
    chordOut.type = "lowpass";
    chordOut.frequency.value = 500;
    musicGain.connect(audioContext.destination);
    chordOut.connect(musicGain);
    bassOut.connect(musicGain);
};
/* =========================
   STATE
   ========================= */
let isPlaying = 0;
let tempo = 90; // BPM
const subdivisionsPerBeat = 4; // 16th notes
const subdivisionsPerBar = 4 * subdivisionsPerBeat; // 16 per bar
let nextNoteTime = 0;
let barIndex = 0;
let subdivisionIndex = 0;
let schedulerHandle;
const lookahead = 0.3; // schedule 0.3s ahead
/* =========================
   SCALES / CHORDS
   ========================= */
// const aMinor = ;
// export const gammas = [
//   [0, 2, 4, 5, 7, 9, 10],
//   [0, 2, 3, 5, 7, 8, 10],
// ];
const aMajor = [0, 2, 4, 5, 7, 9, 10];
const noteFreq = (semitonesFromA4) => 440 * 2 ** (semitonesFromA4 / 12);
const getScaleNote = (scaleIdx, octave = 0) => aMajor[scaleIdx % aMajor.length] + 12 * ((scaleIdx / aMajor.length) | 0);
const triadSemis = (rootScaleIdx) => {
    return [
        getScaleNote(rootScaleIdx),
        getScaleNote(rootScaleIdx + 2),
        getScaleNote(rootScaleIdx + 6),
        getScaleNote(rootScaleIdx + 4),
    ];
};
// Chord progression per bar
let progression = [0, 3, 4, 2]; // A minor cycle
let currentChordRoot = 0;
/* =========================
   DRUMS
   ========================= */
const makeNoise = (dur) => {
    const buf = audioContext.createBuffer(1, audioContext.sampleRate * dur, audioContext.sampleRate);
    const ch = buf.getChannelData(0);
    for (let i = 0; i < ch.length; i++)
        ch[i] = random() * 2 - 1;
    const src = audioContext.createBufferSource();
    src.buffer = buf;
    return src;
};
const playKickAt = (t) => {
    const osc = audioContext.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(135, t);
    osc.frequency.exponentialRampToValueAtTime(0.001, t + 0.2);
    const g = audioContext.createGain();
    g.gain.setValueAtTime(0.8, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.1);
    osc.connect(g);
    g.connect(musicGain);
    osc.start(t);
    osc.stop(t + 0.3);
};
const playSnareAt = (t) => {
    const src = makeNoise(0.2);
    const fil = audioContext.createBiquadFilter();
    fil.type = "highpass";
    fil.frequency.value = 2000;
    const g = audioContext.createGain();
    g.gain.setValueAtTime(0.7, t);
    g.gain.exponentialRampToValueAtTime(0.01, t + 0.15);
    src.connect(fil);
    fil.connect(g);
    g.connect(musicGain);
    src.start(t);
    src.stop(t + 0.2);
};
const playHatAt = (t) => {
    const src = makeNoise(0.12);
    const fil = audioContext.createBiquadFilter();
    fil.type = "highpass";
    fil.frequency.value = 7000;
    const g = audioContext.createGain();
    g.gain.setValueAtTime(0.12, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.06);
    src.connect(fil);
    fil.connect(g);
    g.connect(musicGain);
    src.start(t);
    src.stop(t + 0.08);
};
/* =========================
   CHORDS
   ========================= */
const playChordAt = (t, chordSemis, durBeats = 4) => {
    const dur = (durBeats * 60) / tempo;
    const ddd = 16;
    // bass plays root
    for (let i = 0; i < ddd; i++) {
        if (i === 0 ||
            (random() > 0.2 &&
                (kickPattern[drumPattern][i] || snarePattern[drumPattern][i]))) {
            playBassAt(t, dur / ddd, chordSemis[i > 0 || random() < i / ddd ? 0 : (1 + random() * 2) | 0]);
        }
        if (i > 7 && i <= 10) {
            t += dur / ddd;
            continue;
        }
        // continue;
        const s = chordSemis[i % chordSemis.length];
        const osc = audioContext.createOscillator();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(noteFreq(s), t);
        const g = audioContext.createGain();
        g.gain.setValueAtTime(0.6, t);
        // g.gain.linearRampToValueAtTime(0.9, t + dur / 16);
        g.gain.exponentialRampToValueAtTime(0.01, t + dur / 8);
        osc.connect(g);
        g.connect(chordOut);
        osc.start(t);
        osc.stop(t + dur / 16);
        t += dur / ddd;
    }
};
/* =========================
   PATTERNS
   ========================= */
// Simple 16th-note drum patterns
let drumPattern = 0;
const kickPattern = [
    [1, , , , 1, , , , 1, , , 1, , 1, ,],
    [1, , , 1, , , 1, , 1, , , 1, , , 1, 1],
];
const snarePattern = [
    [, , 1, , , , 1, , , , 1, , , , 1, 1],
    [, , 1, , , , 1, , , , 1, , , , 1],
];
const hihatPattern = [makeArray(16, 1), makeArray(16, 1)]; // constant 16th hi-hats
const generateProgression = () => {
    const chordTransitions = [
        [3, 4, 2], // i → iv, v, III
        [0, 3], // ii° → i, iv
        [3, 0, 5], // III → iv, i, VI
        [0, 4, 5], // iv → i, v, VI
        [0, 2, 5], // v → i, III, VI
        [3, 4, 0], // VI → iv, v, i
        [0, 2, 3], // VII → i, III, iv
    ];
    progression = [];
    let cc = currentChordRoot;
    for (let i = 0; i < 4; ++i) {
        const nextOptions = chordTransitions[cc];
        cc = nextOptions[(random() * nextOptions.length) | 0];
        progression.push(cc);
    }
    return progression;
};
/* =========================
   SCHEDULER
   ========================= */
const scheduleAhead = () => {
    const now = audioContext.currentTime;
    while (nextNoteTime < now + lookahead) {
        const subIdx = subdivisionIndex % subdivisionsPerBar;
        // bar start
        if (subIdx === 0) {
            if (barIndex % 4 === 0) {
                if (barIndex) {
                    if (random() > 0.7) {
                        currentChordRoot = progression[(barIndex - 1) % progression.length];
                        generateProgression();
                    }
                }
                drumPattern = random() > 0.5 ? 0 : 1;
            }
            currentChordRoot = progression[barIndex % progression.length];
            playChordAt(nextNoteTime, triadSemis(currentChordRoot), 4);
            ++barIndex;
        }
        // drum hits
        if (kickPattern[drumPattern][subIdx])
            playKickAt(nextNoteTime);
        if (snarePattern[drumPattern][subIdx])
            playSnareAt(nextNoteTime);
        if (hihatPattern[drumPattern][subIdx])
            playHatAt(nextNoteTime);
        // advance
        nextNoteTime += 60 / tempo / subdivisionsPerBeat;
        ++subdivisionIndex;
    }
};
/* =========================
   BASS
   ========================= */
const playBassAt = (t, dur, rootSemis) => {
    const osc = audioContext.createOscillator();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(noteFreq((rootSemis % 12) - 36), t); // two octaves down
    const g = audioContext.createGain();
    g.gain.setValueAtTime(1, t);
    g.gain.exponentialRampToValueAtTime(1 / 2, t + dur);
    osc.connect(g);
    g.connect(bassOut);
    osc.start(t);
    osc.stop(t + dur);
};
/* =========================
   PUBLIC API
   ========================= */
const startMusic = () => {
    if (!isPlaying) {
        isPlaying = 1;
        barIndex = 0;
        subdivisionIndex = 0;
        nextNoteTime = audioContext.currentTime + 0.05;
        schedulerHandle = window.setInterval(scheduleAhead, 25);
        musicGain.gain.value = 0.05;
    }
};
const setMusicProgress = (x) => {
    const y = x % (2 * 60);
    const chordsVol = smoothstep(30, 90, y) - smoothstep(2 * 60 - 5, 2 * 60, y);
    const bassVol = (smoothstep(0, 30, y) - smoothstep(2 * 60 - 5, 2 * 60, y)) / 2;
    chordOut.frequency.value = chordsVol * 500;
    bassOut.gain.value = bassVol;
};
const stopMusic = () => {
    if (isPlaying) {
        isPlaying = 0;
        musicGain.gain.value = 0;
        if (schedulerHandle)
            clearInterval(schedulerHandle);
    }
};

// old XP = [
//   0.1,
//   ,
//   207,
//   ,
//   0.08,
//   0.19,
//   3,
//   1.7,
//   1,
//   ,
//   ,
//   ,
//   0.09,
//   0.4,
//   ,
//   0.1,
//   0.07,
//   0.61,
//   0.02,
//   0.01,
//   -2045,
// ],
const sounds = [
    // levelup
    [
        0.4,
        ,
        237,
        0.02,
        0.28,
        0.35,
        ,
        2.5,
        ,
        5,
        196,
        0.14,
        ,
        ,
        ,
        ,
        0.17,
        0.59,
        0.11,
        ,
        -536,
    ],
    // level up 2
    [0.1, , , 0.07, 0.23, 0.29, , 3.8, -5, , , , , 0.3, , , , 0.8, 0.25],
    // collect
    [1 / 8, , 1675, , 0.06, 0.24, 1, 1.82, , , 837, 0.06],
    // [, , 224, 0.02, 0.02, 0.08, 1, 1.7, -13.9, , , , , , 6.7],
    [
        ,
        ,
        101,
        0.01,
        0.01,
        0.15,
        1,
        2.9,
        -5,
        7,
        ,
        ,
        ,
        1.2,
        17,
        ,
        0.13,
        0.52,
        0.04,
        ,
        -2025,
    ],
    [, , 914, 0.01, 0.02, 0.03, , 3.9, -52, , , , , , 24, , 0.08, 0.53, 0.01],
    [
        0.1,
        ,
        415,
        0.02,
        0.02,
        0.08,
        4,
        2.6,
        -1,
        16,
        ,
        ,
        ,
        1.5,
        ,
        0.1,
        ,
        0.88,
        0.09,
    ],
    // cat Ouch
    [1 / 2, 1, 56, , 0.16, 0.46, 2, , 14, -49, , , , , , , , 0.81, , 0.17, -527],
    // lightning
    [1 / 8, , 304, 0.1, 0.3, , 5, 0.1, -46, , , , , , -165],
    // shoot wind
    [, , 150, 0.05, , 0.05, , 1.3, , , , , , 3],
    // note
    [
        1 / 2,
        0,
        440,
        ,
        0.94,
        0.34,
        ,
        0.7,
        ,
        ,
        ,
        ,
        0.11,
        0.2,
        ,
        ,
        ,
        0.34,
        0.19,
        0.23,
    ],
    [1 / 4, 0, 440, 0.1, 0.3, , 2, 1.9, , , , , , , , , , 0.3, 0.03, , -786],
];
let r = [];
const playSound = (id, note = 0, timeOffset = 0, set = 1) => {
    if (!r[id]) {
        const src = zzfx(...sounds[id]);
        src.detune.value = note * 100;
        src.start(audioContext.currentTime + timeOffset);
        r[id] = set;
    }
};
const resetSounds = () => (r = []);
const playMusicMoment = () => {
    let t = 0;
    for (let i = 0; i < 6; ++i) {
        playSound(10, getScaleNote([0, 1, 2, 1, 2, 3, 4, 5][i]), t, 0);
        t += 0.15;
    }
};
const playMusicMoment2 = () => {
    let t = 0;
    let dur = 0.1;
    for (let i = 0; i < 24; ++i) {
        if ([1, 0, 1, 0][i % 4])
            playSound(4, 12, t, 0);
        if ([0, 1, 0, 1][i % 4])
            playSound(8, 12 - i / 2, t, 0);
        playSound(5, 12 - (i & 3), t, 0);
        // if (!(i & 1)) {
        // const j = i / 2;
        playSound(9, getScaleNote((i % 3) + ((i / 3) | 0)), t, 0);
        // }
        t += dur;
        dur *= 1.055;
    }
    playSound(9, getScaleNote(7), t, 0);
    t += dur;
    for (let i = 0; i < 8; ++i) {
        playSound(10, getScaleNote([0, 1, 2, 1, 2, 3, 4, 5][i]), t, 0);
        t += 0.15;
    }
};

const createSlotInstance = (id) => ({
    _internal_type: id,
    _internal_level: 0,
    _internal_stats: [0, 0, 0, 0, 0, 0],
    _internal_attackTimer: 0,
    _internal_burstTimer: 0,
    _internal_burstClip: 0,
    _internal_animation: 0,
});
const getCharItemPassive = (x) => +(x < 12);
const getCharItemMaxLevel = (x) => x === 5 ? 1 : 4;

let level;
let xp;
let frags;
let playTime;
const XP_MOD = 5;
const baseStats = [
    // ExtraProjectiles
    0,
    // damage
    5,
    // BulletSpeed
    0,
    // Area
    0,
    // attack speed mod
    0,
    // burst speed
    0,
    // hp
    100,
    // regen
    0,
    // move speed
    60,
    // magnet radius
    30,
    // xp
    XP_MOD,
    // luck
    1,
    // Armor
    0,
    // WeaponSlots
    6,
    // PassiveSlots
    6,
];
let stats;
let slots;
const resetStats = () => {
    slots = [];
    stats = baseStats.concat();
    level = 0;
    xp = 0;
    frags = 0;
    playTime = 0;
};
const getStat = (stat) => stats[stat];
const addStat = (stat, add) => (stats[stat] += add);
const getWeaponOrPassiveCount = (passive) => slots.filter((s) => passive == getCharItemPassive(s._internal_type)).length;
// export const getNextLevelXp = () => (5 * (level + 1) ** 0.9) | 0;
const getNextLevelXp = () => (5 * XP_MOD * (1 + level ** 0.9)) | 0;
const addPlayTime = (v, dur) => {
    playTime = min(dur, playTime + v);
    return playTime >= dur;
};
const addXp = (count) => {
    xp += count;
    const nextLevelXp = getNextLevelXp();
    if (xp >= nextLevelXp) {
        xp -= nextLevelXp;
        ++level;
        return true;
    }
    return false;
};
const addFrag = () => ++frags;
const addLevelDebug = () => {
    ++level;
};
const getSlotWithItem = (charItem) => slots.find((s) => s._internal_type === charItem);
const getWeaponStat = (slot, key) => slot._internal_stats[key] + stats[key];

let current = 0;
let target = 0;
const setScreenDimming = (v) => (target = v);
const drawScreenDimming = () => {
    current = reach(current, target, 8 * rawDeltaTime);
    if (current > 0) {
        ctx.fillStyle = "rgba(0,0,10," + (current * 3) / 4 + ")";
        ctx.fillRect(0, 0, gameWidth, gameHeight);
    }
};

let gen = 0;
let lines = 0;
let list = [];
const resetLevelUpParticles = () => {
    gen = 0;
    lines = 0;
    list = [];
};
const generateLevelUpParticles = (newItemPerc) => {
    gen += newItemPerc <= 0 ? rawDeltaTime * 300 : 0;
    while (gen > 0) {
        list.push({
            _internal_x: random() * gameWidth,
            _internal_y: random() * gameHeight - 50,
            _internal_r: 0,
            _internal_damp: 3,
            _internal_t: 0,
            _internal_va: 0,
            _internal_maxTime: 1 + random(),
            _internal_color: "hsl(" + ((random() * 360) | 0) + ",100%,70%)",
            _internal_type: 0,
            _internal_vx: 100 * (random() - 0.5),
            _internal_vy: 100 + random() * 100,
            _internal_scale: random() * 4,
            _internal_sy: 1,
        });
        --gen;
    }
    lines += newItemPerc * rawDeltaTime * 300;
    while (lines-- > 0) {
        list.push({
            _internal_x: random() * gameWidth,
            _internal_y: -50,
            _internal_r: 0,
            _internal_damp: 0,
            _internal_t: 0,
            _internal_va: 0,
            _internal_maxTime: 1 + random(),
            _internal_color: "rgba(255,255," + random() * 255 + "," + random() / 4 + ")",
            _internal_type: 1,
            _internal_vx: 5 * (random() - 0.5),
            _internal_vy: 0,
            _internal_scale: 10,
            _internal_sy: 1,
        });
        --lines;
    }
};
const doLevelUpParticles = () => {
    for (let i = 0; i < list.length; ++i) {
        const p = list[i];
        p._internal_t += rawDeltaTime;
        if (p._internal_t >= p._internal_maxTime) {
            list.splice(i--, 1);
        }
        else {
            const t = p._internal_t / p._internal_maxTime;
            p._internal_vx *= exp(-rawDeltaTime * p._internal_damp);
            p._internal_vy *= exp(-rawDeltaTime * p._internal_damp);
            p._internal_x += p._internal_vx * rawDeltaTime;
            p._internal_y += p._internal_vy * rawDeltaTime;
            if (p._internal_type) {
                ctx.fillStyle = p._internal_color;
                const w = 1 + p._internal_scale * sin(t * t * PI);
                ctx.fillRect(p._internal_x - w / 2, p._internal_y, w, gameHeight * 2);
            }
            else {
                fillCircle(p._internal_x, p._internal_y, 0.001 + p._internal_scale * sin(t * PI) * (0.7 + 0.3 * sin(t * 32)), p._internal_color);
            }
        }
    }
};

// export const TEXT_DATA = [
//   "💪,🛡️,🔦,🏹,📖,✨,👟,🍀,❤️,🍅,🧲,🧠,🫧,🔥,🪓,🔪,➰,🪃,🧸,💫,⚡,💧,🐾",
//   "Might,Armor,Flashlight,Bracer,Empty Tome,Duplicator,Sneakers,Clover,Hp,Regen,Dry Wool,Education,Void Beam,Fireballs,Axes,Knifes,Tail Whip,Boomerang,Furricane,Sawblades,Lightning,Unlucky Drops,Claws",
//   "Base damage,Armor,Damage Area,Bullet Speed,Rate of Fire,Extra Bullet,Moving Speed,Lucky Dodger,Max HP,Recover HP,Pickup Range,Earn XP,Target Closest Enemy,Random Direction,Throws Axes up,Move to Aim,Side-Swiping Attack,Come Back,Damage Aura,Orbit and slice,Random Area,Trace of Damage,Scratching Around",
//   "Bullets,Damage,Bullet Speed,Damage Area,Rate of Fire,Burst Frequency",
// ].map((x) => x.split`,`);
// export const [TEXT_DATA_0, TEXT_DATA_1, TEXT_DATA_2, TEXT_DATA_3] = [
//   "💪,🛡️,🔦,🏹,📖,✨,👟,🍀,❤️,🍅,🧲,🧠,🫧,🔥,🪓,🔪,➰,🪃,🧸,💫,⚡,💧,🐾",
//   "Might,Armor,Flashlight,Bracer,Empty Tome,Duplicator,Sneakers,Clover,Hp,Regen,Dry Wool,Education,Void Beam,Fireballs,Axes,Knifes,Tail Whip,Boomerang,Furricane,Sawblades,Lightning,Unlucky Drops,Claws",
//   "Base damage,Armor,Damage Area,Bullet Speed,Rate of Fire,Extra Bullet,Moving Speed,Lucky Dodger,Max HP,Recover HP,Pickup Range,Earn XP,Target Closest Enemy,Random Direction,Throws Axes up,Move to Aim,Side-Swiping Attack,Come Back,Damage Aura,Orbit and slice,Random Area,Trace of Damage,Scratching Around",
//   "Bullets,Damage,Bullet Speed,Damage Area,Rate of Fire,Burst Frequency",
// ].map((x) => x.split`,`);
const TEXT_ICON = [
    "💪",
    "🛡️",
    "🔦",
    "🏹",
    "📖",
    "✨",
    "👟",
    "🍀",
    "❤️",
    "🍅",
    "🧲",
    "🧠",
    "🫧",
    "🔥",
    "🪓",
    "🔪",
    "➰",
    "🪃",
    "🧸",
    "💫",
    "⚡",
    "💧",
    "🐾",
];
const TEXT_NAME = [
    "力量",
    "护甲",
    "手电筒",
    "护腕",
    "空白卷轴",
    "复制器",
    "运动鞋",
    "四叶草",
    "生命值",
    "再生",
    "磁铁",
    "教育",
    "虚空射线",
    "火球",
    "斧头",
    "刀",
    "尾鞭",
    "回旋镖",
    "飓风",
    "锯刃",
    "闪电",
    "不幸掉落",
    "爪子",
];
const TEXT_DESC = [
    "基础伤害",
    "护甲",
    "伤害范围",
    "子弹速度",
    "射速",
    "额外子弹",
    "移动速度",
    "幸运闪避",
    "最大生命值",
    "恢复生命值",
    "拾取范围",
    "获得经验",
    "瞄准最近敌人",
    "随机方向",
    "向上投掷斧头",
    "移动瞄准",
    "侧面攻击",
    "回来",
    "伤害光环",
    "轨道切割",
    "随机区域",
    "伤害痕迹",
    "周围抓挠",
];
const TEXT_WEAPON_STAT = [
    "子弹",
    "伤害",
    "子弹速度",
    "伤害范围",
    "射速",
    "爆发频率",
];
// ow[0][13]
// ow[1][13]
// vs:
// ow[12]
// kd[33]
// export const TEXT_DATA =
//   "💪,🛡️,🔦,🏹,📖,✨,👟,🍀,❤️,🍅,🧲,🧠,🫧,🔥,🪓,🔪,➰,🪃,🧸,💫,⚡,💧,🐾;Might,Armor,Flashlight,Bracer,Empty Tome,Duplicator,Sneakers,Clover,Hp,Regen,Dry Wool,Education,Void Beam,Fireballs,Axes,Knifes,Tail Whip,Boomerang,Furricane,Sawblades,Lightning,Unlucky Drops,Claws;Base damage,Armor,Damage Area,Bullet Speed,Rate of Fire,Extra Bullet,Moving Speed,Lucky Dodger,Max HP,Recover HP,Pickup Range,Earn XP,Target Closest Enemy,Random Direction,Throws Axes up,Move to Aim,Side-Swiping Attack,Come Back,Damage Aura,Orbit and slice,Random Area,Trace of Damage,Scratching Around;Bullets,Damage,Bullet Speed,Damage Area,Rate of Fire,Burst Frequency"
//     .split`;`.map((x) => x.split`,`);
// export const [TEXT_DATA_0, TEXT_DATA_1, TEXT_DATA_2, TEXT_DATA_3] =
//   "💪,🛡️,🔦,🏹,📖,✨,👟,🍀,❤️,🍅,🧲,🧠,🫧,🔥,🪓,🔪,➰,🪃,🧸,💫,⚡,💧,🐾;Might,Armor,Flashlight,Bracer,Empty Tome,Duplicator,Sneakers,Clover,Hp,Regen,Dry Wool,Education,Void Beam,Fireballs,Axes,Knifes,Tail Whip,Boomerang,Furricane,Sawblades,Lightning,Unlucky Drops,Claws;Base damage,Armor,Damage Area,Bullet Speed,Rate of Fire,Extra Bullet,Moving Speed,Lucky Dodger,Max HP,Recover HP,Pickup Range,Earn XP,Target Closest Enemy,Random Direction,Throws Axes up,Move to Aim,Side-Swiping Attack,Come Back,Damage Aura,Orbit and slice,Random Area,Trace of Damage,Scratching Around;Bullets,Damage,Bullet Speed,Damage Area,Rate of Fire,Burst Frequency"
//     .split`;`.map((x) => x.split`,`);
// 12567
// export const CharItem_Icons = [
//   "💪",
//   "🛡️",
//   "🔦",
//   "🏹",
//   "📖",
//   "✨",
//   "👟",
//   "🍀",
//   "❤️",
//   "🍅",
//   "🧲",
//   "🧠",
//   // weapons
//   "🫧",
//   "🔥",
//   "🪓",
//   "🔪",
//   "➰",
//   "🪃",
//   "🧸",
//   "💫",
//   "⚡",
//   "💧",
//   "🐾",
//   // super weapons
//   // "🩸",
//   // "🌌",
//   // "💨",
//   // "🌪",
//   // "🌈",
//   // "🌋",
//   // "🌩",
// ];
// export const CharItem_Names = [
//   "Might",
//   "Armor",
//   "Flashlight",
//   "Bracer",
//   "Empty Tome",
//   "Duplicator",
//   "Sneakers",
//   "Clover",
//   "Hp",
//   "Regen",
//   "Dry Wool",
//   "Education",
//   // weapons
//   "Void Beam",
//   "Fireballs",
//   "Axes",
//   "Knifes",
//   "Tail Whip",
//   "Boomerang",
//   "Furricane",
//   "Sawblades",
//   "Lightning",
//   "Unlucky Drops",
//   "Claws",
//   // super weapons
//   // "Bloody Tear",
//   // "Holy Wand",
//   // "Thousand Edge",
//   // "Death Spiral",
//   // "Heaven Sword",
//   // "Hellfire",
//   // "Thunder Loop",
// ];

let rolledUpgrades = [0, 1, 2];
let cardPush = [0, 0, 0];
let nextLevelUpEvent = 0;
let levelUpEvents = [];
let levelUpOpen = 0;
let newItem = 0;
let levelUpActive = 0;
let levelUpPaused = 0;
let levelUpPausedTime = 0;
let newItemSpinTime = 0;
const newWeaponUpgrade = (key, value, _v = []) => {
    _v[key] = value;
    return _v;
};
const getWeaponUpgradeStats = (type, level) => {
    const idx = type - 12;
    if (idx >= 0) {
        return weaponUpgrades[idx][level];
    }
    return [];
};
//[projectiles, Damage, BulletSpeed, DamageArea, FireSpeed, BurstSpeed];
const weaponUpgrades = [
    // VoidBeam = 12,
    [
        [1, 5, 10, 10, 50, 2],
        newWeaponUpgrade(0, 1),
        newWeaponUpgrade(4, 25),
        newWeaponUpgrade(0, 1),
        newWeaponUpgrade(1, 10),
    ],
    // FireWand = 13,
    [
        [3, 5, 10, 10, 50, 4],
        newWeaponUpgrade(0, 1),
        newWeaponUpgrade(1, 5),
        newWeaponUpgrade(0, 1),
        newWeaponUpgrade(4, 20),
    ],
    //Axe = 14,
    [
        [1, 1, 10, 10, 50, 4],
        newWeaponUpgrade(0, 1),
        newWeaponUpgrade(0, 1),
        newWeaponUpgrade(1, 5),
        newWeaponUpgrade(4, 20),
    ],
    // Knife = 15,
    [
        [3, 1, 10, 10, 50, 4],
        newWeaponUpgrade(0, 1),
        newWeaponUpgrade(1, 5),
        newWeaponUpgrade(0, 1),
        newWeaponUpgrade(4, 30),
    ],
    // Whip = 16,
    [
        [1, 5, 10, 10, 50, 4],
        newWeaponUpgrade(0, 1),
        newWeaponUpgrade(1, 5),
        newWeaponUpgrade(3, 1),
        newWeaponUpgrade(4, 50),
    ],
    // Cross = 17,
    [
        [1, 1, 10, 10, 50, 4],
        newWeaponUpgrade(0, 1),
        newWeaponUpgrade(1, 4),
        newWeaponUpgrade(0, 1),
        newWeaponUpgrade(4, 20),
    ],
    // Garlic = 18,
    [
        [1, 3, 10, 10, 250, 4],
        newWeaponUpgrade(3, 2),
        newWeaponUpgrade(4, 50),
        newWeaponUpgrade(1, 5),
        newWeaponUpgrade(3, 2),
    ],
    // Sawblades = 19,
    [
        [1, 5, 5, 10, 25, 4],
        newWeaponUpgrade(0, 1),
        newWeaponUpgrade(1, 5),
        newWeaponUpgrade(0, 1),
        newWeaponUpgrade(4, 30),
    ],
    // Lightning = 20,
    [
        [1, 5, 10, 10, 50, 4],
        newWeaponUpgrade(0, 1),
        newWeaponUpgrade(1, 5),
        newWeaponUpgrade(0, 1),
        newWeaponUpgrade(4, 50),
    ],
    // SantaWater = 21,
    [
        [2, 3, 10, 10, 200, 4],
        newWeaponUpgrade(3, 5),
        newWeaponUpgrade(1, 3),
        newWeaponUpgrade(4, 30),
        newWeaponUpgrade(1, 3),
    ],
    // Claws = 22,
    [
        [1, 5, 10, 10, 100, 4],
        newWeaponUpgrade(4, 20),
        newWeaponUpgrade(1, 2),
        newWeaponUpgrade(4, 20),
        newWeaponUpgrade(1, 2),
    ],
];
const applySlotStats = (slot, _upgrade = getWeaponUpgradeStats(slot._internal_type, slot._internal_level)) => {
    for (let i = 0; i < _upgrade.length; ++i) {
        slot._internal_stats[i] += _upgrade[i] ?? 0;
    }
};
const passiveEffectParams = [
    // Might = 0,
    [1, 2],
    // Armor = 1,
    [12, 1],
    // Candle = 2,
    [3, 1],
    // Bracer = 3,
    [2, 1],
    // EmptyTome = 4,
    [4, 8],
    // Duplicator = 5,
    [0, 1],
    // Wings = 6,
    [8, 5],
    // Clover = 7,
    [11, 4],
    // Hp = 8,
    [6, 10],
    // Regen = 9,
    [7, 1],
    // Magnet = 10,
    [9, 10],
    // Education = 11,
    [10, 1],
];
const getEffectText = (type, level, upgrade = getWeaponUpgradeStats(type, level)) => {
    if (upgrade?.length && level > 0) {
        for (let i = 0; i < upgrade.length; ++i) {
            const value = upgrade[i];
            if (value != null) {
                return TEXT_WEAPON_STAT[i];
            }
        }
    }
    return TEXT_DESC[type];
};
const applyItem = (slot, _params = passiveEffectParams[slot._internal_type]) => _params && addStat(..._params);
const drawStatsChange = (type, level, passiveEffect = passiveEffectParams[type], upgrade = getWeaponUpgradeStats(type, level)) => {
    let baseValue;
    let delta;
    if (upgrade?.length && level > 0) {
        for (let i = 0; i < upgrade.length; ++i) {
            const value = upgrade[i];
            if (value != null) {
                baseValue = getWeaponStat(getSlotWithItem(type), i);
                delta = value;
                break;
            }
        }
    }
    if (passiveEffect) {
        baseValue = getStat(passiveEffect[0]);
        delta = passiveEffect[1];
    }
    if (delta) {
        drawText(-10, 60, baseValue, "#ccc", 8, 2);
        drawText(-2, 60, "→", CSS_WHITE, 10);
        drawText(6, 60, baseValue + delta, "#3f3", 10, 0);
    }
};
const upgradeCard = (x, y, index, upgrade, scale, enabled, hotkey = "Digit" + (index + 1)) => {
    if (upgrade == null)
        return;
    const w = 90;
    const h = 150;
    const tx = (gameWidth - w) / 2 + x;
    const ty = (gameHeight - h) / 2 + y;
    const slot = getSlotWithItem(upgrade);
    const over = enabled &&
        ((pointerX >= tx &&
            pointerY >= ty &&
            pointerX <= tx + w &&
            pointerY <= ty + h) ||
            keyboardIsDown[hotkey] | 0);
    //   const over =
    // enabled &&
    // ((pointerX >= tx &&
    //   pointerY >= ty &&
    //   pointerX <= tx + w &&
    //   pointerY <= ty + h) ||
    //   keyboardIsDown["Digit" + (index + 1)]);
    ctx.fillStyle = over ? "gray" : "#444";
    ctx.save();
    ctx.translate(x, y +
        (gameHeight / 2) * (1 - levelUpOpen) ** 3 +
        2 * sin(index - rawTime * 8) -
        (+over - cardPush[index]) * 4);
    ctx.rotate(0.03 * (index - 1));
    ctx.scale(scale, scale);
    ctx.beginPath();
    ctx.fillStyle = getCharItemPassive(upgrade) ? "#446" : "#644";
    ctx.strokeStyle = over ? CSS_WHITE : "#222";
    ctx.roundRect(-w / 2, -h / 2, w, h, 5);
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.stroke();
    const nextLevel = slot ? slot._internal_level + 1 : 0;
    const nextLvl = nextLevel + levelUpActive;
    drawText(0, -h / 2 + 30, nextLevel ? "LVL " + nextLvl : "新物品!", nextLevel ? CSS_WHITE : "#FF0", 10);
    drawText(0, -h / 2 + 15, TEXT_NAME[upgrade], CSS_WHITE, 10);
    drawIcon(0, 0, TEXT_ICON[upgrade], 40 + sin(rawTime * 8));
    drawText(0, 48, getEffectText(upgrade, nextLevel), CSS_WHITE, 8);
    drawStatsChange(upgrade, nextLevel);
    if (enabled) {
        drawText(0, h / 2, "按 [" + (index + 1) + "]", "#999", 6);
    }
    if (levelUpActive && levelUpOpen >= 1) {
        if (over && pointerDown) {
            cardPush[index] = 1;
        }
        else if (!pointerDown) {
            if (over && cardPush[index]) {
                pickCharItem(upgrade);
                pickLevelUp();
            }
            else {
                cardPush[index] = 0;
            }
        }
        if (keyboardUp[hotkey] && levelUpOpen >= 1) {
            pickCharItem(upgrade);
            pickLevelUp();
        }
    }
    ctx.restore();
};
const openPauseScreen = () => {
    if (!levelUpActive) {
        setScreenDimming(1);
        setGameTimeScale(0);
        levelUpPausedTime = levelUpPaused = 1;
        stopMusic();
    }
};
const pickLevelUp = () => {
    levelUpActive = 0;
    playSound(0);
    cardPush.fill(0);
    if (levelUpEvents.length && openLevelUp(levelUpEvents.shift())) {
        levelUpOpen = 0;
    }
    else {
        levelUpPaused = 1;
    }
};
const checkUpgradeIsFine = (charItem) => {
    const slot = getSlotWithItem(charItem);
    if (slot) {
        return slot._internal_level < getCharItemMaxLevel(charItem);
    }
    if (getCharItemPassive(charItem)) {
        return getWeaponOrPassiveCount(1) < getStat(14);
    }
    return getWeaponOrPassiveCount(0) < getStat(13);
};
const openLevelUpDelayed = (newItemType) => levelUpEvents.push(newItemType);
const openLevelUp = (newItemType) => {
    if (!levelUpPaused && !levelUpActive) {
        resetLevelUpParticles();
        cardPush.fill(0);
        rolledUpgrades = [];
        for (let x = 0; x < 23; ++x) {
            if (checkUpgradeIsFine(x)) {
                rolledUpgrades.push(x);
            }
        }
        if (rolledUpgrades.length > 0) {
            stopMusic();
            if (level === 1) {
                rolledUpgrades = rolledUpgrades.filter((x) => !getCharItemPassive(x));
            }
            shuffle(rolledUpgrades);
            levelUpActive = 1;
            newItemSpinTime = 0;
            setGameTimeScale(0);
            newItem = newItemType;
            if (newItemType) {
                playMusicMoment2();
                for (let i = 0; i < rolledUpgrades.length;) {
                    const type = rolledUpgrades[i];
                    if (!getSlotWithItem(type)) {
                        rolledUpgrades.splice(0, 1);
                        rolledUpgrades.push(type);
                    }
                    else {
                        break;
                    }
                }
            }
            else {
                playMusicMoment();
            }
            playSound(1);
            setScreenDimming(1);
            shakeCamera(0);
            return 1;
        }
        else {
            sleepGame(1);
            playSound(0);
            const item = (random() * passiveEffectParams.length) | 0;
            addTextParticle(cat1._internal_x0, cat1._internal_y0, TEXT_DESC[item] + " +1", "#FF0", 1, 1);
            addStat(passiveEffectParams[item][0], 1);
        }
    }
};
const levelUpDebug = (newItemType) => {
    rolledUpgrades.length = 0;
    for (let x = 0; x < 23; ++x) {
        if (checkUpgradeIsFine(x)) {
            rolledUpgrades.push(x);
        }
    }
    if (!newItemType) {
        addLevelDebug();
    }
    if (level === 1) {
        rolledUpgrades = rolledUpgrades.filter((x) => !getCharItemPassive(x));
    }
    shuffle(rolledUpgrades);
    if (newItemType) {
        for (let i = 0; i < rolledUpgrades.length;) {
            const type = rolledUpgrades[i];
            if (!getSlotWithItem(type)) {
                rolledUpgrades.splice(0, 1);
                rolledUpgrades.push(type);
            }
            else {
                break;
            }
        }
    }
    pickCharItem(rolledUpgrades[0]);
};
const resetLevelUps = () => {
    levelUpEvents = [];
    nextLevelUpEvent = 0;
};
const levelUpScreen = () => {
    if (levelUpEvents.length && !levelUpPaused && !levelUpActive) {
        nextLevelUpEvent += dt;
        if (nextLevelUpEvent > 0.5) {
            nextLevelUpEvent = 0;
            openLevelUp(levelUpEvents.shift());
        }
    }
    levelUpOpen = reach(levelUpOpen, levelUpActive, rawDeltaTime * 4);
    levelUpPausedTime = reach(levelUpPausedTime, levelUpPaused, rawDeltaTime * 4);
    newItemSpinTime = reach(newItemSpinTime, 1, rawDeltaTime / 7);
    if (levelUpPaused && isAnyKeyDown()) {
        levelUpPaused = 0;
        setGameTimeScale(1);
        setScreenDimming(0);
        startMusic();
    }
    ctx.save();
    ctx.translate(gameWidth / 2, gameHeight / 2);
    if (levelUpPausedTime > 0) {
        const s = ((1 - levelUpOpen) * levelUpPausedTime) ** 2;
        drawText(0, -70, "准备就绪", CSS_WHITE, (20 + 2 * sin(rawTime * 8)) * s);
        drawText(0, 70, "点击继续", CSS_WHITE, (13 + sin(rawTime * 4)) * s);
    }
    if (levelUpOpen > 0) {
        drawText(0, -100 - (gameHeight / 2) * (1 - levelUpOpen) ** 3, newItem ? "奖励!" : "新等级!", "#ff0", 20 + 2 * sin(rawTime * 8));
        if (newItem) {
            generateLevelUpParticles(lerp(1, 0, newItemSpinTime ** 5));
            const r = 200 * (1 - (1 - (1 - newItemSpinTime) ** 5));
            const i = round(r);
            const rr = 1 - (1 - newItemSpinTime) ** 2;
            upgradeCard(0, 0, 0, rolledUpgrades[i % rolledUpgrades.length], rr, 0);
            if (newItem - 1) {
                upgradeCard(-110, 0, 0, rolledUpgrades[(i + 1) % rolledUpgrades.length], rr, 0);
                upgradeCard(110, 0, 0, rolledUpgrades[(i + 2) % rolledUpgrades.length], rr, 0);
            }
            ctx.save();
            ctx.translate(0, 120);
            ctx.scale(5, 5);
            drawChest(rawTime * 4 + easeQuadOut(newItemSpinTime) * 100);
            ctx.restore();
            if (r < 0.2) {
                drawText(0, 100, "点击收集", "#0F0", 13 + sin(rawTime * 4));
                if (isAnyKeyDown()) {
                    pickCharItem(rolledUpgrades[i % rolledUpgrades.length]);
                    if (newItem - 1) {
                        pickCharItem(rolledUpgrades[(i + 1) % rolledUpgrades.length]);
                        pickCharItem(rolledUpgrades[(i + 2) % rolledUpgrades.length]);
                    }
                    pickLevelUp();
                }
            }
        }
        else {
            generateLevelUpParticles(0);
            upgradeCard(-110, 0, 0, rolledUpgrades[0], 1, 1);
            upgradeCard(0, 0, 1, rolledUpgrades[1], 1, 1);
            upgradeCard(110, 0, 2, rolledUpgrades[2], 1, 1);
            drawText(0, 110 + (gameHeight / 2) * (1 - levelUpOpen) ** 3, "选择一个升级", "#699", 13 + sin(rawTime * 4));
        }
    }
    ctx.restore();
};
const pickCharItem = (charItem) => {
    if (charItem != null) {
        let s = getSlotWithItem(charItem);
        if (s) {
            ++s._internal_level;
        }
        else {
            s = createSlotInstance(charItem);
            slots.push(s);
        }
        applySlotStats(s);
        applyItem(s);
        cat1._internal_deco |= 1 << charItem;
        ++cat1._internal_len;
    }
};
const addCatXp = (count) => {
    if (addXp(count)) {
        openLevelUpDelayed(0);
    }
};

let vpadStartX = 0;
let vpadStartY = 0;
let vpadX = 0;
let vpadY = 0;
let vpadDirX = 0;
let vpadDirY = 0;
let vPadOpen = 0;
const R1 = 64;
const R2 = 20;
const RM = 20;
const DR = R1 - R2;
const updateVPad = () => {
    if (pointerIsMouse) {
        vpadDirX = pointerX - gameWidth / 2;
        vpadDirY = pointerY - gameHeight / 2;
    }
    else {
        if (pointerDown) {
            vpadX = pointerX;
            vpadY = pointerY;
            vpadDirX = pointerX - gameWidth / 2;
            vpadDirY = pointerY - gameHeight / 2;
            const l = hypot(vpadDirX, vpadDirY);
            if (l > 0) {
                vpadDirX /= l;
                vpadDirY /= l;
            }
            vpadStartX = pointerX - DR * vpadDirX;
            vpadStartY = pointerY - DR * vpadDirY;
        }
        else if (pointerIsDown) {
            vpadX = pointerX;
            vpadY = pointerY;
            vpadDirX = pointerX - vpadStartX;
            vpadDirY = pointerY - vpadStartY;
            const l = hypot(vpadDirX, vpadDirY);
            if (l > 0) {
                vpadDirX /= l;
                vpadDirY /= l;
            }
            if (l < RM) {
                vpadDirX = 0;
                vpadDirY = 0;
            }
            if (l > DR) {
                // vpadStartX = pointerX - DR * vpadDirX;
                // vpadStartY = pointerY - DR * vpadDirY;
                vpadX = vpadStartX + DR * vpadDirX;
                vpadY = vpadStartY + DR * vpadDirY;
            }
        }
        vPadOpen = reach(vPadOpen, pointerIsDown, rawDeltaTime * 8);
    }
};
const drawVPad = (open) => {
    const o = open * vPadOpen;
    if (o > 0) {
        ctx.save();
        ctx.globalAlpha = o / 3;
        ctx.beginPath();
        ctx.arc(vpadStartX, vpadStartY, vPadOpen * R1, 0, TAU);
        ctx.setLineDash([5, 5]);
        ctx.strokeStyle = CSS_WHITE;
        ctx.lineWidth = 2;
        ctx.fillStyle = "#333";
        ctx.stroke();
        ctx.arc(vpadStartX, vpadStartY, vPadOpen * RM, 0, TAU, true);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(vpadX, vpadY, o * R2, 0, TAU);
        ctx.fillStyle = CSS_WHITE;
        ctx.fill();
        ctx.restore();
    }
};

let nightParticlesTimer = 0;
let snowParticlesTimer = 0;
let rainParticlesTimer = 0;
let night = 0;
let snowing = 0;
let raining = 0;
const updateWeatherColors = () => {
    raining =
        smoothstep(2 * 60, 2 * 60 + 5, playTime) -
            smoothstep(4 * 60 - 5, 4 * 60, playTime);
    snowing =
        smoothstep(6 * 60, 6 * 60 + 5, playTime) -
            smoothstep(7 * 60 - 5, 7 * 60, playTime);
    night =
        smoothstep(8 * 60, 8 * 60 + 5, playTime) -
            smoothstep(9 * 60 - 5, 9 * 60, playTime);
    updateColors(night, snowing, raining);
};
const updateWeatherParticles = () => {
    nightParticlesTimer += dt * 200 * night;
    while (nightParticlesTimer > 0) {
        weatherParticles.push({
            _internal_type: 2,
            _internal_x: lerp(visibleX0 - 20, visibleX1 + 40, random()),
            _internal_y: lerp(visibleY0 - 20, visibleY1 + 40, random()),
            _internal_vx: 50 * (random() - 0.5),
            _internal_vy: 50 * (random() - 0.5),
            _internal_r: 0,
            _internal_va: 1,
            _internal_t: 0,
            _internal_maxTime: 1 + random(),
            _internal_color: "rgba(255,255,100," + random() + ")",
            _internal_damp: 2,
            _internal_scale: random() / 8,
            _internal_sy: 1,
        });
        --nightParticlesTimer;
    }
    snowParticlesTimer += dt * 1000 * snowing;
    while (snowParticlesTimer > 0) {
        weatherParticles.push({
            _internal_type: 2,
            _internal_x: lerp(visibleX0 - 20, visibleX1 + 40, random()),
            _internal_y: lerp(visibleY0 - 50, visibleY1, random()),
            _internal_vx: 100 * (random() - 0.5),
            _internal_vy: 100 + 100 * random(),
            _internal_r: 0,
            _internal_va: 1,
            _internal_t: 0,
            _internal_maxTime: 1 + random(),
            _internal_color: CSS_WHITE,
            _internal_damp: 2,
            _internal_scale: random() / 8,
            _internal_sy: 1,
        });
        --snowParticlesTimer;
    }
    rainParticlesTimer += dt * 300 * raining;
    while (rainParticlesTimer > 0) {
        const big = random();
        weatherParticles.push({
            _internal_type: 5,
            _internal_x: lerp(visibleX0 - 20, visibleX1 + 40, random()),
            _internal_y: lerp(visibleY0 - 50, visibleY1, random()),
            _internal_vx: 75,
            _internal_vy: 200,
            _internal_r: 0,
            _internal_va: 1,
            _internal_t: 0,
            _internal_maxTime: 1 + big,
            _internal_color: "rgba(100,255,255," + random() / 4 + ")",
            _internal_damp: 2 * random(),
            _internal_scale: big / 4,
            _internal_sy: 1,
        });
        --rainParticlesTimer;
    }
};

const drawDebugStats = () => {
    let px = 0;
    let py = 80;
    const dy = 10;
    drawText(px, py, "最大生命值: " + getStat(6), CSS_WHITE, 8, 0);
    py += dy;
    drawText(px, py, "+经验: " + getStat(10), CSS_WHITE, 8, 0);
    py += dy;
    drawText(px, py, "护甲: " + getStat(12), CSS_WHITE, 8, 0);
    py += dy;
    drawText(px, py, "范围: " + getStat(3), CSS_WHITE, 8, 0);
    py += dy;
    drawText(px, py, "伤害: " + getStat(1), CSS_WHITE, 8, 0);
    py += dy;
    drawText(px, py, "子弹速度: " + getStat(2), CSS_WHITE, 8, 0);
    py += dy;
    drawText(px, py, "额外弹丸: " + getStat(0), CSS_WHITE, 8, 0);
    py += dy;
    drawText(px, py, "每秒再生 " + getStat(7), CSS_WHITE, 8, 0);
    py += dy;
    drawText(px, py, "武器速度修改 " + getStat(4), CSS_WHITE, 8, 0);
    py += dy;
    drawText(px, py, "幸运 " + getStat(11), CSS_WHITE, 8, 0);
    py += dy;
    drawText(px, py, "磁铁半径 " + getStat(9), CSS_WHITE, 8, 0);
    py += dy;
    drawText(px, py, "被动槽位 " + getStat(14), CSS_WHITE, 8, 0);
    py += dy;
    drawText(px, py, "武器槽位 " + getStat(13), CSS_WHITE, 8, 0);
    py += dy;
    drawText(px, py, "移动速度 " + getStat(8), CSS_WHITE, 8, 0);
    py += dy;
};

const doPause = () => !mainMenuActive && !winActive && cat1._internal_hp && openPauseScreen();
const initMain = () => {
    initZZFX();
    initSystem();
    initMusic();
    resetLevel();
    onblur = doPause;
    requestAnimationFrame(update);
};
let mainMenuActive = 1;
let mainMenuTime = 0;
let mainMenuIntroTime = 0;
let winTime = 0;
let winActive = 0;
let winTargetReached;
let winTargetX;
let winTargetY;
let winParticles = 0;
const describeBaseEnemy = (enemyType, hpMax, attrs) => ({
    _internal_enemyType: enemyType,
    _internal_hpMax: hpMax,
    _internal_damage: 5,
    _internal_radius: 5,
    ...attrs,
});
const describeBossBig = (base) => ({
    ...base,
    _internal_hpMax: base._internal_hpMax * 10,
    _internal_radius: base._internal_radius * 2,
    _internal_damage: base._internal_damage * 5,
    _internal_dropXp: -1,
});
const addEnemyObject = (x, y, attrs, _hp = (attrs._internal_hpMax * (1 + level / 5)) | 0) => enemies.push({
    _internal_type: 1,
    _internal_x: x,
    _internal_y: y,
    _internal_moveTime: 10 * random(),
    _internal_shadowSize: 1,
    _internal_hit: 0,
    _internal_attackTimer: 0,
    _internal_vx: 0,
    _internal_vy: 0,
    _internal_dropXp: (1 + playTime / 200) | 0,
    _internal_deadTime: 0,
    _internal_deadTimeMax: 0.5,
    _internal_distanceToPlayer: 100,
    _internal_color: 0x777777,
    _internal_variation: (random() * 3) | 0,
    _internal_kickBack: 0,
    _internal_stroke: 0,
    _internal_collisionLayer: 0,
    ...attrs,
    _internal_hpMax: _hp,
    _internal_hp: _hp,
    _internal_maxVelocity: (attrs._internal_enemyType === 0 ||
        attrs._internal_enemyType === 1
        ? 2
        : 1) *
        attrs._internal_maxVelocity *
        (1 + level / 100),
});
const spawnEnemyOutside = (enemy, dist = 1, a = random() * TAU, d = dist *
    (hypot(visibleX1 - visibleX0, visibleY1 - visibleY0) / 2 + enemy._internal_radius)) => addEnemyObject(cat1._internal_x0 + d * cos(a) + random(), cat1._internal_y0 + (d * sin(a)) / WORLD_SCALE_Y + random(), enemy);
const resetLevel = () => {
    winActive = 0;
    winTime = 0;
    mainMenuActive = 1;
    mainMenuIntroTime = 0;
    mainMenuTime = 0;
    initEntityArrays();
    resetStats();
    resetLevelUps();
    activeGenerators = [];
    levelEvents = [];
};
const startLevel = () => {
    startMusic();
    mainMenuActive = 0;
    // spawnEnemy(cat.x + 100, cat.y + 100, 1);
    for (let i = 0; i < 20; ++i) {
        const a = random() * TAU;
        const d = 50 + 100 * random();
        addDropItem(cat1._internal_x0 + d * cos(a), cat1._internal_y0 + d * sin(a), 0, 1);
    }
    pickCharItem(12);
    {
        const frog = describeBaseEnemy(0, 5, {
            _internal_maxVelocity: 15,
            _internal_deadTimeMax: 3,
            _internal_color: 0x0c663f,
        });
        const frog2 = describeBaseEnemy(0, 30, {
            _internal_maxVelocity: 20,
            _internal_deadTimeMax: 3,
            _internal_color: 0x446633,
            _internal_radius: 8,
        });
        const snowman = describeBaseEnemy(1, 20, {
            _internal_maxVelocity: 20,
            _internal_deadTimeMax: 3,
            _internal_color: COLORS[0],
        });
        const snowmanYellow = describeBaseEnemy(1, 30, {
            _internal_maxVelocity: 40,
            _internal_deadTimeMax: 3,
            _internal_radius: 3,
            _internal_damage: 10,
            _internal_color: 0xffffcc,
            _internal_color2: 0xff0000,
            _internal_stroke: 1,
        });
        const miceSmall = describeBaseEnemy(2, 5, {
            _internal_maxVelocity: 30,
            _internal_deadTimeMax: 3,
            _internal_radius: 3,
            _internal_color: 0xffeedd,
        });
        const mice = describeBaseEnemy(2, 10, {
            _internal_maxVelocity: 20,
            _internal_deadTimeMax: 3,
            _internal_radius: 5,
            _internal_color: 0x666655,
        });
        const fly = describeBaseEnemy(3, 5, {
            _internal_maxVelocity: 25,
            _internal_color: 0xcc99cc,
            _internal_color2: 0,
            _internal_collisionLayer: 1,
        });
        const fly_slow = describeBaseEnemy(3, 5, {
            _internal_maxVelocity: 15,
            _internal_color: 0xaaaa99,
            _internal_color2: 0x330000,
            _internal_radius: 7,
            _internal_collisionLayer: 1,
        });
        const flyBlack = describeBaseEnemy(3, 10, {
            _internal_maxVelocity: 25,
            _internal_radius: 4,
            _internal_color: 0x333333,
            _internal_color2: 0x999988,
            _internal_collisionLayer: 1,
        });
        const snakeYellow = describeBaseEnemy(4, 20, {
            _internal_maxVelocity: 30,
            _internal_radius: 7,
            _internal_color: 0,
            _internal_color2: 0xffff00,
        });
        const snake = describeBaseEnemy(4, 5, {
            _internal_maxVelocity: 40,
            _internal_radius: 5,
            _internal_color: 0,
            _internal_color2: 0,
        });
        const box = describeBaseEnemy(5, 5, {
            _internal_maxVelocity: 0,
            _internal_damage: 0,
            _internal_deadTimeMax: 0.01,
            _internal_color: 0xccaa66,
        });
        const boss_frog = describeBossBig(frog);
        const boss_fly = describeBossBig(fly);
        const boss_snowman = describeBossBig(snowman);
        const boss_snake = describeBossBig({ ...snakeYellow, _internal_color: 0xff0000 });
        const frog_naked = { ...frog, _internal_variation: 0 };
        // первая коробка x2
        spawnEnemyOutside(box, 0, random() * TAU, 100);
        spawnEnemyOutside(box, 0, random() * TAU, 100);
        levelEvents = [
            // все коробки в игре каждые 20 секунд
            {
                _internal_time: 0,
                _internal_spawnTime: 60 * 10,
                _internal_spawnCount: (60 * 10) / 20,
                _internal_enemies: [box],
            },
            // 0
            {
                _internal_time: 0,
                _internal_spawnTime: 60,
                _internal_spawnCount: 60,
                _internal_enemies: [fly_slow],
            },
            // 1 - босс
            {
                _internal_time: 60,
                _internal_enemies: [boss_fly],
            },
            {
                _internal_time: 60,
                _internal_spawnTime: 60,
                _internal_enemies: [flyBlack, fly_slow, frog_naked],
                _internal_spawnCount: 60,
            },
            // 2 - толпы слабых
            {
                _internal_time: 2 * 60,
                _internal_enemies: [flyBlack, fly, fly_slow, fly_slow, fly_slow],
                _internal_spawnTime: 60,
                _internal_spawnCount: 120,
            },
            // 3 - босс маленькая муха
            {
                _internal_time: 3 * 60,
                _internal_enemies: [describeBossBig(flyBlack)],
            },
            // 3 - толпы жаб
            {
                _internal_time: 3 * 60,
                _internal_spawnTime: 60,
                _internal_spawnCount: 120,
                _internal_enemies: [frog],
            },
            // 4 - босс ЖАБА
            {
                _internal_time: 4 * 60,
                _internal_enemies: [boss_frog],
            },
            // 4 - змей
            {
                _internal_time: 4 * 60,
                _internal_spawnTime: 60,
                _internal_spawnCount: 120,
                _internal_enemies: [snake, snake, snake, snakeYellow],
            },
            // 5 - босс ЗМЕЯ
            {
                _internal_time: 5 * 60,
                _internal_enemies: [boss_snake],
            },
            // 5 - змеи и толстые жабы, маленькие мухи
            {
                _internal_time: 5 * 60,
                _internal_spawnTime: 60,
                _internal_spawnCount: 120,
                _internal_enemies: [flyBlack, flyBlack, snakeYellow, frog2],
            },
            // 6 - зима
            {
                _internal_time: 6 * 60,
                _internal_spawnTime: 60,
                _internal_spawnCount: 120,
                _internal_enemies: [snowman],
            },
            {
                _internal_time: 6 * 60 + 30,
                _internal_spawnTime: 30,
                _internal_spawnCount: 30,
                _internal_enemies: [snowmanYellow],
            },
            {
                _internal_time: 6 * 60 + 30,
                _internal_enemies: [boss_snowman],
            },
            // 7 - лето
            // TODO:
            {
                _internal_time: 7 * 60,
                _internal_spawnTime: 60,
                _internal_spawnCount: 200,
                _internal_enemies: [mice, miceSmall],
            },
            {
                _internal_time: 7 * 60 + 30,
                _internal_enemies: [describeBossBig(mice)],
            },
            // 8 - ночь
            // TODO:
            {
                _internal_time: 8 * 60,
                _internal_spawnTime: 60,
                _internal_spawnCount: 250,
                _internal_enemies: [snakeYellow, frog2],
            },
            {
                _internal_time: 8 * 60 + 30,
                _internal_enemies: [describeBossBig(snowmanYellow)],
            },
            // 9 - конец (всех навалить)
            {
                _internal_time: 9 * 60,
                _internal_spawnTime: 60,
                _internal_spawnCount: 300,
                _internal_enemies: [
                    frog,
                    frog2,
                    snowman,
                    snowmanYellow,
                    snakeYellow,
                    snake,
                    fly,
                    flyBlack,
                    mice,
                    miceSmall,
                ],
            },
            {
                _internal_time: 9 * 60,
                _internal_spawnTime: 60,
                _internal_spawnCount: 3,
                _internal_enemies: [boss_fly, boss_frog, boss_snake, boss_snowman],
            },
            // 00:00 -> 01:00
            // {
            //   time: 1,
            //   spawnTime: 1,
            //   spawnCount: 10,
            //   enemies: [fly],
            // },
            // {
            //   time: 10,
            //   spawnTime: 40,
            //   spawnCount: 30,
            //   enemies: [miceSmall, fly],
            // },
            // {
            //   time: 30,
            //   spawnTime: 30,
            //   spawnCount: 30,
            //   enemies: [frog, fly],
            // },
            // {
            //   time: 60,
            //   spawnTime: 0,
            //   spawnCount: 1,
            //   enemies: [boss_frog],
            // },
            // {
            //   time: 60,
            //   spawnTime: 1,
            //   spawnCount: 30,
            //   enemies: [frog],
            // },
            // rest of the game until win
            // {
            //   time: 60 + 30,
            //   spawnTime: 60 * 10 - 30 - 60,
            //   spawnCount: 600,
            //   enemies: [
            //     frog,
            //     frog2,
            //     snowman,
            //     snowmanYellow,
            //     snakeYellow,
            //     snake,
            //     fly,
            //     flyBlack,
            //     mice,
            //     miceSmall,
            //   ],
            // },
            // {
            //   time: 60 * 2,
            //   spawnTime: 8 * 60,
            //   spawnCount: 8,
            //   enemies: [boss_fly, boss_frog, boss_snake, boss_snowman],
            // },
        ];
    }
};
let activeGenerators;
let levelEvents;
const startGenerator = (enemies, duration, count = 1) => activeGenerators.push({
    _internal_t: duration,
    _internal_period: duration / count,
    _internal_timeAcc: 0,
    _internal_enemies: enemies,
});
const updateLevelProgress = () => {
    for (const ev of levelEvents) {
        if (playTime >= ev._internal_time) {
            if (ev._internal_spawnTime) {
                startGenerator(ev._internal_enemies, ev._internal_spawnTime, ev._internal_spawnCount);
            }
            else {
                for (let i = 0, a = random() * TAU; i < (ev._internal_spawnCount || 1); ++i) {
                    spawnEnemyOutside(pickRandom(ev._internal_enemies), ev._internal_dist, a);
                }
            }
        }
    }
    activeGenerators = activeGenerators.filter((gen) => gen._internal_t > 0);
    levelEvents = levelEvents.filter((ev) => playTime < ev._internal_time);
    for (const gen of activeGenerators) {
        gen._internal_t -= dt;
        let n = ((gen._internal_timeAcc += dt) / gen._internal_period) | 0;
        gen._internal_timeAcc -= gen._internal_period * n;
        while (n-- > 0) {
            spawnEnemyOutside(pickRandom(gen._internal_enemies));
        }
    }
    if (playTime >= 60 * 10) {
        win();
    }
};
const updateHitCounter = (entity) => {
    if (entity._internal_hit > 0) {
        entity._internal_hit = max(0, entity._internal_hit - rawDeltaTime * 4);
    }
};
const addCatHitParticles = (n) => {
    for (let i = 0; i < n; ++i) {
        const d = random() * 200;
        const a = random() * TAU;
        groundParticles.push({
            _internal_type: 1,
            _internal_x: cat1._internal_radius * cos(a) + cat1._internal_x,
            _internal_y: (cat1._internal_radius * sin(a) + cat1._internal_y) * WORLD_SCALE_Y,
            _internal_vx: d * cos(a),
            _internal_vy: d * sin(a) * WORLD_SCALE_Y,
            _internal_r: 0,
            _internal_va: 1,
            _internal_t: 0,
            _internal_maxTime: 0.05 + 0.5 * random(),
            _internal_color: CSS_BLACK,
            _internal_scale: 0.1 + 0.3 * random(),
            _internal_sy: 1,
            _internal_damp: 9,
        });
    }
};
const updateCatWinPath = (cat, offsetX) => {
    cat._internal_moveDirection = atan2(winTargetY - cat._internal_y0, winTargetX + offsetX - cat._internal_x0);
    cat._internal_moveSpeed =
        hypot(winTargetY - cat._internal_y0, winTargetX + offsetX - cat._internal_x0) > 1 ? 1 : 0;
    cat._internal_vx = 20 * cos(cat._internal_moveDirection) * cat._internal_moveSpeed;
    cat._internal_vy = 20 * sin(cat._internal_moveDirection) * cat._internal_moveSpeed;
};
const updatePlayerCat = (cat) => {
    if (cat._internal_hp > 0) {
        // update hp
        const dhp = getStat(6) - cat._internal_hpMax;
        if (dhp > 0) {
            cat._internal_hpMax += dhp;
            cat._internal_hp += dhp;
        }
        cat._internal_hp = min(cat._internal_hpMax, cat._internal_hp + dt * getStat(7));
        if (!winActive) {
            if (mainMenuActive) {
                cat._internal_moveDirection = (sin(time * PI) * PI) / 6 + PI / 4;
                cat._internal_moveSpeed = 1;
            }
            else {
                const kdx = (keyboardIsDown["ArrowRight"] | keyboardIsDown["KeyD"]) -
                    (keyboardIsDown["ArrowLeft"] | keyboardIsDown["KeyA"]);
                const kdy = (keyboardIsDown["ArrowDown"] | keyboardIsDown["KeyS"]) -
                    (keyboardIsDown["ArrowUp"] | keyboardIsDown["KeyW"]);
                const isKeyboard = kdx || kdy;
                const jdx = isKeyboard ? kdx : vpadDirX;
                const jdy = isKeyboard ? kdy : vpadDirY;
                cat._internal_moveDirection = atan2(jdy, jdx);
                cat._internal_moveSpeed =
                    pointerIsDown || isKeyboard ? min(1, hypot(jdy, jdx)) : 0;
            }
            const moveVelocity = getStat(8) * cat._internal_moveSpeed;
            cat._internal_vx = moveVelocity * cos(cat._internal_moveDirection);
            cat._internal_vy = moveVelocity * sin(cat._internal_moveDirection);
        }
    }
    else {
        const c = (cat._internal_deadTime ** 2 * 8) | 0;
        cat._internal_deadTime += dt;
        if (c != ((cat._internal_deadTime ** 2 * 8) | 0) && c < 8) {
            cat._internal_hit = 1;
            cat._internal_moveDirection = random() * PI;
            cat._internal_x1 += (random() - 0.5) * 50;
            cat._internal_y1 += (random() - 0.5) * 50;
            playSound(3);
            playSound(4);
            playSound(5);
            shakeCamera(1);
            sleepGame(0.1);
            addCatHitParticles(30);
            if (c === 7) {
                const a = random() * TAU;
                cat._internal_vx = 200 * cos(a);
                cat._internal_vy = 200 * sin(a);
            }
        }
        cat._internal_vx *= exp(-4 * dt);
        cat._internal_vy *= exp(-4 * dt);
    }
};
const updateCat = (cat) => {
    updateHitCounter(cat);
    cat._internal_wobble = reach(cat._internal_wobble, 0, rawDeltaTime * 4);
    cat._internal_x0 += cat._internal_vx * dt;
    cat._internal_y0 += cat._internal_vy * dt;
    {
        let dx = cat._internal_x0 - cat._internal_x1;
        let dy = cat._internal_y0 - cat._internal_y1;
        const len = hypot(dx, dy);
        if (len > 0) {
            dx *= 1 / len;
            dy *= 1 / len;
            cat._internal_x1 = cat._internal_x0 - (8 + cat._internal_len / 4) * dx;
            cat._internal_y1 = cat._internal_y0 - (8 + cat._internal_len / 4) * dy;
        }
    }
    {
        let dx = cat._internal_x0 - cat._internal_x2;
        let dy = cat._internal_y0 - cat._internal_y2;
        const len = hypot(dx, dy);
        if (len > 0) {
            dx *= 1 / len;
            dy *= 1 / len;
            cat._internal_x2 = cat._internal_x1 - (10 + cat._internal_len / 8) * dx;
            cat._internal_y2 = cat._internal_y1 - (10 + cat._internal_len / 8) * dy;
        }
    }
    {
        let dx = cat._internal_x2 - cat._internal_x3;
        let dy = cat._internal_y2 - cat._internal_y3;
        const len = hypot(dx, dy);
        if (len > 0) {
            dx *= 1 / len;
            dy *= 1 / len;
            cat._internal_x3 = cat._internal_x2 - 10 * dx;
            cat._internal_y3 = cat._internal_y2 - 10 * dy;
        }
    }
    cat._internal_x = (cat._internal_x1 + cat._internal_x0) / 2;
    cat._internal_y = (cat._internal_y1 + cat._internal_y0) / 2;
};
const updateDropsForCat = (cat) => {
    for (let i = 0; i < drops.length; ++i) {
        const drop = drops[i];
        const dx = cat._internal_x - drop._internal_x;
        const dy = cat._internal_y - drop._internal_y;
        const l = hypot(dx, dy);
        drop._internal_captureTime = reach(drop._internal_captureTime, drop._internal_captured, dt * 4);
        if (drop._internal_captured) {
            if (cat._internal_hp > 0) {
                if (l < cat._internal_radius) {
                    drops.splice(i--, 1);
                    if (!winActive) {
                        if (drop._internal_item === 0) {
                            addCatXp(drop._internal_count * getStat(10));
                        }
                        else if (drop._internal_item === 1) {
                            const dhp = 5 * level * drop._internal_count;
                            cat._internal_hp = min(cat._internal_hpMax, cat._internal_hp + dhp);
                            addTextParticle(cat._internal_x, cat._internal_y, "+" + dhp + "hp", "#9F3");
                        }
                        else if (drop._internal_item === 2) {
                            for (const drop of drops) {
                                drop._internal_captured = 1;
                            }
                        }
                        else if (drop._internal_item === 3) {
                            for (const enemy of enemies) {
                                if (enemy._internal_hp > 0 &&
                                    testVisible(enemy._internal_x, enemy._internal_y * WORLD_SCALE_Y, 0)) {
                                    hitEnemy(enemy, enemy._internal_hp);
                                }
                            }
                            shakeCamera(4);
                        }
                        else if (drop._internal_item === 4) {
                            openLevelUpDelayed(1 + +chance(0.3));
                        }
                    }
                    playSound(2);
                    cat._internal_wobble = 1;
                    for (let i = 0; i < 10; ++i) {
                        const a = random() * TAU;
                        const d = random() ** 0.5 * 100;
                        overlayParticles.push({
                            _internal_type: 2,
                            _internal_x: drop._internal_x,
                            _internal_y: drop._internal_y * WORLD_SCALE_Y - 6,
                            _internal_vx: cat._internal_vx + d * cos(a),
                            _internal_vy: cat._internal_vy + d * sin(a) * WORLD_SCALE_Y,
                            _internal_r: random() * TAU,
                            _internal_damp: 6,
                            _internal_t: 0,
                            _internal_va: 0,
                            _internal_maxTime: 0.1 + random() * 0.2,
                            _internal_color: calcBaseColor(drop._internal_color, 0.3),
                            _internal_sy: 1,
                            _internal_scale: 1,
                        });
                    }
                }
                else {
                    if (drop._internal_captureTime >= 1) {
                        drop._internal_vx = drop._internal_vx * exp(-9 * dt) + 5000 * dt * (dx / l);
                        drop._internal_vy = drop._internal_vy * exp(-9 * dt) + 5000 * dt * (dy / l);
                        const maxLimit = l / (hypot(drop._internal_vx, drop._internal_vy) * dt);
                        if (maxLimit < 1) {
                            drop._internal_vx *= maxLimit;
                            drop._internal_vy *= maxLimit;
                        }
                        drop._internal_x += drop._internal_vx * dt;
                        drop._internal_y += drop._internal_vy * dt;
                    }
                }
            }
            else {
                drop._internal_captured = 0;
            }
        }
        else {
            drop._internal_captured = 0;
            if (cat._internal_hp > 0 && l < getStat(9)) {
                drop._internal_captured = 1;
            }
            else {
                drop._internal_vx = drop._internal_vx * exp(-dt * 4);
                drop._internal_vy = drop._internal_vy * exp(-dt * 4);
                drop._internal_x += drop._internal_vx * dt;
                drop._internal_y += drop._internal_vy * dt;
            }
        }
        if (testVisible(drop._internal_x, drop._internal_y * WORLD_SCALE_Y, drop._internal_radius * 4)) {
            objectsToDraw.push(drop);
        }
    }
};
const checkBodyCollision = (a, b) => {
    if (a._internal_collisionLayer === b._internal_collisionLayer) {
        const nx = a._internal_x - b._internal_x;
        const ny = a._internal_y - b._internal_y;
        const l = hypot(nx, ny);
        const D = a._internal_radius + b._internal_radius;
        if (l < D) {
            if (l > 0) {
                const pen = (D / l - 1) / 2;
                a._internal_x += (nx * pen) / a._internal_radius;
                a._internal_y += (ny * pen) / a._internal_radius;
                b._internal_x -= (nx * pen) / b._internal_radius;
                b._internal_y -= (ny * pen) / b._internal_radius;
            }
            else {
                a._internal_x += random();
                a._internal_y += random();
                b._internal_x -= random();
                b._internal_y -= random();
            }
        }
    }
    // const sqrDist = nx * nx + ny * ny;
    // const D = a.radius + b.radius;
    // if (sqrDist > 0 && sqrDist < D * D) {
    //   const pen = (D / sqrt(sqrDist) - 1) / 2;
    //   const scale = 1 * pen;
    //   a.x += nx * scale;
    //   a.y += ny * scale;
    //   b.x -= nx * scale;
    //   b.y -= ny * scale;
    // }
};
const checkCatsCollision = (a, b) => {
    const nx = a._internal_x - b._internal_x;
    const ny = a._internal_y - b._internal_y;
    // const sqrDist = nx * nx + ny * ny;
    // const D = a.radius + b.radius;
    // if (sqrDist > 0 && sqrDist < D * D) {
    //   const pen = (D / sqrt(sqrDist) - 1) / 2;
    //   const scale = 1 * pen;
    //   a.x += nx * scale;
    //   a.y += ny * scale;
    //   b.x -= nx * scale;
    //   b.y -= ny * scale;
    // }
    const l = hypot(nx, ny);
    const D = a._internal_radius + b._internal_radius;
    if (l > 0 && l < D) {
        const pen = (D / l - 1) / 2;
        a._internal_x0 += nx * pen;
        // a.x = a.x * (1 + pen) - b.x * pen;
        a._internal_y0 += ny * pen;
        b._internal_x0 -= nx * pen;
        // b.x = b.x * (1 + pen) - a.x * pen;
        b._internal_y0 -= ny * pen;
    }
};
const drawCat = (cat) => {
    const color = css_rgba(lerp_rgb(cat._internal_color, COLORS[0], easeQuadOut(cat._internal_hit)));
    const deadState = clamp(1.5 * (cat._internal_deadTime - 1));
    const z = -40 * abs(sin(deadState * TAU)) * (1 - deadState) + deadState * 5;
    const move = -cos(cat._internal_moveDirection);
    const moveVelocity = (getStat(8) * cat._internal_moveSpeed) / 30;
    const moveX = cos(cat._internal_moveDirection) * moveVelocity;
    const moveY = sin(cat._internal_moveDirection) * moveVelocity;
    const tailX = cat._internal_x1 - cat._internal_x0;
    const tailY = (cat._internal_y1 - cat._internal_y0) * WORLD_SCALE_Y;
    ctx.save();
    ctx.translate(cat._internal_x0, cat._internal_y0 * WORLD_SCALE_Y + z);
    ctx.scale(1 + 0.2 * cos(time * 32) * cat._internal_wobble, 1 + 0.2 * sin(time * 32) * cat._internal_wobble);
    // draw head
    ctx.lineCap = "butt";
    ctx.lineJoin = "round";
    ctx.lineWidth = 10;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(move * 2, -15);
    ctx.quadraticCurveTo(0, -10, 0, -5);
    ctx.quadraticCurveTo(0 + tailX * 0.5, -5 + tailY * 0.5, tailX, -5 + tailY);
    ctx.stroke();
    fillCircle(tailX, tailY - 5, 5, color);
    {
        ctx.lineCap = "round";
        const tx = cat._internal_x2 - cat._internal_x1;
        const ty = (cat._internal_y2 - cat._internal_y1) * WORLD_SCALE_Y;
        const tx2 = cat._internal_x3 - cat._internal_x2;
        const ty2 = (cat._internal_y3 - cat._internal_y2) * WORLD_SCALE_Y;
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.moveTo(tailX, tailY - 7);
        ctx.quadraticCurveTo(tailX + tx, tailY + ty, tailX + tx + tx2, tailY + ty + ty2);
        // ctx.lineTo(tailX + cat2X - tailEndX, tailY + 8 + cat2Y - tailEndY);
        ctx.stroke();
    }
    {
        ctx.beginPath();
        const df = PI / 2;
        const handsUp = deadState * 2;
        const handsUpX = deadState * 4;
        const mx = (1 - deadState) * (-0.5 * moveX * cat._internal_moveSpeed);
        const my = (1 - deadState) * 3 * cat._internal_moveSpeed;
        const mt = time * 8 * moveVelocity;
        let c1 = -handsUpX + mx * cos(mt);
        let c2 = my * sin(mt);
        ctx.moveTo(-3, -5 + deadState * 3);
        ctx.lineTo(-3 + c1, 1 - max(0, c2) - handsUp);
        c1 = handsUpX + mx * cos(mt + 2 * df);
        c2 = my * sin(mt + 2 * df);
        ctx.moveTo(3, -5 + deadState * 3);
        ctx.lineTo(3 + c1, 1 - max(0, c2) - handsUp);
        c1 = -handsUpX + mx * cos(mt + df);
        c2 = my * sin(mt + df);
        ctx.moveTo(tailX - 3, tailY - 5 + deadState * 3);
        ctx.lineTo(tailX - 3 + c1, tailY + 1 - max(0, c2) - handsUp);
        c1 = handsUpX + mx * cos(mt + 3 * df);
        c2 = my * sin(mt + 3 * df);
        ctx.moveTo(tailX + 3, tailY - 5 + deadState * 3);
        ctx.lineTo(tailX + 3 + c1, tailY + 1 - max(0, c2) - handsUp);
        ctx.lineWidth = 3;
        ctx.lineCap = "round";
        ctx.stroke();
    }
    ctx.save();
    ctx.fillStyle = color;
    ctx.translate(0, -15);
    ctx.rotate(move / 3);
    ctx.translate(move * 2, 0);
    ctx.beginPath();
    ctx.moveTo(-5, 0);
    ctx.lineTo(-4, -5);
    ctx.lineTo(-1, 0);
    ctx.lineTo(1, 0);
    ctx.lineTo(4, -5);
    ctx.lineTo(5, 0);
    ctx.fill();
    if (moveY >= 0) {
        const off = move * 2;
        if (cat._internal_deadTime < 1 && !cat._internal_hit) {
            if (cat._internal_deco & ((1 << 11) | (1 << 10))) {
                const cc = bwColor(0.5 + 0.3 * sin(move * TAU * 2 + time));
                fillCircle(3 - off, 5, 2, cc);
                fillCircle(-3 - off, 5, 2, cc);
                ctx.fillRect(-3 - off, 3, 6, 1);
            }
            else {
                fillCircle(3 - off, 5, 2, CSS_WHITE);
                fillCircle(-3 - off, 5, 2, CSS_WHITE);
                fillCircle(3 - off, 5, 0.5, CSS_BLACK);
                fillCircle(-3 - off, 5, 0.5, CSS_BLACK);
            }
        }
        else {
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = CSS_WHITE;
            ctx.moveTo(-2.5 - off - 1, 5 - 1);
            ctx.lineTo(-2.5 - off + 1, 5 + 1);
            ctx.moveTo(-2.5 - off + 1, 5 - 1);
            ctx.lineTo(-2.5 - off - 1, 5 + 1);
            ctx.moveTo(2.5 - off - 1, 5 - 1);
            ctx.lineTo(2.5 - off + 1, 5 + 1);
            ctx.moveTo(2.5 - off + 1, 5 - 1);
            ctx.lineTo(2.5 - off - 1, 5 + 1);
            ctx.stroke();
        }
        // mouth
        if (cat._internal_deco & (1 << 9)) {
            ctx.beginPath();
            ctx.lineWidth = 0.4;
            ctx.lineCap = "round";
            ctx.strokeStyle = "pink";
            ctx.moveTo(-1.5 - off, 11 - 2);
            ctx.quadraticCurveTo(-1 - off, 12 - 2, 0 - off, 10 - 3);
            ctx.quadraticCurveTo(1 - off, 12 - 2, 1.5 - off, 11 - 2);
            ctx.stroke();
        }
        // nose
        fillCircle(-off, 12 - 5, 0.5, "pink");
        ctx.fillStyle = color;
    }
    else {
        fillCircle(3 - move * 2, 5, 2, color);
        fillCircle(-3 - move * 2, 5, 2, color);
    }
    ctx.restore();
    ctx.restore();
};
// let _prev = 0;
let update = (_T) => {
    requestAnimationFrame(update);
    // if (_T - _prev < 1000 / 60) return;
    // _prev = _T;
    beginFrame(_T / 1000);
    resetSounds();
    initTempArrays();
    if (winActive) {
        updateCatWinPath(cat1, 10);
        updateCatWinPath(cat2, -10);
    }
    updatePlayerCat(cat1);
    updateCat(cat1);
    const hasCat2 = winActive;
    if (hasCat2) {
        objectsToDraw.push(cat2);
        updateCat(cat2);
        checkCatsCollision(cat2, cat1);
    }
    updateWeatherColors();
    // begin draw
    ctx.fillStyle = calcBaseColor(COLORS[1]);
    ctx.fillRect(0, 0, gameWidth, gameHeight);
    // calc camera before update enemies ()
    let scale = lerp(lerp(2, 4, mainMenuTime ** 2), 4, clamp((cat1._internal_deadTime * (1 + cat1._internal_hit / 4)) ** 2));
    if (winActive) {
        const t = clamp(winTime / 2) ** 0.5;
        beginCamera(lerp(cat1._internal_x0, winTargetX, t), lerp(cat1._internal_y0, winTargetY, t) * WORLD_SCALE_Y, scale);
    }
    else {
        beginCamera(cat1._internal_x0, cat1._internal_y0 * WORLD_SCALE_Y, scale);
    }
    updateDropsForCat(cat1);
    updateEnemies();
    updateProjectiles();
    if (winActive) {
        updateWinState();
    }
    else if (!mainMenuActive && cat1._internal_hp > 0) {
        if (__LOCAL_DEV_SERVER__) {
            handleCheats();
        }
        if (addPlayTime(dt, 60 * 10)) {
            win();
        }
        setMusicProgress(playTime);
        updateWeapons();
        updateLevelProgress();
    }
    mainMenuTime = reach(mainMenuTime, mainMenuActive, dt * 4);
    mainMenuIntroTime += dt * 2;
    if (mainMenuActive && isAnyKeyDown() && mainMenuIntroTime > 2) {
        startLevel();
    }
    updateVPad();
    drawGround();
    if (mainMenuIntroTime < 2) {
        const t = clamp(mainMenuIntroTime - 1);
        ctx.fillStyle = "rgba(0,0,0," + (1 - t ** 3) + ")";
        ctx.fillRect(visibleX0, visibleY0, visibleX1 - visibleX0, visibleY1 - visibleY0);
    }
    else if (cat1._internal_deadTime > 0) {
        const t = lerp(clamp(cat1._internal_deadTime / 2), 1, cat1._internal_hit);
        ctx.fillStyle = "rgba(0,0,0," + 0.8 * t ** 2 + ")";
        ctx.fillRect(visibleX0 - 10, visibleY0 - 10, visibleX1 - visibleX0 + 20, visibleY1 - visibleY0 + 20);
    }
    objectsToDraw.sort((a, b) => a._internal_collisionLayer - b._internal_collisionLayer || a._internal_y - b._internal_y);
    // ctx.globalAlpha = 0.2;
    drawShadows();
    {
        const slot = getSlotWithItem(18);
        if (slot) {
            const radius = sin(time * 16) / 2 +
                (20 * getWeaponStat(slot, 3)) / 10;
            ctx.strokeStyle = "#c96";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.ellipse(cat1._internal_x, cat1._internal_y * WORLD_SCALE_Y, radius, radius * WORLD_SCALE_Y, 0, 0, TAU);
            ctx.stroke();
        }
    }
    // ctx.globalAlpha = 1;
    updateAndDrawParticles(groundParticles);
    const drawers = [drawCat, drawEnemy, drawDrop, drawProjectile];
    for (const obj of objectsToDraw) {
        drawers[obj._internal_type](obj);
    }
    if (!mainMenuActive && cat1._internal_hp > 0 && !winActive) {
        drawHealthBar();
    }
    // ctx.save();
    // ctx.translate(cat.x, cat.y * WORLD_SCALE_Y);
    // drawChest();
    // ctx.restore();
    updateAndDrawParticles(overlayParticles);
    if (!mainMenuActive) {
        drawTextParticles();
    }
    ctx.restore();
    beginCamera(1.1 * cat1._internal_x0, 1.1 * cat1._internal_y0 * WORLD_SCALE_Y, scale);
    updateWeatherParticles();
    updateAndDrawParticles(weatherParticles);
    ctx.restore();
    drawVPad(1 - mainMenuTime ** 2);
    drawScreenDimming();
    if (levelUpOpen > 0) {
        doLevelUpParticles();
    }
    drawXpBar();
    levelUpScreen();
    if (keyboardDown["Escape"]) {
        doPause();
    }
    if (mainMenuTime > 0) {
        if (mainMenuIntroTime < 1) {
            ctx.fillStyle = "rgba(0,0,0," + (1 - mainMenuTime ** 3) + ")";
            ctx.fillRect(0, 0, gameWidth, gameHeight);
        }
        const t = clamp(mainMenuIntroTime - 1);
        const st = (t * mainMenuTime) ** 2;
        ctx.save();
        ctx.translate(gameWidth / 2, (st * gameHeight) / 2 - 120);
        // ctx.rotate(sin(time * 9) * 0.1);
        drawText(0, 0, "QRCat--曲睿爱猫", CSS_WHITE, 24 + 2 * sin(time * 8));
        ctx.restore();
        if (sin(time * 8) >= 0) {
            drawText(gameWidth / 2, gameHeight / 2 + 100 + ((1 - st) * gameHeight) / 2, "点击开始", CSS_WHITE, 15);
            drawText(gameWidth / 2, gameHeight / 2 + 130 + ((1 - st) * gameHeight) / 2, "欢迎大家关注网易云音乐人--篮筐上的蜂咪", CSS_WHITE, 12);
        }
    }
    ctx.save();
    ctx.translate(gameWidth / 2, gameHeight / 2);
    if (!mainMenuActive) {
        if (cat1._internal_deadTime > 0) {
            drawEndScreen(clamp(cat1._internal_deadTime - 1), "游戏结束", "#e50");
        }
        else if (winActive) {
            winTime += rawDeltaTime;
            drawEndScreen(clamp(winTime - 5), "你赢了", "#ff3");
        }
    }
    ctx.restore();
    endFrame();
};
const drawStats = (scale, x = 0, y = 40, t = time) => [
    "时间: " + formatMMSS(playTime),
    "击杀: " + frags,
    "等级: " + (level + 1),
].map((text) => drawText(x, (y += 20), text, "#ddd", scale * (10 + Math.sin((t += 1) * 8))));
const drawEndScreen = (t, msg, msgColor, st = t ** 2, hst = (gameHeight * (1 - st)) / 2) => {
    if (t > 0) {
        drawText(0, -80 - hst, msg, msgColor, 26 + 2 * sin(time * 8));
        ctx.fillStyle = "#888";
        ctx.fillStyle = css_rgba(COLORS[0], 0.2);
        ctx.fillRect(-80, 130 + hst - 20, 160, 30);
        drawText(0, 130 + hst, "点击继续", CSS_WHITE, 16 + sin(time * 4));
        drawStats(st);
        if (t >= 1 && isAnyKeyDown()) {
            resetLevel();
        }
    }
};
const drawProjectile = (proj) => {
    const startScale = (min(1, proj._internal_time * 8) * min(1, (proj._internal_timeMax - proj._internal_time) * 8)) ** 2;
    ctx.save();
    if (proj._internal_gfx === 17) {
        ctx.translate(proj._internal_x, proj._internal_y * WORLD_SCALE_Y - 8);
        ctx.scale(startScale * (1 + sin(proj._internal_time * 13) / 8), (startScale * (1 + cos(proj._internal_time * 19) / 8)) / 2);
        ctx.rotate(proj._internal_time * 8);
        ctx.beginPath();
        ctx.moveTo(-proj._internal_radius, 0);
        ctx.lineTo(proj._internal_radius, 0);
        ctx.moveTo(0, -proj._internal_radius);
        ctx.lineTo(0, proj._internal_radius);
        ctx.strokeStyle = "#CFF";
        ctx.lineWidth = 1;
        ctx.stroke();
    }
    else if (proj._internal_gfx === 14) {
        ctx.translate(proj._internal_x, proj._internal_y * WORLD_SCALE_Y - 6);
        ctx.scale(1.5 * Math.sign(proj._internal_vx) * startScale * (1 + sin(proj._internal_time * 13) / 8), 1.5 * startScale * (1 + cos(proj._internal_time * 19) / 8));
        ctx.rotate(proj._internal_time * 8);
        ctx.beginPath();
        ctx.moveTo(-proj._internal_radius, -1);
        ctx.lineTo(proj._internal_radius / 2, 0);
        ctx.lineTo(proj._internal_radius / 2, 2);
        ctx.quadraticCurveTo(proj._internal_radius / 4, 3, 0, 2);
        // ctx.lineTo(0, 2);
        ctx.lineTo(0, 0);
        ctx.closePath();
        // ctx.arc(proj.radius / 2, 0, proj.radius / 2, PI, TAU, true);
        // ctx.roundRect(0, 0, proj.radius / 2, 2, 0.5);
        ctx.fillStyle = "#C66";
        ctx.strokeStyle = "#621";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fill();
    }
    else if (proj._internal_gfx === 13) {
        const sc = proj._internal_radius / 6;
        {
            const a = random() * TAU;
            const d = startScale * random() ** 0.5 * (proj._internal_radius / 2);
            const x = proj._internal_x + d * cos(a);
            const y = proj._internal_y * WORLD_SCALE_Y + d * sin(a);
            groundParticles.push({
                _internal_type: 2,
                _internal_x: x,
                _internal_y: y - proj._internal_radius * 2,
                _internal_vx: random() * 10 * (x - proj._internal_x),
                _internal_vy: random() * 10 * (y - proj._internal_y * WORLD_SCALE_Y),
                _internal_r: random() * TAU,
                _internal_damp: 6,
                _internal_t: 0,
                _internal_va: 0,
                _internal_maxTime: 0.1 + random() * 0.3,
                _internal_color: "#F30",
                _internal_scale: sc,
                _internal_sy: 1,
            });
        }
        {
            const a = random() * TAU;
            const d = random() ** 0.5 * (proj._internal_radius / 2);
            const x = proj._internal_x + d * cos(a);
            const y = proj._internal_y * WORLD_SCALE_Y + d * sin(a);
            overlayParticles.push({
                _internal_type: 2,
                _internal_x: x,
                _internal_y: y - proj._internal_radius * 2,
                _internal_vx: proj._internal_vx + random() * 10 * (x - proj._internal_x),
                _internal_vy: proj._internal_vy + random() * 10 * (y - proj._internal_y * WORLD_SCALE_Y),
                _internal_r: random() * TAU,
                _internal_damp: 9,
                _internal_t: 0,
                _internal_va: 0,
                _internal_maxTime: 0.1 + random() * 0.2,
                _internal_color: "#F90",
                _internal_scale: sc,
                _internal_sy: 1,
            });
        }
        // ctx.save();
        // ctx.translate(proj.x, proj.y * WORLD_SCALE_Y - proj.radius * 2);
        // ctx.scale(
        // 1 + sin(proj.time * 13) / 8,
        // 1 + cos(proj.time * 19) / 8
        // );
        // ctx.beginPath();
        // ctx.arc(0, 0, proj.radius, 0, TAU);
        // ctx.strokeStyle = "#ff9";
        // ctx.fillStyle = "#f90";
        // ctx.fill();
        // ctx.stroke();
        // ctx.restore();
    }
    else if (proj._internal_gfx === 20) {
        ctx.translate(proj._internal_x, proj._internal_y * WORLD_SCALE_Y);
        ctx.scale(startScale * (1 + sin(proj._internal_time * 13) / 8), startScale * (1 + cos(proj._internal_time * 19) / 8));
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.strokeStyle = "#EFF";
        const d = random() * proj._internal_damageRadius;
        const a = random() * TAU;
        let lx = d * cos(a);
        let ly = d * sin(a) * WORLD_SCALE_Y;
        ctx.moveTo(lx, ly);
        for (let i = 1; i >= 0; i -= 0.05) {
            lx += 20 * (random() - 0.5);
            ly -= 4 + 10 * random();
            ctx.lineTo(lx * i ** 8 + 2 * (random() - 0.5), ly);
        }
        ctx.stroke();
    }
    else if (proj._internal_gfx === 12) {
        ctx.translate(proj._internal_x, proj._internal_y * WORLD_SCALE_Y - proj._internal_radius * 2);
        ctx.scale(startScale * (1 + sin(proj._internal_time * 13) / 8), startScale * (1 + cos(proj._internal_time * 19) / 8));
        ctx.beginPath();
        ctx.arc(0, 0, proj._internal_radius, 0, TAU);
        ctx.strokeStyle = "#CFF";
        ctx.fillStyle = "#CEF";
        ctx.fill();
        ctx.stroke();
    }
    else if (proj._internal_gfx === 15) {
        ctx.translate(proj._internal_x, proj._internal_y * WORLD_SCALE_Y - proj._internal_radius * 2);
        ctx.scale(startScale * (1 + sin(proj._internal_time * 13) / 8), startScale * (1 + cos(proj._internal_time * 19) / 8));
        ctx.rotate(atan2(proj._internal_vy * WORLD_SCALE_Y, proj._internal_vx));
        ctx.beginPath();
        ctx.moveTo(-proj._internal_radius, 0);
        ctx.lineTo(proj._internal_radius, 0);
        ctx.strokeStyle = "#CFF";
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(-proj._internal_radius / 2, -1);
        ctx.lineTo(-proj._internal_radius / 2, 1);
        // ctx.moveTo(-proj.radius, 0);
        // ctx.lineTo(-proj.radius / 2, 0);
        ctx.strokeStyle = "#6CC";
        ctx.stroke();
    }
    else if (proj._internal_gfx === 19) {
        ctx.translate(proj._internal_x, proj._internal_y * WORLD_SCALE_Y - proj._internal_radius * 2);
        ctx.scale(startScale, startScale);
        ctx.rotate(-proj._internal_time * 8);
        ctx.fillStyle = "#ccc";
        const r = proj._internal_radius * 0.8;
        ctx.fillRect(-r, -r, r * 2, r * 2);
        ctx.rotate(PI / 8);
        ctx.fillRect(-r, -r, r * 2, r * 2);
        ctx.rotate(PI / 8);
        ctx.fillRect(-r, -r, r * 2, r * 2);
        ctx.rotate(PI / 8);
        ctx.fillRect(-r, -r, r * 2, r * 2);
        fillCircle(0, 0, r, "#88a");
    }
    ctx.restore();
};
const drawDeadEnemy = (enemy) => {
    const scale = enemy._internal_radius;
    const rt = enemy._internal_deadTime / enemy._internal_deadTimeMax;
    ctx.translate(enemy._internal_x, (enemy._internal_y - enemy._internal_radius / 2 - 20 * sin(min(1, enemy._internal_deadTime * 2) * PI)) *
        WORLD_SCALE_Y);
    ctx.rotate((1 - (1 - rt) ** 3) * enemy._internal_moveTime);
    ctx.scale(scale, scale * (1 - 0.2 * min(1, enemy._internal_deadTime * 2)));
    fillCircle(0, 0, 1, calcBaseColor(enemy._internal_color, enemy._internal_hit, 0.5 * (1 - rt)));
};
const drawEnemy = (enemy) => {
    if (enemy._internal_deadTime >= enemy._internal_deadTimeMax)
        return;
    const rt = enemy._internal_deadTime / enemy._internal_deadTimeMax;
    ctx.save();
    ctx.globalAlpha = 1 - rt ** 4;
    if (enemy._internal_enemyType === 0 ||
        enemy._internal_enemyType === 1) {
        const scale = enemy._internal_radius;
        if (enemy._internal_hp) {
            const iat = enemy._internal_attackTimer ** 3;
            const attackPunch = sin(iat * PI) / 2;
            const attackDx = attackPunch * (cat1._internal_x - enemy._internal_x);
            const attackDy = attackPunch * (cat1._internal_y - enemy._internal_y);
            const moveF = max(0, sin(enemy._internal_moveTime));
            ctx.translate(enemy._internal_x + attackDx, (enemy._internal_y + attackDy) * WORLD_SCALE_Y -
                enemy._internal_radius / 2 -
                moveF * enemy._internal_radius);
            ctx.scale(scale * sign(cat1._internal_x - enemy._internal_x), scale * (0.9 + 0.2 * moveF));
            const color = lerp_rgb(enemy._internal_color, enemy._internal_color2, enemy._internal_stroke * (0.5 + sin(time * 32) / 2));
            ctx.fillStyle = calcBaseColor(color, enemy._internal_hit, 0.9);
            ctx.strokeStyle = calcBaseColor(color, enemy._internal_hit, 0.3);
            ctx.lineWidth = 0.1;
            if (enemy._internal_enemyType === 1) {
                ctx.lineWidth = 0.2;
                ctx.beginPath();
                ctx.arc(0, -moveF / 3, 1, 0, TAU);
                ctx.stroke();
                ctx.fill();
                ctx.beginPath();
                ctx.arc(0, -0.8 - moveF / 2, 0.8, 0, TAU);
                ctx.stroke();
                ctx.fill();
                ctx.beginPath();
                ctx.moveTo(-0.9, 0.2 - moveF / 3);
                ctx.lineTo(-1.5, -0.4);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(1, -moveF / 3);
                ctx.lineTo(1.5, -0.5);
                ctx.stroke();
                ctx.translate(0, -0.6 - moveF / 3);
            }
            else {
                ctx.beginPath();
                ctx.arc(-0.5, 0.7 + moveF / 2, 0.3, 0, TAU);
                ctx.stroke();
                ctx.fill();
                ctx.beginPath();
                ctx.arc(0.7, 0.7 + moveF / 3, 0.3, 0, TAU);
                ctx.stroke();
                ctx.fill();
                ctx.fillStyle = calcBaseColor(enemy._internal_color, enemy._internal_hit);
                ctx.beginPath();
                ctx.arc(0, 0, 1, 0, TAU);
                ctx.stroke();
                ctx.fill();
                ctx.lineWidth = 0.2;
                ctx.strokeStyle = "#432";
                ctx.beginPath();
                ctx.arc(0.1, 0.5, 0.3, PI, 0);
                ctx.stroke();
            }
            if (enemy._internal_variation === 1) {
                ctx.fillStyle = "#936";
                ctx.beginPath();
                ctx.ellipse(0, -0.5, 1, 0.2, 0, 0, TAU);
                ctx.fill();
            }
            if (enemy._internal_variation === 2) {
                ctx.save();
                ctx.rotate(-0.3 - 0.1 * cos(enemy._internal_moveTime));
                ctx.fillStyle = CSS_BLACK;
                ctx.beginPath();
                ctx.ellipse(0, -1, 1, 0.4, 0, 0, TAU);
                ctx.fillRect(-0.4, -2, 0.8, 1);
                ctx.fill();
                ctx.fillStyle = CSS_WHITE;
                ctx.fillRect(-0.3, -1.9, 0.1, 0.7);
                ctx.restore();
                ctx.fillStyle = CSS_WHITE;
                ctx.fillRect(0, -0.6, 0.7, 0.1);
            }
            fillCircle(0, -0.5, 0.3, CSS_WHITE);
            fillCircle(0.7, -0.7, 0.3, CSS_WHITE);
            fillCircle(0, -0.5, 0.2, CSS_BLACK);
            fillCircle(0.7, -0.7, 0.2, CSS_BLACK);
        }
        else {
            drawDeadEnemy(enemy);
        }
    }
    else if (enemy._internal_enemyType === 2) {
        const scale = enemy._internal_radius;
        if (enemy._internal_hp) {
            ctx.translate(enemy._internal_x, enemy._internal_y * WORLD_SCALE_Y + 7 * rt * rt);
            ctx.rotate((1 - (1 - rt) ** 3) * enemy._internal_moveTime);
            ctx.scale(scale * sign(cat1._internal_x - enemy._internal_x), scale * (0.9 + 0.1 * sin(enemy._internal_moveTime * 2)));
            ctx.save();
            ctx.rotate(atan2(cat1._internal_y - enemy._internal_y, cat1._internal_x - enemy._internal_x) / 8);
            ctx.fillStyle = calcBaseColor(enemy._internal_color, enemy._internal_hit);
            ctx.beginPath();
            ctx.arc(0, 0, 1, PI, 0);
            ctx.ellipse(0, 0, 1, 0.2, 0, 0, PI);
            ctx.arc(0.5, -1, 0.4, 0, TAU);
            ctx.closePath();
            ctx.arc(0.1, -1, 0.5, 0, TAU);
            // ctx.moveTo(-1, -1);
            // ctx.lineTo(0.2, 0);
            // ctx.lineTo(-1, 0.2);
            ctx.closePath();
            ctx.moveTo(0, 0);
            ctx.lineTo(-2, 0);
            ctx.lineTo(0, -0.5);
            ctx.closePath();
            ctx.strokeStyle = calcBaseColor(enemy._internal_color, enemy._internal_hit, 0.3);
            ctx.lineWidth = 0.2;
            ctx.stroke();
            ctx.fill();
            fillCircle(1, 0, 0.1, "pink");
            fillCircle(0.6, -0.4, 0.1, CSS_BLACK);
            ctx.restore();
        }
        else {
            drawDeadEnemy(enemy);
        }
    }
    else if (enemy._internal_enemyType === 5) {
        ctx.translate(enemy._internal_x - 1, enemy._internal_y * WORLD_SCALE_Y + 1);
        // ctx.beginPath();
        //ctx.rotate(PI / 4);
        const s = 8;
        const sz = s / 2;
        const of = sz / 2;
        ctx.scale(1, 1 + sin(enemy._internal_moveTime + time * 8) / 20);
        ctx.fillStyle = calcBaseColor(enemy._internal_color, enemy._internal_hit, 0.7);
        ctx.beginPath();
        ctx.moveTo(-sz, -s);
        ctx.lineTo(-sz + of, -s - of);
        ctx.lineTo(sz + of, -s - of);
        ctx.lineTo(sz + of, 0 - of);
        ctx.lineTo(sz, 0);
        ctx.fill();
        ctx.fillStyle = calcBaseColor(enemy._internal_color, enemy._internal_hit);
        ctx.fillRect(-sz, -s, s, s);
        ctx.fillStyle = calcBaseColor(enemy._internal_color, 0.5);
        ctx.fillRect(-4, -3, 6, 1);
    }
    else if (enemy._internal_enemyType === 3) {
        ctx.translate(enemy._internal_x, enemy._internal_y * WORLD_SCALE_Y - 10 + 7 * rt * rt);
        ctx.rotate((1 - (1 - rt) ** 3) * enemy._internal_moveTime);
        easeQuadOut(enemy._internal_hit);
        const ts = lerp(sin(enemy._internal_moveTime * 4), -1, rt);
        const scale = enemy._internal_radius / 3.5;
        ctx.scale(scale, scale);
        ctx.save();
        ctx.rotate(ts);
        ctx.fillStyle = calcBaseColor(enemy._internal_color, enemy._internal_hit);
        ctx.beginPath();
        ctx.ellipse(-2, 0, 2, 1, 0, 0, TAU);
        ctx.fill();
        ctx.restore();
        ctx.save();
        ctx.rotate(-ts);
        ctx.fillStyle = calcBaseColor(enemy._internal_color, enemy._internal_hit);
        ctx.beginPath();
        ctx.ellipse(2, 0, 2, 1, 0, 0, TAU);
        ctx.fill();
        ctx.restore();
        fillCircle(0, 0.5, 2, calcBaseColor(enemy._internal_color, enemy._internal_hit, 0.3));
        const eyeColor = css_rgba(enemy._internal_color2);
        fillCircle(-1, 1 + ts / 2, 0.75, eyeColor);
        fillCircle(1, 1 + ts / 2, 0.75, eyeColor);
    }
    else if (enemy._internal_enemyType === 4) {
        ctx.translate(enemy._internal_x, enemy._internal_y * WORLD_SCALE_Y - 10 * sin(rt * PI));
        const scale = enemy._internal_radius / 3.5;
        const off = sin(-2 * enemy._internal_moveTime);
        ctx.scale(scale * sign(cat1._internal_x - enemy._internal_x), scale);
        ctx.save();
        fillCircle(5, -(6 - 6 * rt) + off / 2, 0.75, CSS_BLACK);
        fillCircle(5, -(6 - 6 * rt) + off / 2, 0.25, CSS_WHITE);
        ctx.beginPath();
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.lineWidth = 1;
        const head = 5 - rt * 5;
        ctx.moveTo(6, -head + off);
        // ctx.quadraticCurveTo(4, -5, 4, sin(-2 * enemy.moveTime));
        ctx.quadraticCurveTo(4, -head - 1, 4, -(head / 2 - 1) - off / 2);
        ctx.quadraticCurveTo(4, -(head / 2 - 1) - off / 2, 4, -(head / 2 - 1) - off);
        for (let i = 0; i < 7; ++i) {
            const t = i / 7;
            const t2 = (i + 0.5) / 7;
            const x1 = 4 - t * (10 + sin(enemy._internal_moveTime));
            const y1 = sin(-2 * enemy._internal_moveTime + 2 * TAU * t) * (1 - t);
            const x2 = 4 - t2 * (10 + sin(enemy._internal_moveTime));
            const y2 = sin(-2 * enemy._internal_moveTime + 2 * TAU * t2) * (1 - t2);
            // ctx.lineTo(x1, y1);
            // ctx.lineTo(x2, y2);
            ctx.quadraticCurveTo(x1, y1, x2, y2);
        }
        ctx.strokeStyle = calcBaseColor(enemy._internal_color, enemy._internal_hit);
        ctx.stroke();
        ctx.lineWidth = 0.25;
        ctx.strokeStyle = calcBaseColor(enemy._internal_color2, enemy._internal_hit);
        ctx.stroke();
        fillCircle(5 + 1, -(6 - 6 * rt) + off, 0.75, CSS_BLACK);
        fillCircle(5 + 1, -(6 - 6 * rt) + off, 0.25, CSS_WHITE);
        ctx.restore();
    }
    ctx.restore();
};
const drawHealthBar = () => {
    const w = 16;
    const w2 = (w * cat1._internal_hp) / cat1._internal_hpMax;
    const h = 2;
    ctx.save();
    ctx.translate(cat1._internal_x - w / 2, cat1._internal_y * WORLD_SCALE_Y + 12);
    ctx.lineCap = "round";
    ctx.lineWidth = h + 1;
    ctx.strokeStyle = "#222";
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(w, 0);
    ctx.stroke();
    ctx.beginPath();
    ctx.lineWidth = h;
    ctx.strokeStyle = "#210";
    ctx.moveTo(0, 0);
    ctx.lineTo(w, 0);
    ctx.stroke();
    if (w2 > 0) {
        ctx.beginPath();
        ctx.lineWidth = h;
        ctx.strokeStyle = "#C42";
        ctx.moveTo(0, 0);
        ctx.lineTo(w2, 0);
        ctx.stroke();
        ctx.beginPath();
        ctx.lineWidth = h / 3;
        ctx.strokeStyle = "#F88";
        ctx.moveTo(0, -h / 3);
        ctx.lineTo(w2, -h / 3);
        ctx.stroke();
    }
    ctx.restore();
};
const drawXpBar = () => {
    if (mainMenuActive)
        return;
    const w = gameWidth - 16;
    const w2 = levelUpActive ? w : w * (xp / getNextLevelXp());
    const h = 10;
    ctx.save();
    ctx.translate(8, 8 - 20 * mainMenuTime ** 2);
    ctx.beginPath();
    ctx.lineCap = "round";
    ctx.lineWidth = h + 2;
    ctx.strokeStyle = "#111";
    ctx.moveTo(0, 0);
    ctx.lineTo(w, 0);
    ctx.stroke();
    ctx.beginPath();
    ctx.lineWidth = h;
    ctx.strokeStyle = "#042";
    ctx.moveTo(0, 0);
    ctx.lineTo(w, 0);
    ctx.stroke();
    if (w2 > 0) {
        const levelUpColor = lerp_rgb(0x22cc44, lerp_rgb(0xff00ff, 0x0000ff, 0.5 + 0.5 * sin(rawTime * 16)), levelUpOpen);
        ctx.beginPath();
        ctx.lineWidth = h;
        ctx.strokeStyle = css_rgba(levelUpColor);
        ctx.moveTo(0, 0);
        ctx.lineTo(w2, 0);
        ctx.stroke();
        ctx.beginPath();
        ctx.lineWidth = h / 3;
        ctx.strokeStyle = css_rgba(COLORS[0], 0.3);
        ctx.moveTo(0, -h / 3);
        ctx.lineTo(w2, -h / 3);
        ctx.stroke();
    }
    drawText(w / 2, 3, "LVL " + (level + 1), CSS_WHITE, 8, 1);
    drawText(w, 16, "☠️" + frags, CSS_WHITE, 8, 2);
    if (level) {
        drawText(w / 2, 16, formatMMSS(playTime), CSS_WHITE, 10);
    }
    else {
        drawText(w / 2, gameHeight / 2 - 120, "使用WASD或触摸移动", CSS_WHITE, 16 + sin(time * 2 + 2));
        drawText(w / 2, gameHeight / 2 - 80, "吃绿色泡泡来升级", CSS_WHITE, 16 + sin(time * 2));
        drawText(w / 2, gameHeight / 2 - 60, xp / XP_MOD + " / " + getNextLevelXp() / XP_MOD, CSS_WHITE, 12 + sin(time));
    }
    drawSlotArray(8, 20, 0);
    drawSlotArray(8, 40, 1);
    if (__LOCAL_DEV_SERVER__) {
        drawDebugStats();
    }
    ctx.restore();
};
const drawSlotArray = (x, y, passive, i = 0, sz = 16) => {
    for (let slot of slots) {
        if (getCharItemPassive(slot._internal_type) == passive) {
            ctx.save();
            ctx.translate(x + (sz + 4) * i, y);
            ctx.rotate(-0.1 * sin(i + rawTime * 5));
            ctx.fillStyle = CSS_WHITE;
            ctx.globalAlpha = 0.3 + slot._internal_attackTimer / 2;
            ctx.fillRect(-sz / 2, -sz / 2, sz, sz);
            ctx.globalAlpha = 1;
            drawIcon(0, 0, TEXT_ICON[slot._internal_type], 15);
            drawText(8, -4, slot._internal_level + 1, CSS_WHITE, 8);
            ctx.restore();
            ++i;
        }
    }
};
const hitCat = (damage, cat = cat1) => {
    damage = max(0, damage - getStat(12));
    if (damage > 0) {
        if (chance(getStat(11) / 100)) {
            if (chance()) {
                addTextParticle(cat._internal_x, cat._internal_y, "闪避", "#ccF");
            }
            else {
                addTextParticle(cat._internal_x, cat._internal_y, "未命中", "#ccc");
            }
        }
        else {
            cat._internal_hp = max(0, cat._internal_hp - damage);
            cat._internal_hit = 1;
            shakeCamera(1);
            addCatHitParticles(30);
            addTextParticle(cat._internal_x0, cat._internal_y0, -damage, "#F33");
            // playSound_hit();
            playSound(6);
            sleepGame(0.1);
            if (!cat._internal_hp) {
                stopMusic();
                playSound(5);
                sleepGame(1);
            }
        }
    }
};
const splatHitParticles = (obj, color, n) => {
    for (let i = 0; i < n; ++i) {
        const d = random() ** 0.5 * 100;
        const a = random() * TAU;
        overlayParticles.push({
            _internal_type: 1,
            _internal_x: obj._internal_x,
            _internal_y: obj._internal_y * WORLD_SCALE_Y - obj._internal_radius,
            _internal_vx: d * cos(a),
            _internal_vy: d * sin(a) * WORLD_SCALE_Y,
            _internal_r: 0,
            _internal_va: 1,
            _internal_t: 0,
            _internal_maxTime: 0.05 + 0.3 * random(),
            _internal_color: color,
            _internal_damp: 1,
            _internal_scale: 1,
            _internal_sy: 1,
        });
    }
};
const hitEnemy = (enemy, damage, kickForce = 1) => {
    enemy._internal_hp = max(0, enemy._internal_hp - damage);
    enemy._internal_hit = 1;
    playSound(4);
    playSound(3);
    const df = (damage - 10) / 20;
    addTextParticle(enemy._internal_x, enemy._internal_y, damage | 0, calcBaseColor(lerp_rgb(0xffff00, 0xff0000, 0.5 + 0.5 * sin((df * Math.PI) / 2)), clamp(1 - df)), 0.5 + df / 4);
    splatHitParticles(enemy, enemy._internal_enemyType === 5 ? "#ccc" : "#930", 10);
    if (chance() || !enemy._internal_hp) {
        if (enemy._internal_kickBack <= 0) {
            enemy._internal_moveTime = 0;
        }
        enemy._internal_kickBack = 1;
        enemy._internal_vx = enemy._internal_x - cat1._internal_x;
        enemy._internal_vy = enemy._internal_y - cat1._internal_y;
        const l = hypot(enemy._internal_vx, enemy._internal_vy);
        if (l > 0) {
            const kbv = (kickForce * (random() * 500)) / enemy._internal_radius / l;
            enemy._internal_vx *= kbv;
            enemy._internal_vy *= kbv;
        }
    }
    if (!enemy._internal_hp) {
        if (enemy._internal_enemyType === 5) {
            if (chance(0.3)) {
                if (chance()) {
                    addDropItem(enemy._internal_x, enemy._internal_y, 2, 1);
                }
                else {
                    addDropItem(enemy._internal_x, enemy._internal_y, 3, 1);
                }
            }
            else if (chance(0.8) && cat1._internal_hp < cat1._internal_hpMax) {
                addDropItem(enemy._internal_x, enemy._internal_y, 1, enemy._internal_dropXp);
            }
            else {
                addDropItem(enemy._internal_x, enemy._internal_y, 0, enemy._internal_dropXp);
            }
            for (let i = 0; i < 10; ++i) {
                const d = random() ** 0.5 * 100;
                const a = random() * TAU;
                overlayParticles.push({
                    _internal_type: 2,
                    _internal_x: enemy._internal_x,
                    _internal_y: enemy._internal_y * WORLD_SCALE_Y - enemy._internal_radius * 0.25,
                    _internal_vx: d * cos(a),
                    _internal_vy: d * sin(a) * WORLD_SCALE_Y,
                    _internal_r: random() * TAU,
                    _internal_t: 0,
                    _internal_maxTime: 0.05 + 0.3 * random(),
                    _internal_color: "#fe9",
                    _internal_damp: 1,
                    _internal_va: 0,
                    _internal_scale: 1,
                    _internal_sy: 1,
                });
            }
        }
        else {
            if (enemy._internal_dropXp < 0) {
                addDropItem(enemy._internal_x, enemy._internal_y, 4, 1);
            }
            else if (random() < 0.9) {
                addDropItem(enemy._internal_x, enemy._internal_y, 0, enemy._internal_dropXp);
            }
            addFrag();
        }
        enemy._internal_moveTime = sign(enemy._internal_vx) * PI * (4 + 8 * random());
        for (let i = 0; i < 30; ++i) {
            const a = random() * TAU;
            const d = random() * 100;
            overlayParticles.push({
                _internal_type: 2,
                _internal_x: enemy._internal_x,
                _internal_y: enemy._internal_y * WORLD_SCALE_Y - 6,
                _internal_vx: d * cos(a),
                _internal_vy: d * sin(a) * WORLD_SCALE_Y - 20,
                _internal_r: random() * TAU,
                _internal_damp: 4,
                _internal_t: 0,
                _internal_va: 0,
                _internal_maxTime: 0.3 + random() * 0.4,
                _internal_color: calcBaseColor(enemy._internal_color, 0, 1),
                _internal_scale: random() * 0.5 + 0.2,
                _internal_sy: 1,
            });
        }
        playSound(5);
    }
};
const updateWeapons = () => {
    nearestEnemies.sort((a, b) => b._internal_distanceToPlayer - a._internal_distanceToPlayer);
    for (let i = 0; i < slots.length; ++i) {
        const slot = slots[i];
        if (slot) {
            const wpn = slot._internal_type;
            if (!getCharItemPassive(wpn)) {
                const fireSpeed = getWeaponStat(slot, 4) / 100;
                const damage = (getWeaponStat(slot, 1) * (1 + level * 0.02)) | 0;
                const modDamageArea = getWeaponStat(slot, 3) / 10;
                const bulletSpeed = getWeaponStat(slot, 2) / 10;
                const projectilesCount = getWeaponStat(slot, 0);
                slot._internal_attackTimer -= dt * fireSpeed;
                if (slot._internal_attackTimer < 0) {
                    slot._internal_burstClip = projectilesCount;
                    slot._internal_attackTimer = 1;
                }
                slot._internal_animation += dt;
                slot._internal_burstTimer -= dt * getWeaponStat(slot, 5);
                if (wpn === 22) {
                    const enemy = nearestEnemies[max(0, nearestEnemies.length - slot._internal_burstClip)];
                    const attackRadius = 40 * modDamageArea;
                    if (enemy && enemy._internal_distanceToPlayer < attackRadius) {
                        if (slot._internal_burstTimer < 0 && slot._internal_burstClip) {
                            // playSound(Snd.Noise);
                            hitEnemy(enemy, damage);
                            overlayParticles.push({
                                _internal_type: 0,
                                _internal_x: enemy._internal_x,
                                _internal_y: enemy._internal_y * WORLD_SCALE_Y - enemy._internal_radius * 0.25,
                                _internal_vx: 0,
                                _internal_vy: 0,
                                _internal_r: random() * TAU,
                                _internal_t: 0,
                                _internal_maxTime: 0.2,
                                _internal_color: "#fee",
                                _internal_damp: 1,
                                _internal_va: 0,
                                _internal_scale: 1,
                                _internal_sy: 1,
                            });
                            --slot._internal_burstClip;
                            slot._internal_burstTimer = 1;
                        }
                    }
                }
                else if (wpn === 17) {
                    if (slot._internal_burstTimer < 0 && slot._internal_burstClip) {
                        const radius = 5 * modDamageArea;
                        const a = random() * TAU;
                        projectiles.push({
                            _internal_type: 3,
                            _internal_x: cat1._internal_x + (cat1._internal_radius + radius) * cos(a),
                            _internal_y: cat1._internal_y + (cat1._internal_radius + radius) * sin(a),
                            _internal_vx: cat1._internal_vx + 200 * bulletSpeed * cos(a),
                            _internal_vy: cat1._internal_vy + 200 * bulletSpeed * sin(a),
                            _internal_radius: radius,
                            _internal_damageRadius: radius,
                            _internal_damage: damage,
                            _internal_time: 0,
                            _internal_timeMax: 3,
                            _internal_timer: 0,
                            _internal_period: 0.3,
                            _internal_damageCount: 100,
                            _internal_damageRepeat: 100,
                            _internal_shadowSize: 1,
                            _internal_visible: 1,
                            _internal_gfx: 17,
                            _internal_collisionLayer: 0,
                        });
                        playSound(8);
                        --slot._internal_burstClip;
                        slot._internal_burstTimer = 1;
                    }
                }
                else if (wpn === 14) {
                    if (slot._internal_burstTimer < 0 && slot._internal_burstClip) {
                        const radius = 5 * modDamageArea;
                        const a = -PI / 4 - (random() * PI) / 2;
                        projectiles.push({
                            _internal_type: 3,
                            _internal_x: cat1._internal_x + (cat1._internal_radius + radius) * cos(a),
                            _internal_y: cat1._internal_y + (cat1._internal_radius + radius) * sin(a),
                            _internal_vx: cat1._internal_vx + 200 * bulletSpeed * cos(a),
                            _internal_vy: cat1._internal_vy + 200 * bulletSpeed * sin(a),
                            _internal_radius: radius,
                            _internal_damageRadius: radius,
                            _internal_damage: damage,
                            _internal_time: 0,
                            _internal_timeMax: 3,
                            _internal_timer: 0,
                            _internal_period: 0.3,
                            _internal_damageCount: 100,
                            _internal_damageRepeat: 100,
                            _internal_shadowSize: 1,
                            _internal_visible: 1,
                            _internal_gfx: 14,
                            _internal_collisionLayer: 0,
                        });
                        playSound(8);
                        --slot._internal_burstClip;
                        slot._internal_burstTimer = 1;
                    }
                }
                else if (wpn === 18) {
                    const radius = 20 * modDamageArea;
                    if (slot._internal_animation > 0.01) {
                        slot._internal_animation = 0;
                        for (let i = 0; i < slot._internal_level + 1; ++i) {
                            const d = random() ** 0.2 * radius;
                            const a = random() * TAU;
                            const dx = d * cos(a);
                            const dy = d * sin(a);
                            groundParticles.push({
                                _internal_type: 2,
                                _internal_x: cat1._internal_x + dx,
                                _internal_y: (cat1._internal_y + dy) * WORLD_SCALE_Y,
                                _internal_vx: 0,
                                _internal_vy: -10 * random(),
                                _internal_r: 0,
                                _internal_t: 0,
                                _internal_maxTime: 0.5 + 0.5 * random(),
                                _internal_color: "#c96",
                                _internal_damp: 0,
                                _internal_scale: random() * 0.2 + 0.2,
                                _internal_sy: 1,
                                _internal_va: 0,
                            });
                        }
                    }
                    if (slot._internal_burstTimer < 0 && slot._internal_burstClip) {
                        projectiles.push({
                            _internal_type: 3,
                            _internal_x: cat1._internal_x,
                            _internal_y: cat1._internal_y,
                            _internal_vx: 0,
                            _internal_vy: 0,
                            _internal_radius: radius,
                            _internal_damageRadius: radius,
                            _internal_damage: damage,
                            _internal_time: 0,
                            _internal_timeMax: 0.01,
                            _internal_timer: 0,
                            _internal_period: 0,
                            _internal_damageCount: 100,
                            _internal_damageRepeat: 1,
                            _internal_shadowSize: 1,
                            _internal_visible: 0,
                            _internal_gfx: 18,
                            _internal_followCat: {
                                _internal_radius: 0,
                                _internal_angle: 0,
                                _internal_rotation: 0,
                            },
                            _internal_collisionLayer: 0,
                        });
                        slot._internal_burstClip = 0;
                        slot._internal_burstTimer = 0;
                    }
                }
                else if (wpn === 21) {
                    const radius = 5 * modDamageArea;
                    if (slot._internal_burstTimer < 0 &&
                        slot._internal_burstClip &&
                        hypot(cat1._internal_vx, cat1._internal_vy) >= 1) {
                        const lifeTime = 1.5;
                        const x = cat1._internal_x + 10 * modDamageArea * (random() - 0.5);
                        const y = cat1._internal_y + 10 * modDamageArea * (random() - 0.5);
                        groundParticles.push({
                            _internal_type: 2,
                            _internal_x: x,
                            _internal_y: y * WORLD_SCALE_Y,
                            _internal_vx: 0,
                            _internal_vy: 0,
                            _internal_r: 0,
                            _internal_t: 0,
                            _internal_maxTime: lifeTime * 2,
                            _internal_color: "#012",
                            _internal_va: 0,
                            _internal_damp: 0,
                            _internal_scale: 2,
                            _internal_sy: WORLD_SCALE_Y,
                        });
                        projectiles.push({
                            _internal_type: 3,
                            _internal_x: x,
                            _internal_y: y,
                            _internal_vx: 0,
                            _internal_vy: 0,
                            _internal_radius: radius,
                            _internal_damageRadius: radius,
                            _internal_damage: damage,
                            _internal_time: 0,
                            _internal_timeMax: lifeTime,
                            _internal_timer: 0,
                            _internal_period: 0.3,
                            _internal_damageCount: 100,
                            _internal_damageRepeat: 100,
                            _internal_shadowSize: 1,
                            _internal_visible: 0,
                            _internal_gfx: 21,
                            _internal_collisionLayer: 0,
                            _internal_kickForce: 0,
                        });
                        // playSound_noise();
                        // slot.burstClip = 0;
                        slot._internal_burstTimer = 1;
                    }
                }
                else if (wpn === 12) {
                    const radius = 2 * modDamageArea;
                    const enemy = nearestEnemies[max(0, nearestEnemies.length - slot._internal_burstClip)];
                    if (enemy) {
                        if (slot._internal_burstTimer < 0 && slot._internal_burstClip) {
                            // nearestEnemies.pop();
                            projectiles.push({
                                _internal_type: 3,
                                _internal_x: cat1._internal_x + (5 * (enemy._internal_x - cat1._internal_x)) / enemy._internal_distanceToPlayer,
                                _internal_y: cat1._internal_y + (5 * (enemy._internal_y - cat1._internal_y)) / enemy._internal_distanceToPlayer,
                                _internal_vx: (100 * bulletSpeed * (enemy._internal_x - cat1._internal_x)) /
                                    enemy._internal_distanceToPlayer,
                                _internal_vy: (100 * bulletSpeed * (enemy._internal_y - cat1._internal_y)) /
                                    enemy._internal_distanceToPlayer,
                                _internal_radius: radius,
                                _internal_damageRadius: radius,
                                _internal_damage: damage,
                                _internal_time: 0,
                                _internal_timeMax: 3,
                                _internal_timer: 0,
                                _internal_period: 10,
                                _internal_damageCount: 1,
                                _internal_damageRepeat: 1,
                                _internal_shadowSize: 1,
                                _internal_visible: 1,
                                _internal_gfx: 12,
                                _internal_collisionLayer: 0,
                            });
                            playSound(5);
                            --slot._internal_burstClip;
                            slot._internal_burstTimer = 1;
                        }
                    }
                }
                else if (wpn === 20) {
                    if (slot._internal_burstTimer < 0 && slot._internal_burstClip) {
                        const radius = 20 * modDamageArea;
                        const x = visibleX0 + (visibleX1 - visibleX0) * random();
                        const y = (visibleY0 + (visibleY1 - visibleY0) * random()) / WORLD_SCALE_Y;
                        const vx = (bulletSpeed - 1) * (cat1._internal_x - x);
                        const vy = (bulletSpeed - 1) * (cat1._internal_y - y);
                        groundParticles.push({
                            _internal_type: 2,
                            _internal_x: x,
                            _internal_y: y * WORLD_SCALE_Y,
                            _internal_vx: vx,
                            _internal_vy: vy,
                            _internal_r: 0,
                            _internal_t: 0,
                            _internal_maxTime: 1,
                            _internal_color: "rgba(200,255,255,0.1)",
                            _internal_damp: 0,
                            _internal_va: 0,
                            _internal_scale: radius / 3,
                            _internal_sy: WORLD_SCALE_Y,
                        });
                        projectiles.push({
                            _internal_type: 3,
                            _internal_x: x,
                            _internal_y: y,
                            _internal_vx: vx,
                            _internal_vy: vy,
                            _internal_radius: radius,
                            _internal_damageRadius: radius,
                            _internal_damage: damage,
                            _internal_time: 0,
                            _internal_timeMax: 0.5,
                            _internal_timer: 0,
                            _internal_period: 0.5,
                            _internal_damageCount: 100,
                            _internal_damageRepeat: 100,
                            _internal_shadowSize: 0,
                            _internal_visible: 1,
                            _internal_gfx: 20,
                            _internal_collisionLayer: 0,
                            _internal_kickForce: 0,
                        });
                        --slot._internal_burstClip;
                        slot._internal_burstTimer = 1;
                        playSound(7);
                    }
                }
                else if (wpn === 15) {
                    if (slot._internal_burstTimer < 0 && slot._internal_burstClip) {
                        const radius = 2 * modDamageArea;
                        const speed = 0.9 + 0.1 * random();
                        const a = atan2(cat1._internal_y0 - cat1._internal_y1, cat1._internal_x0 - cat1._internal_x1);
                        projectiles.push({
                            _internal_type: 3,
                            _internal_x: cat1._internal_x + 10 * cos(a) + cat1._internal_radius * (0.5 - random()),
                            _internal_y: cat1._internal_y + 10 * sin(a) + cat1._internal_radius * (0.5 - random()),
                            _internal_vx: speed * 100 * bulletSpeed * cos(a),
                            _internal_vy: speed * 100 * bulletSpeed * sin(a),
                            _internal_radius: radius,
                            _internal_damageRadius: radius,
                            _internal_damage: damage,
                            _internal_time: 0,
                            _internal_timeMax: 3,
                            _internal_timer: 0,
                            _internal_period: 10,
                            _internal_damageCount: 1,
                            _internal_damageRepeat: 1,
                            _internal_shadowSize: 1,
                            _internal_visible: 1,
                            _internal_gfx: 15,
                            _internal_collisionLayer: 0,
                        });
                        --slot._internal_burstClip;
                        slot._internal_burstTimer = 1;
                        playSound(5);
                    }
                }
                else if (wpn === 13) {
                    if (slot._internal_burstTimer < 0 && slot._internal_burstClip) {
                        const enemy = nearestEnemies[(random() * nearestEnemies.length) | 0];
                        if (enemy) {
                            const radius = 2 * modDamageArea;
                            // for (let k = 0; k < 3; ++k) {
                            //   const radius = 2 * modDamageArea;
                            //   const speed = 0.9 + 0.1 * random();
                            //   const a =
                            //     atan2(cat1.y0 - cat1.y1, cat1.x0 - cat1.x1) + 0.2 * (k - 1);
                            //   projectiles.push({
                            //     type: EntityType.Projectile,
                            //     x: cat1.x + 10 * cos(a),
                            //     y: cat1.y + 10 * sin(a),
                            //     vx: speed * 100 * bulletSpeed * cos(a),
                            //     vy: speed * 100 * bulletSpeed * sin(a),
                            //     radius: radius,
                            //     damageRadius: radius,
                            //     damage: damage,
                            //     time: 0,
                            //     timeMax: 3,
                            //     timer: 0,
                            //     period: 10,
                            //     damageCount: 1,
                            //     damageRepeat: 1,
                            //     shadowSize: 1,
                            //     visible: 1,
                            //     gfx: CharItem.Knife,
                            //   });
                            // }
                            for (let k = 0; k < slot._internal_burstClip; ++k) {
                                const ta = atan2(enemy._internal_y - cat1._internal_y, enemy._internal_x - cat1._internal_x) +
                                    0.1 * (k - slot._internal_burstClip / 2);
                                const baseSpeed = 50;
                                projectiles.push({
                                    _internal_type: 3,
                                    _internal_x: cat1._internal_x + 5 * cos(ta),
                                    _internal_y: cat1._internal_y + 5 * sin(ta),
                                    _internal_vx: baseSpeed * bulletSpeed * cos(ta),
                                    _internal_vy: baseSpeed * bulletSpeed * sin(ta),
                                    _internal_radius: radius,
                                    _internal_damageRadius: radius,
                                    _internal_damage: damage,
                                    _internal_time: 0,
                                    _internal_timeMax: 3,
                                    _internal_timer: 0,
                                    _internal_period: 0.5,
                                    _internal_damageCount: 1,
                                    _internal_damageRepeat: 1,
                                    _internal_shadowSize: 1,
                                    _internal_visible: 1,
                                    _internal_gfx: 13,
                                    _internal_collisionLayer: 0,
                                });
                            }
                            playSound(5);
                            slot._internal_burstClip = 0;
                            slot._internal_burstTimer = 1;
                        }
                    }
                }
                else if (wpn === 16) {
                    if (slot._internal_burstTimer < 0 && slot._internal_burstClip) {
                        const baseSpeed = 130 * bulletSpeed;
                        const radius = 10 * modDamageArea;
                        // nearestEnemies.pop();
                        const dir = ((projectilesCount - slot._internal_burstClip) % 2 ? 1 : -1) *
                            sign(cat1._internal_x1 - cat1._internal_x0);
                        projectiles.push({
                            _internal_type: 3,
                            _internal_x: cat1._internal_x + dir * radius,
                            _internal_y: cat1._internal_y,
                            _internal_vx: cat1._internal_vx + dir * baseSpeed,
                            _internal_vy: cat1._internal_vy,
                            _internal_radius: radius,
                            _internal_damageRadius: radius,
                            _internal_damage: damage,
                            _internal_time: 0,
                            _internal_timeMax: 0.3,
                            _internal_timer: 0,
                            _internal_period: 0.5,
                            _internal_damageCount: 1000,
                            _internal_damageRepeat: 1000,
                            _internal_shadowSize: 0,
                            _internal_visible: 0,
                            _internal_gfx: 16,
                            _internal_collisionLayer: 0,
                        });
                        playSound(8);
                        --slot._internal_burstClip;
                        slot._internal_burstTimer = 1;
                        overlayParticles.push({
                            _internal_type: 3,
                            _internal_x: cat1._internal_x + 1.5 * dir * radius,
                            _internal_y: cat1._internal_y * WORLD_SCALE_Y,
                            _internal_vx: cat1._internal_vx + dir * baseSpeed,
                            _internal_vy: cat1._internal_vy + 0,
                            _internal_r: 0,
                            _internal_va: 1,
                            _internal_t: 0,
                            _internal_scale: radius / 3,
                            _internal_sy: 1,
                            _internal_maxTime: 0.5,
                            _internal_color: "rgba(255,255,255,0.5)",
                            _internal_damp: 2,
                        });
                    }
                }
                else if (wpn === 19) {
                    if (slot._internal_burstTimer < 0) {
                        const bulletRadius = 4 * modDamageArea;
                        const radius = 50 * modDamageArea;
                        const n = slot._internal_burstClip;
                        let a = 0;
                        const time = 1;
                        const da = TAU / n;
                        while (slot._internal_burstClip > 0) {
                            projectiles.push({
                                _internal_type: 3,
                                _internal_x: cat1._internal_x,
                                _internal_y: cat1._internal_y,
                                _internal_vx: 0,
                                _internal_vy: 0,
                                _internal_radius: bulletRadius,
                                _internal_damageRadius: bulletRadius,
                                _internal_damage: damage,
                                _internal_time: 0,
                                _internal_timeMax: time / bulletSpeed,
                                _internal_timer: 0,
                                _internal_period: 0.1,
                                _internal_damageCount: 10,
                                _internal_damageRepeat: 999,
                                _internal_shadowSize: 1,
                                _internal_visible: 1,
                                _internal_gfx: 19,
                                _internal_followCat: {
                                    _internal_radius: radius,
                                    _internal_angle: a,
                                    _internal_rotation: (bulletSpeed * TAU) / time,
                                },
                                _internal_collisionLayer: 0,
                            });
                            --slot._internal_burstClip;
                            a += da;
                        }
                        // playSound_noise();
                        slot._internal_burstTimer = 1;
                    }
                }
            }
        }
    }
};
const win = () => {
    for (const enemy of enemies) {
        hitEnemy(enemy, enemy._internal_hp);
    }
    winActive = 1;
    winTargetX = (visibleX0 + cat1._internal_x0) / 2;
    winTargetY = cat1._internal_y0 + 50;
    winTargetReached = 0;
    cat2._internal_x0 = visibleX0;
    cat2._internal_y0 = cat1._internal_y0;
    stopMusic();
    resetLevelUps();
};
const handleCheats = () => {
    if (keyboardDown["Digit1"]) ;
    else if (keyboardDown["Digit2"]) ;
    else if (keyboardDown["Digit3"]) ;
    else if (keyboardDown["Digit4"]) {
        // addCatXp(getNextLevelXp() - xp);
        openLevelUp(1);
        // for (const drop of drops) {
        // drop.captured = 1;
        // }
    }
    else if (keyboardDown["Digit5"]) {
        resetLevel();
    }
    else if (keyboardDown["Digit6"]) {
        hitCat(100);
    }
    else if (keyboardDown["Digit7"]) {
        win();
    }
    else if (keyboardDown["Digit8"]) {
        for (let i = 0; i < 30; ++i) {
            levelUpDebug(+(i % 4 === 0));
        }
    }
    else if (keyboardDown["Digit0"]) ;
};
const drawShadows = (color = calcBaseColor(COLORS[1], 0, 0.85)) => {
    for (const obj of objectsToDraw) {
        if (obj._internal_shadowSize) {
            fillWorldCircle(obj._internal_x, obj._internal_y, obj._internal_radius * obj._internal_shadowSize, color);
        }
    }
};
const updateWinState = (cat = cat2, reachedPrev = winTargetReached) => {
    winTargetReached = +(hypot(winTargetY - cat._internal_y0, winTargetX - cat._internal_x0 - 10) < 2);
    if (winTargetReached != reachedPrev) {
        setTimeout(() => playSound(0), 100);
        setTimeout(() => playSound(1), 1300);
    }
    if (winTargetReached) {
        cat._internal_wobble = 0.1;
        cat1._internal_wobble = 0.1;
        winParticles += rawDeltaTime * 100;
        while (winParticles > 0) {
            groundParticles.push({
                _internal_x: lerp(visibleX0, visibleX1, random()),
                _internal_y: lerp(visibleY0 - 50, visibleY1, random()),
                _internal_r: random() * TAU,
                _internal_damp: 2,
                _internal_t: 0,
                _internal_va: 0,
                _internal_maxTime: 1 + 0.5 * random(),
                _internal_color: CSS_WHITE,
                _internal_type: 4,
                _internal_rs: 8 * (random() - 0.5),
                _internal_vx: 0,
                _internal_vy: random() * 100,
                _internal_scale: 1 + random(),
                _internal_sy: 1,
            });
            --winParticles;
            for (let i = 0; i < 16; ++i) {
                const t = (-winTime * 6) % PI;
                const x = (i & 1 ? -1 : 1) * 3 * 16 * sin(t) ** 3 + winTargetX;
                const y = -3 * (13 * cos(t) - 5 * cos(2 * t) - 2 * cos(3 * t) - cos(4 * t)) +
                    winTargetY * WORLD_SCALE_Y;
                overlayParticles.push({
                    _internal_x: x + 5 * (random() - 0.5),
                    _internal_y: y + 5 * (random() - 0.5),
                    _internal_r: 0,
                    _internal_damp: 6,
                    _internal_t: 0,
                    _internal_va: 0,
                    _internal_maxTime: random(),
                    _internal_color: chance() ? "pink" : CSS_WHITE,
                    _internal_type: 2,
                    _internal_vx: 0,
                    _internal_vy: -100 * random(),
                    _internal_scale: random(),
                    _internal_sy: 1,
                });
            }
        }
    }
};
const updateEnemies = () => {
    for (let i = 0; i < enemies.length; ++i) {
        const enemy = enemies[i];
        for (let j = i + 1; j < enemies.length; ++j) {
            const b = enemies[j];
            checkBodyCollision(enemy, b);
        }
        checkBodyCollision(enemy, cat1);
        updateHitCounter(enemy);
        if (enemy._internal_hp) {
            let lx = cat1._internal_x - enemy._internal_x;
            let ly = cat1._internal_y - enemy._internal_y;
            const l = hypot(lx, ly);
            enemy._internal_distanceToPlayer = l;
            enemy._internal_attackTimer = max(0, enemy._internal_attackTimer - dt * 2);
            if (cat1._internal_hp > 0) {
                if (testVisible(enemy._internal_x, enemy._internal_y * WORLD_SCALE_Y, -enemy._internal_radius * 4)) {
                    nearestEnemies.push(enemy);
                }
                if (l <= cat1._internal_hitRadius + enemy._internal_radius) {
                    if (enemy._internal_damage > 0 && enemy._internal_attackTimer <= 0) {
                        enemy._internal_attackTimer = 1;
                        hitCat(enemy._internal_damage);
                    }
                }
            }
            else {
                lx = -0.5 * lx;
                ly = -0.5 * ly;
            }
            enemy._internal_moveTime += dt * 8;
            enemy._internal_kickBack = reach(enemy._internal_kickBack, 0, dt * 2);
            if (enemy._internal_kickBack > 0) {
                enemy._internal_vx *= exp(-5 * dt);
                enemy._internal_vy *= exp(-5 * dt);
            }
            else if (l > 0) {
                const moveF = enemy._internal_enemyType === 0 ||
                    enemy._internal_enemyType === 1
                    ? max(0, sin(enemy._internal_moveTime))
                    : 1;
                const speed = moveF * enemy._internal_maxVelocity;
                enemy._internal_vx = (speed * lx) / l;
                enemy._internal_vy = (speed * ly) / l;
            }
        }
        else {
            enemy._internal_vx *= exp(-5 * dt);
            enemy._internal_vy *= exp(-5 * dt);
            enemy._internal_deadTime += dt;
            enemy._internal_shadowSize = 1 - min(enemy._internal_deadTime / enemy._internal_deadTimeMax, 1);
            if (enemy._internal_deadTime >= enemy._internal_deadTimeMax) {
                enemies.splice(i--, 1);
            }
        }
        enemy._internal_x += enemy._internal_vx * dt;
        enemy._internal_y += enemy._internal_vy * dt;
        if (testVisible(enemy._internal_x, enemy._internal_y * WORLD_SCALE_Y, enemy._internal_radius * 4)) {
            objectsToDraw.push(enemy);
        }
    }
};
const updateProjectiles = () => {
    for (let i = 0; i < projectiles.length; ++i) {
        const proj = projectiles[i];
        proj._internal_x += proj._internal_vx * dt;
        proj._internal_y += proj._internal_vy * dt;
        if (proj._internal_followCat) {
            proj._internal_followCat._internal_angle += dt * proj._internal_followCat._internal_rotation;
            proj._internal_x = proj._internal_followCat._internal_radius * cos(proj._internal_followCat._internal_angle) + cat1._internal_x;
            proj._internal_y = proj._internal_followCat._internal_radius * sin(proj._internal_followCat._internal_angle) + cat1._internal_y;
            proj._internal_vx = cat1._internal_vx;
            proj._internal_vy = cat1._internal_vy;
        }
        else if (proj._internal_gfx === 17) {
            const dx = cat1._internal_x - proj._internal_x;
            const dy = cat1._internal_y - proj._internal_y;
            const l = hypot(dx, dy);
            proj._internal_vx = exp(-dt) * (proj._internal_vx + dt * ((200 * dx) / l));
            proj._internal_vy = exp(-dt) * (proj._internal_vy + dt * ((200 * dy) / l));
            if (l < cat1._internal_radius + proj._internal_radius) {
                proj._internal_time = proj._internal_timeMax;
            }
        }
        else if (proj._internal_gfx === 14) {
            proj._internal_vx *= exp(-dt);
            proj._internal_vy *= exp(-dt);
            proj._internal_vy += 200 * dt;
        }
        proj._internal_time += dt;
        proj._internal_timer -= dt;
        if (proj._internal_timer <= 0) {
            let damaged = false;
            for (let j = 0; j < enemies.length; ++j) {
                const enemy = enemies[j];
                if (enemy._internal_hp > 0 &&
                    hypot(proj._internal_x - enemy._internal_x, proj._internal_y - enemy._internal_y) <=
                        proj._internal_damageRadius + enemy._internal_radius) {
                    hitEnemy(enemy, proj._internal_damage, proj._internal_kickForce);
                    if (!--proj._internal_damageCount) {
                        proj._internal_time = proj._internal_timeMax;
                        break;
                    }
                    damaged = true;
                }
            }
            if (damaged) {
                --proj._internal_damageRepeat;
                if (!proj._internal_damageRepeat) {
                    proj._internal_time = proj._internal_timeMax;
                }
                proj._internal_timer = proj._internal_period;
            }
        }
        if (proj._internal_time >= proj._internal_timeMax) {
            projectiles.splice(i--, 1);
        }
        else if (proj._internal_visible &&
            testVisible(proj._internal_x, proj._internal_y * WORLD_SCALE_Y, proj._internal_radius * 4)) {
            objectsToDraw.push(proj);
        }
    }
};
initMain();
//# sourceMappingURL=index.js.map
