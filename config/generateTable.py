LEVEL_CAP = 99

d = {}
for lvl in range(1, LEVEL_CAP):
    req = int(round(10 * lvl **2.25,-1))
    d[lvl] = req

print(f"export const LEVEL_CAP = {LEVEL_CAP};")
print(f"export const XP_REQUIREMENT_TABLE = {d};")