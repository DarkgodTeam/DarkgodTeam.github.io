#!/usr/bin/env python3
"""Скачивает изображения/видео рассылки fall26 в list_48/campaign_19/
и создаёт русские копии (…-ru-…) английских файлов для последующей замены.
Запуск из корня проекта (там, где лежат eng, ru, jp):  python fetch_images.py
"""
import os, shutil, urllib.request

ID = "mY6ff5HB5RNlunvi"
ORIG = "https://email-files.fangamer.com/list_48/campaign_19/"
DST = os.path.join("list_48", "campaign_19")

COMMON = [f"{n}-{ID}.{e}" for n, e in [
    ("green_Lifting_Sunglasses", "gif"), ("manyframestarwalker_tree", "gif"), ("pluey_place", "gif"),
    ("queen_chair", "gif"), ("queen-pink-thumb", "png"), ("mosaic", "gif"), ("girlington", "png"),
    ("dr-pc2", "png"), ("rotary4b", "gif"), ("burgerpants", "png")]]
HEADERS = ["header", "chapter6-status", "chapter6-preview", "chapter7", "girlington", "piano", "fgmerch", "end"]

jobs = list(COMMON)
jobs += [f"headers/{h}-{ID}.png" for h in HEADERS]            # английские
jobs += [f"headers/{h}-jp-{ID}.png" for h in HEADERS]         # японские
jobs += [f"results-{ID}.png", f"newsletter_pink_queen_en-{ID}.mp4", f"newsletter_pink_queen_jp-{ID}.mp4"]

for rel in jobs:
    out = os.path.join(DST, *rel.split("/"))
    if os.path.exists(out):
        continue
    os.makedirs(os.path.dirname(out), exist_ok=True)
    try:
        req = urllib.request.Request(ORIG + rel, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req) as r, open(out, "wb") as f:
            shutil.copyfileobj(r, f)
        print("OK  ", rel)
    except Exception as e:
        print("FAIL", rel, e)

# русские копии английских файлов (их потом заменить на переведённые)
ru = [(f"headers/{h}-{ID}.png", f"headers/{h}-ru-{ID}.png") for h in HEADERS]
ru += [(f"results-{ID}.png", f"results-ru-{ID}.png"),
       (f"newsletter_pink_queen_en-{ID}.mp4", f"newsletter_pink_queen_ru-{ID}.mp4")]
for a, b in ru:
    pa, pb = (os.path.join(DST, *x.split("/")) for x in (a, b))
    if os.path.exists(pa) and not os.path.exists(pb):
        shutil.copyfile(pa, pb)
        print("COPY", b)
