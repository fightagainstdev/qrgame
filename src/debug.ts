import { drawText } from "./bubble";
import { CSS_WHITE } from "./colors";
import { getStat } from "./stats";
import { StatKey } from "./upgrade_types";

export const drawDebugStats = () => {
  let px = 0;
  let py = 80;
  const dy = 10;
  drawText(px, py, "最大生命值: " + getStat(StatKey.Hp), CSS_WHITE, 8, 0);
  py += dy;
  drawText(px, py, "+经验: " + getStat(StatKey.Xp), CSS_WHITE, 8, 0);
  py += dy;
  drawText(px, py, "护甲: " + getStat(StatKey.Armor), CSS_WHITE, 8, 0);
  py += dy;
  drawText(px, py, "范围: " + getStat(StatKey.DamageRadius), CSS_WHITE, 8, 0);
  py += dy;
  drawText(px, py, "伤害: " + getStat(StatKey.Damage), CSS_WHITE, 8, 0);
  py += dy;
  drawText(
    px,
    py,
    "子弹速度: " + getStat(StatKey.BulletSpeed),
    CSS_WHITE,
    8,
    0
  );
  py += dy;
  drawText(
    px,
    py,
    "额外弹丸: " + getStat(StatKey.Projectile),
    CSS_WHITE,
    8,
    0
  );
  py += dy;
  drawText(
    px,
    py,
    "每秒再生 " + getStat(StatKey.Regen),
    CSS_WHITE,
    8,
    0
  );
  py += dy;
  drawText(
    px,
    py,
    "武器速度修改 " + getStat(StatKey.FireRate),
    CSS_WHITE,
    8,
    0
  );
  py += dy;
  drawText(px, py, "幸运 " + getStat(StatKey.Luck), CSS_WHITE, 8, 0);
  py += dy;
  drawText(
    px,
    py,
    "磁铁半径 " + getStat(StatKey.MagnetRadius),
    CSS_WHITE,
    8,
    0
  );
  py += dy;
  drawText(
    px,
    py,
    "被动槽位 " + getStat(StatKey.PassiveSlots),
    CSS_WHITE,
    8,
    0
  );
  py += dy;
  drawText(
    px,
    py,
    "武器槽位 " + getStat(StatKey.WeaponSlots),
    CSS_WHITE,
    8,
    0
  );
  py += dy;
  drawText(
    px,
    py,
    "移动速度 " + getStat(StatKey.MoveSpeed),
    CSS_WHITE,
    8,
    0
  );
  py += dy;
};
