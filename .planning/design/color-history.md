# Color History

A record of every color palette used in the project, in chronological order.

---

## Palette 0 — Original (Blue, Pre-UI Overhaul)
**Commit:** before `f16e341`
**Status:** Superseded

CSS variables (`web/src/index.css`):
| Variable | Value |
|---|---|
| `--color-primary` | `#1d4ed8` (blue) |
| `--color-primary-foreground` | `#ffffff` |
| `--color-ring` | `#1d4ed8` |
| `--color-background` | `#ffffff` |
| `--color-border` | `#e2e8f0` |
| `--color-input` | `#e2e8f0` |

Hardcoded values: none (all via CSS variables).

---

## Palette 1 — Forest Green (Post-UI Overhaul)
**Commit:** `12dffa1` — "Overhaul public site UI and expand README route documentation"
**Status:** Superseded

CSS variables (`web/src/index.css`):
| Variable | Value |
|---|---|
| `--color-primary` | `#1a5c38` (forest green) |
| `--color-primary-foreground` | `#ffffff` |
| `--color-ring` | `#1a5c38` |
| `--color-background` | `#ffffff` |
| `--color-border` | `#e2e8f0` |
| `--color-input` | `#e2e8f0` |
| `--color-muted` | `#f1f5f9` |
| `--color-muted-foreground` | `#64748b` |

Hardcoded values in components:
| Usage | Primary | Hover/Dark |
|---|---|---|
| Nav bar background | `#1a5c38` | — |
| Footer background | `#1a5c38` | — |
| Buttons (LOG IN, CTAs) | `#1a5c38` | `#154d2f` |
| Step circles | `#1a5c38` | — |
| CheckCircle icons | `#1a5c38` | — |
| Logo text | `#1a5c38` | — |
| Input focus ring | `#1a5c38` | — |

No accent / gold color — single green palette only.

---

## Palette 2 — Emerald + Gold (Startup Feel)
**Date:** 2026-03-08
**Status:** Superseded

Defined by user as:
```
Primary: #50C878 / Dark: #2F9E5A / Light: #DDF7E7
Accent:  #FFC145 / Dark: #D99A17 / Light: #FFF1CC
Background: #FAFCF8 | Surface: #FFFFFF | Alt: #F2F7F1
Text: #1E2A22 / Secondary: #5C6B61 | Border: #D9E6DC
```

CSS variables (`web/src/index.css`):
| Variable | Value |
|---|---|
| `--color-background` | `#FAFCF8` |
| `--color-foreground` | `#1E2A22` |
| `--color-card` | `#FFFFFF` |
| `--color-card-foreground` | `#1E2A22` |
| `--color-primary` | `#50C878` |
| `--color-primary-foreground` | `#FFFFFF` |
| `--color-secondary` | `#F2F7F1` |
| `--color-secondary-foreground` | `#1E2A22` |
| `--color-muted` | `#F2F7F1` |
| `--color-muted-foreground` | `#5C6B61` |
| `--color-accent` | `#FFC145` |
| `--color-accent-foreground` | `#1E2A22` |
| `--color-border` | `#D9E6DC` |
| `--color-input` | `#D9E6DC` |
| `--color-ring` | `#50C878` |

Hardcoded values in components:
| Element | Color | Hover |
|---|---|---|
| Nav bar background | `#2F9E5A` | — |
| Footer background | `#1E2A22` | — |
| LOG IN button | `#2F9E5A` | `#1E2A22` |
| REGISTER button | `#FFC145` | `#D99A17` |
| Hero "Existing Customers" button | `#2F9E5A` | `#1E2A22` |
| Hero "View Live Rates" button | `#FFC145` | `#D99A17` |
| Hero "Apply Now" button | `#FFC145` | `#D99A17` |
| Info strip background | `#FFC145` | — |
| CTA section background | `#2F9E5A` | — |
| CTA "Apply Now" button | `#FFC145` | `#D99A17` |
| Step number circles | `#2F9E5A` | — |
| CheckCircle icons | `#50C878` | — |
| Nav hover | — | `#FFC145` |
| Footer sub-text | `#DDF7E7` | — |
| Footer border | `#2F9E5A` | — |
| Logo text | `#50C878` | — |
| Input focus ring | `#50C878` | — |

---

## Palette 3 — Navy + Gold (Premium, Professional)
**Date:** 2026-03-08
**Status:** Active

Defined by user as:
```
Primary: #1F3A5F / Dark: #152A45 / Light: #DCE6F2
Accent:  #FFC145 / Dark: #D99A17 / Light: #FFF1CC
Background: #F7F9FC | Surface: #FFFFFF | Alt: #EEF3F8
Text: #16202B / Secondary: #5F6B78 | Border: #D8E0EA
Support (success only): #50C878
```

CSS variables (`web/src/index.css`):
| Variable | Value |
|---|---|
| `--color-background` | `#F7F9FC` |
| `--color-foreground` | `#16202B` |
| `--color-card` | `#FFFFFF` |
| `--color-card-foreground` | `#16202B` |
| `--color-primary` | `#1F3A5F` |
| `--color-primary-foreground` | `#FFFFFF` |
| `--color-secondary` | `#EEF3F8` |
| `--color-secondary-foreground` | `#16202B` |
| `--color-muted` | `#EEF3F8` |
| `--color-muted-foreground` | `#5F6B78` |
| `--color-accent` | `#FFC145` |
| `--color-accent-foreground` | `#16202B` |
| `--color-border` | `#D8E0EA` |
| `--color-input` | `#D8E0EA` |
| `--color-ring` | `#1F3A5F` |

Hardcoded values in components:
| Element | Color | Hover |
|---|---|---|
| Nav bar background | `#1F3A5F` | — |
| Footer background | `#152A45` | — |
| LOG IN button | `#1F3A5F` | `#152A45` |
| REGISTER button | `#FFC145` | `#D99A17` |
| Hero "Existing Customers" button | `#1F3A5F` | `#152A45` |
| Hero "View Live Rates" button | `#FFC145` | `#D99A17` |
| Hero "Apply Now" button | `#FFC145` | `#D99A17` |
| Info strip background | `#FFC145` | — |
| CTA section background | `#1F3A5F` | — |
| CTA "Apply Now" button | `#FFC145` | `#D99A17` |
| Step number circles | `#1F3A5F` | — |
| CheckCircle icons | `#50C878` (support color) | — |
| Nav hover | — | `#FFC145` |
| Footer sub-text | `#DCE6F2` | — |
| Footer border | `#1F3A5F` | — |
| Logo text | `#1F3A5F` | — |
| Input focus ring | `#1F3A5F` | — |
| Hero overlay | `#1F3A5F/50` | — |
| Hero headline | `#FFFFFF` | — |
| Hero subtext | `#DCE6F2` | — |

Hero image: `https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80`
(Modern luxury home exterior, white/stone facade with landscaping — confirmed working)
Note: `photo-G48h926L2qo` (modern luxury home at dusk) was attempted first but newer alphanumeric Unsplash IDs require API auth to hotlink — only older numeric-format IDs work directly.
