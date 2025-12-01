#!/usr/bin/env python3
"""Generate a professional avatar image for the portfolio"""

from PIL import Image, ImageDraw, ImageFont
import os

# Create a 400x400 avatar image
width, height = 400, 400
image = Image.new('RGB', (width, height), color='#0f172a')
draw = ImageDraw.Draw(image)

# Draw gradient background (approximated with circles)
# Create indigo to purple gradient
for y in range(height):
    # Interpolate between indigo (#6366f1) and purple (#a855f7)
    r = int(99 + (168 - 99) * y / height)
    g = int(102 + (85 - 102) * y / height)
    b = int(241 + (247 - 241) * y / height)
    draw.line([(0, y), (width, y)], fill=(r, g, b))

# Draw a circle for the head area
head_bbox = [50, 40, 350, 240]
draw.ellipse(head_bbox, fill='#e0e7ff', outline='#c7d2fe', width=3)

# Draw a rounded rectangle for the body
body_bbox = [80, 200, 320, 380]
draw.rounded_rectangle(body_bbox, radius=40, fill='#e0e7ff', outline='#c7d2fe', width=3)

# Add the letter K
try:
    # Try to use a nice font
    font = ImageFont.truetype("arial.ttf", 180)
except:
    # Fallback to default font
    font = ImageFont.load_default()

draw.text((200, 160), "K", font=font, fill='#6366f1', anchor="mm")

# Save the image
output_path = 'd:/clg/Kart Port/assets/avatar.jpg'
image.save(output_path, 'JPEG', quality=95)
print(f"✓ Avatar created: {output_path}")
print(f"  Size: {width}x{height}px")
