# QuoteCraft - Product Requirements Document

**Version:** 1.0
**Date:** 16 March 2026
**Status:** Draft
**Author:** QuoteCraft Product Team

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Problem Statement](#2-problem-statement)
3. [Target Users](#3-target-users)
4. [Product Principles](#4-product-principles)
5. [Feature Specifications](#5-feature-specifications)
6. [User Flows](#6-user-flows)
7. [Data Model](#7-data-model)
8. [Technical Architecture](#8-technical-architecture)
9. [Design Specifications](#9-design-specifications)
10. [Non-Functional Requirements](#10-non-functional-requirements)
11. [Release Phases](#11-release-phases)
12. [Success Metrics](#12-success-metrics)
13. [Open Questions & Risks](#13-open-questions--risks)

---

## 1. Executive Summary

**QuoteCraft** is a fast, offline-first quote estimator web application purpose-built for Australian tradies -- plumbers, electricians, cleaners, painters, landscapers, concreters, tilers, and every other trade professional who needs to produce professional quotes on the go.

### The Pitch

A tradie standing in a client's kitchen should be able to pull out their phone, build a professional quote in under 60 seconds, and share it before they walk back to the ute.

### Key Characteristics

- **Free ($0 pricing)** -- No subscription, no trial, no credit card. Free forever for the core product.
- **Progressive Web App (PWA)** -- Install from the browser, works like a native app, no App Store gatekeeping.
- **Offline-first** -- Full functionality without internet. Quotes are built, saved, and managed locally on-device.
- **Mobile-first** -- Designed for phones first, tablets second, desktop third. Every interaction is optimised for big hands, bright sunlight, and cracked screens on job sites.
- **Australian-native** -- GST built in. ABN support. AUD default. Metric units. Language and patterns that feel right to Australian tradespeople.

### What QuoteCraft Is Not

- It is not an invoicing platform (Phase 2).
- It is not a project management tool.
- It is not a CRM.
- It is not accounting software.

QuoteCraft does one thing exceptionally well: it helps tradies produce professional, accurate quotes quickly.

---

## 2. Problem Statement

### The Current Reality

Australian tradies lose thousands of dollars every year to broken quoting processes. The typical quoting workflow looks like one of these:

1. **The Receipt Scribble** -- Write a rough number on the back of a Bunnings receipt, hand it to the client, then forget what was agreed upon.
2. **The Text Message Quote** -- Send "$3200 for the bathroom, cheers" via SMS with zero breakdown, leading to scope disputes weeks later.
3. **The Bloated Software** -- Pay $40-80/month for software designed for American contractors that takes 15 minutes to produce a single quote and requires a laptop.
4. **The No-Quote** -- Skip quoting entirely, do the work, then argue about the price. This is more common than anyone admits.

Every one of these paths leads to the same place: lost money, lost time, and lost trust.

### Voices from the Field

> *"I quoted a bloke $1,800 for a hot water system swap. Texted him the number. Three weeks later he reckons I said $1,200. No paperwork, no proof, nothing. I ate the difference because I couldn't afford the argument."*
> -- **Mark, 52, solo plumber, Western Sydney**

> *"I tried MYOB for quoting. Took me twenty minutes to figure out how to add a line item. I'm on a roof in Cairns in 38 degrees, I don't have twenty minutes. I went back to texting prices."*
> -- **Jayden, 28, electrician, Cairns**

> *"My girls do 8-10 cleans a day across Brisbane. Every quote is different -- some places are 3-bed, some are end-of-lease, some want ovens done. I need to pump out quotes fast and have them look professional because we're competing against blokes who undercut on price. A proper quote is how we win."*
> -- **Sarah, 36, cleaning business owner, Brisbane**

> *"I downloaded three different apps. One wanted $50 a month. One crashed every time I tried to add a photo. One was so American I couldn't even find where to put GST. Deleted all three."*
> -- **Davo, 41, painter, Melbourne**

### The Core Problem

There is no free, fast, mobile-first quoting tool that respects the way Australian tradies actually work -- standing up, in bright sunlight, with dirty hands, on a phone with a cracked screen, between jobs, with unreliable internet.

---

## 3. Target Users

### Primary Persona: Dave the Solo Plumber

| Attribute | Detail |
|-----------|--------|
| **Name** | Dave Mitchell |
| **Age** | 45 |
| **Location** | Penrith, Western Sydney |
| **Business** | D. Mitchell Plumbing (sole trader) |
| **Team size** | Just Dave |
| **Revenue** | ~$150K/year |
| **Tech comfort** | Low-medium. Uses Facebook, texts, and Google Maps daily. Hates "computer stuff." |
| **Device** | Samsung Galaxy A54 with a cracked screen protector. Never charges it past 60%. |
| **Current quoting** | Texts rough prices or scribbles on paper. Has lost money on at least 4 jobs this year from misquoted prices. |

**Dave's day:**
- Wakes at 5:30am, checks texts for emergency callouts.
- Does 3-5 jobs per day, mostly within a 30km radius.
- Drives between jobs in a Hilux full of gear.
- Quotes on the spot when clients ask. If it takes more than a minute, he will just text a number.
- Invoices at the end of the month using a Word template his daughter set up.
- Hates subscriptions. Hates logins. Hates anything that makes him feel stupid.

**What Dave needs from QuoteCraft:**
- Build a quote in under 60 seconds while standing in someone's laundry.
- Tap, type a number, tap, done. No learning curve.
- Works without WiFi (half his jobs are in new builds with no connection).
- Send a PDF that looks professional so clients trust him.
- Free. Dave will not pay for quoting software on principle.

**Dave's success statement:**
> *"I opened it, tapped a few things, sent the bloke a proper quote before I even got back to the ute. Wish I'd had this ten years ago."*

---

### Secondary Persona: Sarah the Cleaning Crew Boss

| Attribute | Detail |
|-----------|--------|
| **Name** | Sarah Chen |
| **Age** | 36 |
| **Location** | Paddington, Brisbane |
| **Business** | Sparkle & Shine Cleaning Co (Pty Ltd) |
| **Team size** | Sarah + 5 cleaners + 1 part-time admin |
| **Revenue** | ~$420K/year |
| **Tech comfort** | Medium-high. Uses Xero, Google Workspace, and WhatsApp for business. |
| **Device** | iPhone 15 Pro. Also has an iPad she uses at home for admin. |
| **Current quoting** | Google Docs template that she duplicates and fills in. Takes 5-10 minutes per quote. Has 6 different templates for different job types. |

**Sarah's day:**
- Up at 6am, dispatches cleaners to jobs via WhatsApp.
- Handles 2-4 quote requests per day via phone, email, and Facebook messages.
- Does walk-throughs of new properties, quotes on the spot or within an hour.
- Manages repeat clients who need the same quote format every time.
- Invoices weekly through Xero.
- Cares deeply about looking professional -- her brand is how she competes against cheaper operators.

**What Sarah needs from QuoteCraft:**
- Templates for her common job types (standard clean, end-of-lease, commercial, etc).
- Consistent, branded PDFs with her logo and ABN.
- A client list so she can quickly pull up past quotes and re-quote.
- Price book so her standard rates are always correct and consistent.
- Speed. She does not have 10 minutes per quote anymore.

**Sarah's success statement:**
> *"I walked through the property, tapped my end-of-lease template, adjusted the bedrooms from 3 to 4, and emailed the quote before I left the driveway. The client accepted it that afternoon."*

---

## 4. Product Principles

### Workshop Meets Precision Instrument

QuoteCraft should feel like a high-quality tool hanging on a workshop pegboard -- purpose-built, no-nonsense, reliable, satisfying to use. Think less "Silicon Valley app" and more "Casio G-Shock" or "Stanley tape measure." Every element earns its place.

### The Five Principles

#### 1. Fast > Pretty

Speed is the product. If a feature slows down quote creation by even one tap, it must justify its existence. Animations are 100-150ms, snappy and mechanical -- never floaty or decorative. If a tradie in a rush feels the app is wasting their time, we have failed.

#### 2. Offline-First, Always

The app must work identically whether the user is on fast WiFi or standing in a concrete basement with zero signal. There is no "offline mode" -- there is just the app, and it always works. Network connectivity is a bonus for sharing, not a requirement for functioning.

#### 3. Mobile-First, Big-Hands-First

Every tap target is at minimum 44px. Primary actions are anchored to the bottom of the screen where thumbs live. The app is designed for a 375px-wide phone held in one hand by someone with calloused fingers. Desktop is a nice-to-have, not the design target.

#### 4. Respect the Tradie

No patronising onboarding tours. No gamification. No push notification spam. No upsell modals. Tradies are smart, busy professionals. The app should be obvious enough that a 55-year-old sparkie can figure it out without instructions, and powerful enough that a growing business finds real value in it.

#### 5. Every Dollar Matters

Tradies operate on thin margins. Quoting accuracy directly impacts profitability. The app must make it easy to be precise -- auto-calculating totals, GST handling, clear line item breakdowns -- so that tradies quote accurately and get paid what they deserve.

---

## 5. Feature Specifications

### 5.1 Quote Builder (Core Feature)

**Priority:** P0 -- This is 80% of the product.

**Overview:** A single-page, mobile-optimised interface for building a complete quote in under 60 seconds. The quote builder is the heart of QuoteCraft. Everything else exists to support it.

#### User Stories

| ID | Story | Priority |
|----|-------|----------|
| QB-01 | As a tradie, I want to create a new quote with a single tap so I can start quoting immediately. | P0 |
| QB-02 | As a tradie, I want to add line items with description, quantity, unit, and unit price so I can build an accurate breakdown. | P0 |
| QB-03 | As a tradie, I want to see a running total (subtotal, GST, total) at all times so I know where the quote stands. | P0 |
| QB-04 | As a tradie, I want to categorise line items (Labour, Materials, Equipment, Other) so my quotes are organised. | P0 |
| QB-05 | As a tradie, I want to choose from multiple units (hours, each, m², metres, litres, kg, sqm, lm, days, fixed) so I can quote any type of work. | P0 |
| QB-06 | As a tradie, I want my quote to auto-save after every change so I never lose work. | P0 |
| QB-07 | As a tradie, I want to swipe a line item left to delete it so I can remove mistakes quickly. | P0 |
| QB-08 | As a tradie, I want to swipe a line item right to duplicate it so I can add similar items fast. | P1 |
| QB-09 | As a tradie, I want to drag line items to reorder them so my quote reads logically. | P1 |
| QB-10 | As a tradie, I want to add line items from my saved items / price book so I don't retype common items. | P1 |
| QB-11 | As a tradie, I want to create a quote from a template with one tap so common job types are instant. | P1 |
| QB-12 | As a tradie, I want to add a discount (percentage or fixed amount) to the quote. | P1 |
| QB-13 | As a tradie, I want to toggle GST on/off for the entire quote. | P0 |
| QB-14 | As a tradie, I want to add notes/terms to the quote for additional context. | P1 |
| QB-15 | As a tradie, I want to set the quote validity period (7, 14, 30, or 60 days). | P1 |
| QB-16 | As a tradie, I want to assign a client to the quote from my client book. | P1 |
| QB-17 | As a tradie, I want to set the quote status (Draft, Sent, Accepted, Declined, Expired). | P0 |

#### Acceptance Criteria

**Quote Creation:**
- Tapping "New Quote" from the dashboard creates a new quote and navigates to the quote builder in < 200ms.
- A new quote is assigned the next sequential quote number using the configured prefix (e.g., QC-0001).
- The quote builder loads with an empty line items list, the GST toggle set to the business default, and the job title field focused.

**Line Items:**
- The "Add Line Item" button ("+") is anchored to the bottom of the screen, always visible, minimum 48px tall.
- Adding a line item opens an inline form (not a modal or new page) with fields: description (required), category (dropdown, default "Labour"), quantity (numeric, default 1), unit (dropdown, default "hours"), unit price (currency, required).
- Line item total (quantity x unit price) is calculated and displayed in real-time as the user types.
- Completing a line item (tapping "Add" or pressing Enter) adds it to the list and clears the form for the next item.
- Line items display in a compact list showing: description, quantity x unit @ unit price, and line total.

**Totals:**
- A sticky footer displays Subtotal, GST (10%, shown only when GST is enabled), and Total.
- Totals update in real-time as line items are added, edited, or removed.
- If a discount is applied, it appears between Subtotal and GST.
- The sticky footer remains visible during scrolling.

**Auto-Save:**
- Every change to the quote is persisted to IndexedDB within 500ms.
- There is no "Save" button. The quote is always saved.
- A subtle indicator (e.g., small timestamp "Saved just now") confirms persistence without demanding attention.

**Gestures:**
- Swiping a line item left reveals a red "Delete" action. Confirming removes the item and updates totals.
- Swiping a line item right reveals a blue "Duplicate" action. Confirming creates a copy of the item below the original.
- Long-pressing a line item activates drag mode. The item can be dragged to reorder. Other items shift to accommodate.
- All gestures have tactile feedback (haptic on supported devices).

**Quick-Add:**
- When the user starts typing in the description field, matching items from the Price Book are suggested in a dropdown.
- Selecting a suggestion auto-fills all fields (description, category, quantity, unit, unit price).
- The user can modify any auto-filled field before adding.

---

### 5.2 Client Book

**Priority:** P1

**Overview:** A simple contact list for storing client details. This is deliberately not a CRM -- it is a phone book with quote history.

#### User Stories

| ID | Story | Priority |
|----|-------|----------|
| CB-01 | As a tradie, I want to save a client's name, phone, email, and address so I can reuse their details on future quotes. | P0 |
| CB-02 | As a tradie, I want to see all quotes for a specific client so I can track our history. | P1 |
| CB-03 | As a tradie, I want to quick-dial or email a client directly from their contact card. | P1 |
| CB-04 | As a tradie, I want to add notes to a client (e.g., "access code 4521" or "dog in backyard"). | P1 |
| CB-05 | As a tradie, I want to search/filter my client list so I can find people quickly. | P1 |
| CB-06 | As a tradie, I want to add a new client inline while creating a quote so I don't have to leave the quote builder. | P0 |

#### Acceptance Criteria

- The client list displays alphabetically with a search bar at the top.
- Each client card shows: name, phone (tappable to call), email (tappable to compose), and number of quotes.
- Tapping a client opens their detail view showing all fields and a list of their quotes sorted by date (newest first).
- The "Add Client" form requires only a name. All other fields are optional.
- Client data is stored locally in IndexedDB.
- From the quote builder, a "Select Client" action opens the client list as a bottom sheet. A "+" button allows inline creation of a new client without leaving the quote.

---

### 5.3 Quote Templates

**Priority:** P1

**Overview:** Saved sets of line items for common job types. Templates let tradies create a quote for a standard job (e.g., "Hot Water System Replacement" or "3-Bedroom End-of-Lease Clean") with a single tap, then adjust as needed.

#### User Stories

| ID | Story | Priority |
|----|-------|----------|
| QT-01 | As a tradie, I want to save a quote's line items as a template so I can reuse them for similar jobs. | P0 |
| QT-02 | As a tradie, I want to create a new quote from a template with one tap. | P0 |
| QT-03 | As a tradie, I want to edit a template's line items without affecting quotes already created from it. | P1 |
| QT-04 | As a tradie, I want to give each template a name and optional description. | P0 |
| QT-05 | As a tradie, I want to see my templates on the dashboard for quick access. | P1 |

#### Acceptance Criteria

- The "Save as Template" action is available from the quote builder's overflow menu.
- Saving a template captures all current line items (description, category, quantity, unit, unit price, sort order).
- Creating a quote from a template populates the quote builder with the template's line items. The quote is independent -- changes do not affect the template.
- Templates are listed on a dedicated Templates screen, showing name, description, number of line items, and total value.
- Templates can be edited (modify line items, name, description) and deleted.

---

### 5.4 Price Book / Saved Line Items

**Priority:** P1

**Overview:** A global library of individual line items that the tradie uses frequently. Unlike templates (which are groups of items for a job type), the price book contains individual items like "Copper pipe 15mm per metre" or "Call-out fee" that can be added to any quote.

#### User Stories

| ID | Story | Priority |
|----|-------|----------|
| PB-01 | As a tradie, I want to save commonly used line items to a price book so I can add them to quotes quickly. | P0 |
| PB-02 | As a tradie, I want the quote builder to suggest matching price book items as I type. | P0 |
| PB-03 | As a tradie, I want to manage my price book (add, edit, delete items). | P1 |
| PB-04 | As a tradie, I want to update a price in my price book and have future quotes use the new price (without affecting existing quotes). | P1 |

#### Acceptance Criteria

- The price book is accessible from the main navigation.
- Items are displayed in a searchable, filterable list grouped by category.
- Each saved item stores: description, category, default quantity, unit, and unit price.
- From the quote builder, typing in the description field triggers a search against the price book. Matching items appear as suggestions below the input.
- Selecting a price book suggestion populates all line item fields. The user can modify values before adding.
- Price book changes do not retroactively affect existing quotes.

---

### 5.5 PDF Generation & Sharing

**Priority:** P0

**Overview:** Generate a professional PDF quote document and share it via the device's native share sheet (email, SMS, WhatsApp, AirDrop, etc).

#### User Stories

| ID | Story | Priority |
|----|-------|----------|
| PDF-01 | As a tradie, I want to generate a PDF of my quote that looks professional. | P0 |
| PDF-02 | As a tradie, I want the PDF to include my business name, ABN, logo, and contact details. | P0 |
| PDF-03 | As a tradie, I want to share the PDF via email, SMS, WhatsApp, or any app on my phone. | P0 |
| PDF-04 | As a tradie, I want the PDF to include a clear line item breakdown with totals. | P0 |
| PDF-05 | As a tradie, I want the PDF to include my terms and conditions. | P1 |
| PDF-06 | As a tradie, I want to preview the PDF before sharing. | P1 |

#### Acceptance Criteria

- The "Share Quote" button on the quote builder generates a PDF and opens the device's native share sheet.
- PDF generation completes in under 3 seconds on a mid-range device.
- The PDF includes:
  - Business name, ABN, phone, email, address (from Settings).
  - Business logo (if uploaded).
  - Quote number, date, and validity period.
  - Client name and details (if assigned).
  - Job title.
  - Line items table with columns: Description, Category, Qty, Unit, Unit Price, Total.
  - Subtotal, Discount (if applicable), GST (if applicable), and Grand Total.
  - Notes and terms (if provided).
  - Footer with "Created with QuoteCraft" (subtle, small text).
- The PDF renders correctly on all major PDF viewers (Preview, Adobe Reader, Chrome PDF viewer, Google Drive).
- PDF is generated entirely client-side -- no server required.

---

### 5.6 Dashboard

**Priority:** P0

**Overview:** The home screen of QuoteCraft. Shows an overview of active work and provides fast access to creating new quotes.

#### User Stories

| ID | Story | Priority |
|----|-------|----------|
| DB-01 | As a tradie, I want to see my recent quotes at a glance when I open the app. | P0 |
| DB-02 | As a tradie, I want a big, obvious button to create a new quote. | P0 |
| DB-03 | As a tradie, I want to see quick stats (total quoted this month, number of active quotes, acceptance rate). | P1 |
| DB-04 | As a tradie, I want my quotes colour-coded by status so I can scan them quickly. | P1 |
| DB-05 | As a tradie, I want to quickly access my templates from the dashboard. | P1 |

#### Acceptance Criteria

- The dashboard is the default screen when opening the app.
- A prominent "New Quote" button is positioned at the top or centre of the screen, minimum 56px tall, using the accent colour.
- A quick stats strip displays: total value quoted this month, number of active (non-expired, non-declined) quotes, and acceptance rate (accepted / (accepted + declined)).
- Recent quotes are listed below stats, sorted by most recently updated.
- Each quote card displays: quote number, job title, client name (if assigned), total, status badge, and date.
- Status badges are colour-coded:
  - **Draft:** muted/grey
  - **Sent:** accent/orange
  - **Accepted:** success/green
  - **Declined:** error/red
  - **Expired:** warning/amber
- Tapping a quote navigates to the quote builder with that quote loaded.
- The dashboard loads in under 1 second from app launch.

---

### 5.7 Settings

**Priority:** P1

**Overview:** Business configuration and app preferences. Settings are deliberately minimal -- only what is needed for quoting.

#### User Stories

| ID | Story | Priority |
|----|-------|----------|
| ST-01 | As a tradie, I want to enter my business details (name, ABN, phone, email, address) so they appear on quotes. | P0 |
| ST-02 | As a tradie, I want to upload my business logo for quote PDFs. | P1 |
| ST-03 | As a tradie, I want to set default terms and conditions that appear on every quote. | P1 |
| ST-04 | As a tradie, I want to configure my quote numbering prefix and starting number. | P1 |
| ST-05 | As a tradie, I want to set whether GST is included by default on new quotes. | P0 |
| ST-06 | As a tradie, I want to select my currency (AUD, NZD, USD). | P1 |

#### Acceptance Criteria

- Settings are accessible from the main navigation.
- Business details form includes: Business Name, ABN (validated 11-digit format), Phone, Email, Address (single text area).
- Logo upload accepts JPEG and PNG, max 2MB, displayed as a preview after upload. Stored as base64 in IndexedDB.
- Default terms field is a multi-line text area with placeholder text suggesting common terms.
- Quote numbering shows current prefix (default "QC-") and next number (default 0001). Both are editable.
- GST default is a toggle (default: on).
- Currency is a dropdown with options: AUD (default), NZD, USD.
- All settings are saved to IndexedDB immediately on change (same auto-save pattern as quotes).

---

### 5.8 Offline-First Architecture

**Priority:** P0

**Overview:** QuoteCraft must function identically whether the device is online or offline. This is not a fallback mode -- it is the primary operating mode.

#### Technical Requirements

| ID | Requirement | Priority |
|----|------------|----------|
| OF-01 | All data is stored locally in IndexedDB via Dexie.js. | P0 |
| OF-02 | The app shell (HTML, CSS, JS) is cached via a Service Worker for instant loading. | P0 |
| OF-03 | The app is installable as a PWA on Android and iOS. | P0 |
| OF-04 | All features (quote creation, editing, PDF generation, template management, client management) work fully offline. | P0 |
| OF-05 | The app displays no error states related to network connectivity. There are no "you're offline" banners. | P0 |
| OF-06 | Font files are bundled and cached, not loaded from Google Fonts CDN. | P1 |
| OF-07 | The service worker uses a cache-first strategy for all static assets. | P0 |

#### Acceptance Criteria

- Enable airplane mode on the device. Open QuoteCraft. Create a quote with 5 line items, assign a client, generate a PDF, save as template. All actions succeed with zero errors or degraded functionality.
- The app loads from cache in under 2 seconds on subsequent visits, regardless of network state.
- IndexedDB storage is used for all persistent data. No data is stored on a remote server in Phase 1.

---

## 6. User Flows

### 6.1 Creating a Quote

```
1. User opens QuoteCraft (lands on Dashboard)
2. User taps "New Quote" button
3. App creates new quote with next sequential number (e.g., QC-0042)
4. App navigates to Quote Builder with empty quote
5. User taps "Job Title" field, types title (e.g., "Kitchen sink replacement")
6. (Optional) User taps "Add Client" → Client list bottom sheet appears
   6a. User selects existing client, OR
   6b. User taps "+" to create new client inline → enters name → taps "Save"
   6c. Client is assigned to quote
7. User taps "+" (bottom-anchored Add Line Item button)
8. Inline form expands with fields: Description, Category, Qty, Unit, Unit Price
9. User types description (e.g., "Remove existing sink")
   9a. If matching Price Book items exist, suggestions appear below the field
   9b. User may select a suggestion to auto-fill all fields
10. User fills/adjusts remaining fields
11. User taps "Add" → line item appears in list, totals update, form clears
12. User repeats steps 7-11 for additional line items
13. (Optional) User toggles GST on/off
14. (Optional) User adds discount (% or $)
15. (Optional) User adds notes
16. (Optional) User sets validity period
17. Quote is auto-saved throughout — no explicit save action needed
18. User taps "Share" to generate PDF and share, OR
    User taps back to return to Dashboard (quote saved as Draft)
```

### 6.2 Sending a Quote

```
1. User is in Quote Builder with a completed quote
2. User taps "Share" button (prominent, bottom of screen)
3. App generates PDF (< 3 seconds)
4. PDF preview is displayed briefly
5. Native share sheet opens with the PDF attached
6. User selects sharing method (Email, SMS, WhatsApp, AirDrop, etc.)
7. User completes sharing via the chosen app
8. App automatically updates quote status to "Sent"
9. App records sentAt timestamp
10. User returns to Quote Builder (status badge now shows "Sent")
```

### 6.3 Creating a Template

```
1. User is in Quote Builder with a quote that has line items they want to save
2. User taps overflow menu (⋮) in the top-right corner
3. User selects "Save as Template"
4. Modal/bottom sheet appears with fields: Template Name (required), Description (optional)
5. User enters name (e.g., "Hot Water System Replacement")
6. User taps "Save Template"
7. Template is created with all current line items copied
8. Success confirmation appears briefly (toast notification)
9. User returns to the quote (unchanged)

--- Alternatively, creating from the Templates screen: ---

1. User navigates to Templates from the main navigation
2. User taps "New Template"
3. User enters template name and optional description
4. User adds line items using the same interface as the Quote Builder
5. User taps "Save"
6. Template appears in the templates list
```

### 6.4 Adding a Client

```
1. User navigates to Client Book from the main navigation
2. User taps "Add Client" button
3. Form appears with fields: Name (required), Phone, Email, Address, Notes
4. User fills in at minimum the name
5. User taps "Save"
6. Client appears in the alphabetical client list
7. Client is now available for selection when creating quotes

--- Alternatively, inline from Quote Builder: ---

1. User is in Quote Builder
2. User taps "Add Client" / client selector area
3. Client list bottom sheet appears
4. User taps "+" (new client)
5. Minimal form appears: Name (required), Phone, Email
6. User fills in details and taps "Save"
7. New client is created and automatically assigned to the current quote
8. Bottom sheet closes, client name appears on the quote
```

### 6.5 Creating a Quote from a Template

```
1. User is on the Dashboard
2. User taps a template card in the "Quick Start" / Templates section
   --- OR ---
   User taps "New Quote" → then taps "From Template" → selects a template
3. App creates a new quote with the next sequential number
4. All line items from the template are copied into the new quote
5. App navigates to the Quote Builder with the pre-filled quote
6. User adjusts quantities, prices, or adds/removes items as needed
7. User assigns a client, adds job title, and completes the quote
8. Changes to this quote do not affect the source template
```

---

## 7. Data Model

All data is stored locally in IndexedDB via Dexie.js. The following TypeScript interfaces define the data model.

### 7.1 Business

```typescript
interface Business {
  id: string;                          // UUID, singleton record
  name: string;                        // Business name
  abn?: string;                        // Australian Business Number (11 digits)
  phone?: string;                      // Business phone number
  email?: string;                      // Business email
  address?: string;                    // Business address (free text)
  logoUrl?: string;                    // Base64 data URL of uploaded logo
  defaultTerms?: string;              // Default terms & conditions text
  quotePrefix: string;                // Quote number prefix (default: "QC-")
  nextQuoteNumber: number;            // Next sequential quote number (default: 1)
  gstDefault: boolean;               // Whether new quotes include GST by default (default: true)
  currency: "AUD" | "NZD" | "USD";   // Currency code (default: "AUD")
}
```

### 7.2 Client

```typescript
interface Client {
  id: string;              // UUID
  name: string;            // Client name (required)
  phone?: string;          // Phone number
  email?: string;          // Email address
  address?: string;        // Address (free text)
  notes?: string;          // Freeform notes (e.g., "access code 4521")
  createdAt: string;       // ISO 8601 timestamp
}
```

### 7.3 Quote

```typescript
interface Quote {
  id: string;                                              // UUID
  quoteNumber: string;                                     // Formatted number (e.g., "QC-0042")
  clientId?: string;                                       // FK to Client.id
  jobTitle: string;                                        // Job title / description
  lineItems: LineItem[];                                   // Array of line items
  notes?: string;                                          // Additional notes
  discountType?: "percentage" | "fixed";                   // Discount type
  discountValue?: number;                                  // Discount amount (% or $)
  includeGst: boolean;                                     // Whether GST is applied
  validForDays: 7 | 14 | 30 | 60;                        // Quote validity period
  status: "draft" | "sent" | "accepted" | "declined" | "expired";  // Quote status
  createdAt: string;                                       // ISO 8601 timestamp
  updatedAt: string;                                       // ISO 8601 timestamp
  sentAt?: string;                                         // ISO 8601 timestamp (when first sent)
}
```

### 7.4 LineItem

```typescript
interface LineItem {
  id: string;                              // UUID
  description: string;                     // Item description (required)
  category: "Labour" | "Materials" | "Equipment" | "Other";  // Item category
  quantity: number;                        // Quantity (default: 1)
  unit: "hours" | "each" | "m²" | "metres" | "litres" | "kg" | "sqm" | "lm" | "days" | "fixed";  // Unit of measure
  unitPrice: number;                       // Price per unit in cents (stored as integer)
  sortOrder: number;                       // Display order within the quote
}
```

### 7.5 SavedLineItem (Price Book)

```typescript
interface SavedLineItem {
  id: string;                              // UUID
  description: string;                     // Item description
  category: "Labour" | "Materials" | "Equipment" | "Other";  // Item category
  defaultQuantity: number;                // Default quantity when added to a quote
  unit: "hours" | "each" | "m²" | "metres" | "litres" | "kg" | "sqm" | "lm" | "days" | "fixed";
  unitPrice: number;                       // Default price per unit in cents
}
```

### 7.6 QuoteTemplate

```typescript
interface QuoteTemplate {
  id: string;                              // UUID
  name: string;                            // Template name (required)
  description?: string;                    // Optional description
  lineItems: Omit<LineItem, "id">[];      // Line items (IDs generated on use)
  createdAt: string;                       // ISO 8601 timestamp
}
```

### 7.7 IndexedDB Schema (Dexie.js)

```typescript
const db = new Dexie("QuoteCraftDB");

db.version(1).stores({
  business: "id",
  clients: "id, name",
  quotes: "id, quoteNumber, clientId, status, createdAt, updatedAt",
  savedLineItems: "id, description, category",
  quoteTemplates: "id, name, createdAt",
});
```

---

## 8. Technical Architecture

### 8.1 Technology Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| **Build tool** | Vite | Fast HMR, excellent PWA plugin ecosystem, optimised production builds. |
| **Framework** | React 18 | Component model, hooks, widespread ecosystem. Mature and well-understood. |
| **Language** | TypeScript (strict mode) | Type safety across the data model, catch errors at build time, better IDE support. |
| **Styling** | Tailwind CSS v4 | Utility-first, no component library overhead, excellent mobile responsive utilities, fast iteration. |
| **State management** | Zustand | Lightweight, minimal boilerplate, works well with React 18. No Redux complexity. |
| **Forms** | React Hook Form | Performant form handling with minimal re-renders, built-in validation. |
| **Local storage** | Dexie.js (IndexedDB) | Best-in-class IndexedDB wrapper, excellent query API, reliable, well-maintained. |
| **PDF generation** | @react-pdf/renderer | Client-side PDF generation using React components. No server dependency. |
| **Drag & drop** | @dnd-kit | Accessible, performant, supports touch/pointer events, designed for lists. |
| **PWA** | vite-plugin-pwa (Workbox) | Service worker generation, manifest configuration, precaching, cache-first strategies. |
| **Deployment** | Netlify | Free tier sufficient, automatic deploys from Git, HTTPS, global CDN. |

### 8.2 Project Structure

```
quotecraft/
├── public/
│   ├── icons/                    # PWA icons (192x192, 512x512, maskable)
│   ├── manifest.json             # PWA manifest (generated by vite-plugin-pwa)
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── common/               # Shared UI components (Button, Input, Badge, etc.)
│   │   ├── dashboard/            # Dashboard-specific components
│   │   ├── quote-builder/        # Quote builder components
│   │   ├── client-book/          # Client book components
│   │   ├── templates/            # Template management components
│   │   ├── price-book/           # Price book components
│   │   ├── settings/             # Settings components
│   │   └── pdf/                  # PDF template components
│   ├── db/
│   │   ├── database.ts           # Dexie.js database definition and schema
│   │   └── seed.ts               # Optional seed data for development
│   ├── hooks/                    # Custom React hooks
│   ├── stores/                   # Zustand stores
│   ├── types/                    # TypeScript interfaces and types
│   ├── utils/                    # Utility functions (formatting, calculations, etc.)
│   ├── App.tsx                   # Root component with routing
│   ├── main.tsx                  # Entry point
│   └── index.css                 # Global styles, Tailwind directives, font imports
├── docs/
│   └── PRD.md                    # This document
├── index.html
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

### 8.3 Routing

Simple client-side routing using React Router (or lightweight alternative like Wouter):

| Route | Screen |
|-------|--------|
| `/` | Dashboard |
| `/quote/new` | New Quote (Quote Builder) |
| `/quote/:id` | Edit Quote (Quote Builder) |
| `/clients` | Client Book |
| `/clients/:id` | Client Detail |
| `/templates` | Templates List |
| `/templates/:id` | Edit Template |
| `/price-book` | Price Book |
| `/settings` | Settings |

### 8.4 State Architecture

```
┌──────────────────────────────────────────┐
│                Zustand Stores             │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐  │
│  │ quoteStore│ │clientStore│ │ uiStore  │  │
│  └─────┬────┘ └─────┬────┘ └──────────┘  │
│        │             │                     │
│  ┌─────▼─────────────▼─────────────────┐  │
│  │          Dexie.js (IndexedDB)        │  │
│  │  ┌────────┐ ┌───────┐ ┌──────────┐  │  │
│  │  │ quotes │ │clients│ │templates │  │  │
│  │  └────────┘ └───────┘ └──────────┘  │  │
│  │  ┌──────────┐ ┌──────────┐          │  │
│  │  │savedItems│ │ business │          │  │
│  │  └──────────┘ └──────────┘          │  │
│  └─────────────────────────────────────┘  │
└──────────────────────────────────────────┘
```

- **Zustand stores** hold the current UI state and act as the interface between React components and the database.
- **Dexie.js** handles all persistent storage in IndexedDB.
- On app load, stores hydrate from IndexedDB.
- On state change, stores persist to IndexedDB (debounced for performance, max 500ms delay).
- No API layer in Phase 1. All data is local.

### 8.5 PWA Configuration

```typescript
// vite.config.ts (PWA plugin configuration)
{
  registerType: "autoUpdate",
  includeAssets: ["favicon.ico", "icons/*.png", "fonts/*.woff2"],
  manifest: {
    name: "QuoteCraft",
    short_name: "QuoteCraft",
    description: "Fast quote builder for Australian tradies",
    theme_color: "#1A1A1A",
    background_color: "#F5F2ED",
    display: "standalone",
    orientation: "portrait",
    start_url: "/",
    icons: [
      { src: "icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "icons/icon-512-maskable.png", sizes: "512x512", type: "image/png", purpose: "maskable" }
    ]
  },
  workbox: {
    globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2}"],
    runtimeCaching: [] // No runtime caching needed — everything is precached or local
  }
}
```

---

## 9. Design Specifications

### 9.1 Design Philosophy

QuoteCraft's visual language draws from precision instruments, workshop tools, and industrial design. The aesthetic is functional, dense but readable, and quietly confident. It should feel like a tool that was designed by someone who has actually worked on a job site.

**Reference aesthetics:**
- Workshop pegboard -- everything has its place, nothing decorative.
- Architect's specification sheet -- dense information, clear hierarchy, monospaced numbers.
- Casio G-Shock -- rugged, readable, no-nonsense.
- Japanese tool packaging -- meticulous typography, restrained colour, functional beauty.
- Braun 1960s (Dieter Rams era) -- less but better.

### 9.2 Colour Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `bg` | `#F5F2ED` | Page background. Warm off-white, like aged paper. |
| `dark` | `#1A1A1A` | Primary text, headers, key UI elements. |
| `accent` | `#E8580C` | Primary actions (New Quote button, CTAs), links, active states. |
| `text-muted` | `#6B6560` | Secondary text, labels, placeholders, timestamps. |
| `border` | `#DDD8D0` | Dividers, input borders, card separators. |
| `success` | `#2A7D6E` | Accepted status, positive confirmations, success toasts. |
| `error` | `#B84233` | Declined status, delete actions, validation errors. |
| `warning` | `#D4A017` | Expired status, caution states. |

**Usage rules:**
- Accent colour is used sparingly -- only for the single most important action on any screen.
- Status colours are used only in badges and contextual indicators, never as backgrounds for large areas.
- Dark backgrounds are not used in Phase 1 (no dark mode). The warm off-white background is the signature look.

### 9.3 Typography

| Style | Font | Weight | Size | Usage |
|-------|------|--------|------|-------|
| **Heading 1** | DM Mono | 500 (Medium) | 24px / 1.2 | Screen titles |
| **Heading 2** | DM Mono | 500 (Medium) | 18px / 1.3 | Section headers |
| **Heading 3** | DM Mono | 400 (Regular) | 16px / 1.3 | Sub-section headers |
| **Body** | Inter | 400 (Regular) | 15px / 1.5 | Primary body text, descriptions |
| **Body Small** | Inter | 400 (Regular) | 13px / 1.4 | Secondary text, captions, labels |
| **Price / Number** | DM Mono | 500 (Medium) | 16-24px / 1.2 | All monetary values, quantities, quote numbers |
| **Button** | Inter | 500 (Medium) | 15px / 1.0 | Button labels |
| **Input** | Inter | 400 (Regular) | 16px / 1.5 | Form input text (16px minimum to prevent iOS zoom) |

**Typography rules:**
- DM Mono is used for anything that represents precision: headings, prices, numbers, quote numbers.
- Inter is used for everything that should be read comfortably: body text, labels, descriptions.
- All input fields use 16px minimum font size to prevent automatic zoom on iOS Safari.
- Font files are self-hosted (bundled with the app), not loaded from external CDNs.

### 9.4 Layout & Spacing

**Grid & Breakpoints:**
- **Mobile (default):** 375px minimum, single column, 16px horizontal padding.
- **Tablet:** 768px+, content max-width 600px, centred.
- **Desktop:** 1024px+, content max-width 720px, centred.

**Spacing scale (4px base):**
- `xs`: 4px
- `sm`: 8px
- `md`: 12px
- `lg`: 16px
- `xl`: 24px
- `2xl`: 32px
- `3xl`: 48px

**Layout principles:**
- **Flat, not carded.** Sections are separated by horizontal dividers (`border` colour), not wrapped in elevated cards. This saves vertical space and reduces visual noise.
- **Dense but breathable.** Line items in the quote builder are compact (40-48px row height) but have clear separation. Whitespace is used structurally, not decoratively.
- **Bottom-anchored actions.** Primary actions (Add Line Item, Share Quote, New Quote) are anchored to the bottom of the viewport where thumbs naturally rest.
- **No modals for primary flows.** Modals are used only for confirmations and destructive actions. Primary creation flows use inline expansion or full-screen takeovers.

### 9.5 Component Patterns

**Inputs:**
- Height: 48px (touch-friendly).
- Border: 1px solid `border` colour.
- Border-radius: 6px.
- Focus state: 2px solid `accent` outline.
- Labels above inputs, not floating/inside.

**Buttons:**
- Primary: `accent` background, white text, 48px height, 6px border-radius, full-width on mobile.
- Secondary: transparent background, `dark` text, 1px `border` border, 48px height.
- Destructive: `error` background, white text.
- All buttons have active states (slightly darker, 1px translate-y for "press" feel).

**List Items:**
- Height: 48-56px.
- Left-aligned content with right-aligned value/action.
- Swipe actions revealed from left (duplicate, blue) and right (delete, red).
- Dividers between items using `border` colour, full-width.

**Badges (Status):**
- Small, pill-shaped (border-radius: 9999px).
- Background uses status colour at 15% opacity, text uses full status colour.
- Font: Inter, 12px, medium weight.

**Toast Notifications:**
- Bottom of screen, above navigation.
- Dark background (`dark`), white text.
- Auto-dismiss after 3 seconds.
- Slide up animation, 150ms.

### 9.6 Micro-Interactions & Animation

| Interaction | Duration | Easing | Description |
|-------------|----------|--------|-------------|
| Button press | 100ms | ease-out | Slight scale-down (0.97) and translate-y (1px) |
| Toast appear | 150ms | ease-out | Slide up from bottom |
| Toast dismiss | 100ms | ease-in | Slide down |
| Line item add | 150ms | ease-out | Fade in + slight slide from bottom |
| Line item delete | 150ms | ease-in | Slide out to right + fade |
| Swipe reveal | Real-time | spring | Follows finger, snaps to reveal position |
| Drag reorder | Real-time | -- | Item follows pointer, others shift with 100ms transition |
| Page transition | 150ms | ease-in-out | Crossfade between screens |
| Totals update | 100ms | -- | Number changes with no animation (instant, like a calculator) |
| Auto-save indicator | 0ms in, 2000ms out | -- | Appears instantly, fades after 2 seconds |

**Animation rules:**
- Never exceed 200ms for any UI animation.
- Interactions feel mechanical and precise, like clicking a rotary switch. Not soft or bouncy.
- No loading spinners if the operation takes less than 200ms. Show a spinner only after 200ms of waiting.
- Haptic feedback (navigator.vibrate) on: line item add, line item delete, drag start, swipe action confirm.

### 9.7 Iconography

- Use a minimal, consistent icon set (Lucide or Phosphor).
- Icons are 20-24px, stroke-based, 1.5px stroke weight.
- Icons are always accompanied by text labels in navigation. Icon-only buttons are used only for well-established patterns (back arrow, close X, overflow menu).

---

## 10. Non-Functional Requirements

### 10.1 Performance

| Metric | Target | Measurement |
|--------|--------|-------------|
| Interaction latency (tap to response) | < 50ms | User-perceived, measured via Performance API |
| First Contentful Paint | < 1.5s | Lighthouse, on 4G throttled connection |
| Time to Interactive | < 2.0s | Lighthouse, on 4G throttled connection |
| App load (cached/installed PWA) | < 1.0s | From tap to usable dashboard |
| Quote creation (new blank quote) | < 200ms | From tap to quote builder rendered |
| PDF generation | < 3.0s | From tap to share sheet on mid-range device (Samsung Galaxy A54) |
| Line item add | < 100ms | From tap "Add" to item visible in list |
| Auto-save persistence | < 500ms | From data change to IndexedDB write confirmed |
| IndexedDB query (list screens) | < 100ms | For datasets up to 1,000 quotes |

### 10.2 Reliability

- **Offline operation:** 100% of features must work offline. No feature may depend on network connectivity.
- **Data persistence:** Zero data loss. All data is persisted to IndexedDB. The app must recover gracefully from interrupted writes (e.g., app killed mid-save).
- **Error handling:** All errors are caught, logged, and presented to the user as actionable messages (never raw error objects or stack traces).

### 10.3 Accessibility

- **WCAG 2.1 Level AA** compliance.
- Minimum tap target size: 44x44px (following Apple HIG and WCAG 2.5.5).
- Colour contrast ratios: minimum 4.5:1 for body text, 3:1 for large text and UI components.
- All interactive elements are keyboard-accessible (for tablet keyboard users).
- Screen reader support for core flows (quote creation, navigation).
- No information conveyed by colour alone (status badges include text labels).
- Focus indicators visible and clear.

### 10.4 Compatibility

| Browser | Minimum Version | Priority |
|---------|----------------|----------|
| Chrome (Android) | 90+ | P0 |
| Safari (iOS) | 15+ | P0 |
| Firefox (Android) | 100+ | P1 |
| Chrome (Desktop) | 90+ | P1 |
| Safari (Desktop) | 15+ | P1 |
| Firefox (Desktop) | 100+ | P2 |
| Edge (Desktop) | 90+ | P2 |

### 10.5 Security

- No sensitive data is transmitted over the network in Phase 1 (all data is local).
- If logo uploads are stored as base64, validate file type and enforce 2MB max to prevent storage abuse.
- Content Security Policy headers configured on deployment.
- HTTPS enforced (Netlify default).

---

## 11. Release Phases

### Phase 1: MVP (Target: 4-6 weeks)

The minimum product that delivers core value -- a tradie can create, manage, and share professional quotes from their phone.

| Feature | Scope |
|---------|-------|
| **Quote Builder** | Full implementation: line items, categories, units, GST toggle, discount, notes, validity, auto-save, swipe delete/duplicate, drag reorder, quick-add from price book. |
| **Dashboard** | Recent quotes list, status badges, quick stats strip, "New Quote" button, template quick-start. |
| **Client Book** | Add/edit/delete clients, assign to quotes, view quote history per client, search, quick-dial/email. |
| **Quote Templates** | Save quote as template, create quote from template, manage templates. |
| **Price Book** | Add/edit/delete saved items, auto-suggest in quote builder. |
| **PDF Generation** | Professional PDF with business branding, line item table, totals, terms. Share via native share sheet. |
| **Settings** | Business info, logo upload, default terms, quote numbering, GST default, currency. |
| **Offline-First** | Full IndexedDB persistence via Dexie.js, service worker, PWA manifest, installable. |
| **PWA** | Installable on Android and iOS, cached app shell, offline-capable. |

**Phase 1 Definition of Done:**
- A tradie can install the app, configure their business details, create a quote with multiple line items, assign a client, generate a PDF, and share it -- all without any internet connection.
- Quote creation takes under 60 seconds for a 5-item quote using saved items.
- The app scores 90+ on Lighthouse PWA audit.

---

### Phase 2: Growth (Target: 8-12 weeks after Phase 1)

Expand functionality for tradies who are growing their businesses and want more from the tool.

| Feature | Description |
|---------|-------------|
| **Cloud Sync** | Optional account creation and cloud sync. Data encrypted at rest. Sync across devices. Conflict resolution for offline edits. |
| **Dark Mode** | Full dark theme honouring system preference, with manual toggle. |
| **Client Portal** | Shareable link where clients can view, accept, or decline quotes. No login required for clients. |
| **Invoicing** | Convert accepted quotes to invoices. Invoice numbering, payment terms, bank details. PDF invoice generation. |
| **Photo Attachments** | Attach photos to quotes (e.g., photos of the job site, existing damage). Stored locally, synced via cloud. |
| **Analytics** | Monthly/weekly summaries: total quoted, accepted, conversion rate, average quote value, top clients. |

---

### Phase 3: Scale (Target: 6-12 months after Phase 2)

Features for established businesses, teams, and integration into the broader tradesperson ecosystem.

| Feature | Description |
|---------|-------------|
| **Team Features** | Multiple users under one business. Shared client book, templates, and price book. Individual quote ownership. Role-based access (admin, team member). |
| **Integrations: Xero** | Push invoices to Xero. Pull client data. Reconciliation. |
| **Integrations: MYOB** | Push invoices to MYOB. Pull client data. |
| **SMS Notifications** | Send quote links via SMS directly from the app. Delivery confirmation. |
| **Custom Branding** | Custom colours, fonts, and layout for PDF quotes. White-label option. |
| **Quote Follow-Up** | Automated reminders for quotes approaching expiry. Nudge notifications. |
| **Import/Export** | CSV export of all data. Import clients from contacts. Import items from spreadsheet. |

---

## 12. Success Metrics

### Primary Metrics (Phase 1)

| Metric | Target | How Measured |
|--------|--------|-------------|
| **Quote creation time** | < 60 seconds (5-item quote with saved items) | In-app timing from "New Quote" tap to "Share" tap |
| **App load time (installed PWA)** | < 2 seconds | Performance API, measured on mid-range Android |
| **Offline functionality** | 100% of features work offline | Automated test suite run with network disabled |
| **PDF generation time** | < 3 seconds | In-app timing on mid-range Android |
| **Lighthouse PWA score** | 90+ | Lighthouse audit |
| **Lighthouse Performance score** | 90+ | Lighthouse audit |
| **Lighthouse Accessibility score** | 90+ | Lighthouse audit |

### Secondary Metrics (Post-Launch)

| Metric | Target | How Measured |
|--------|--------|-------------|
| **Quotes created per user per week** | > 5 (for active users) | Analytics (Phase 2) |
| **Template usage rate** | > 30% of quotes created from templates | Analytics |
| **Client assignment rate** | > 50% of quotes have a client assigned | Analytics |
| **PWA install rate** | > 40% of returning users install the PWA | Analytics |
| **User retention (30-day)** | > 50% | Analytics |

### North Star Metric

**Number of quotes shared per week across all users.** This single metric captures whether the product is being used for its core purpose -- producing and sending professional quotes to clients.

---

## 13. Open Questions & Risks

### Open Questions

| # | Question | Impact | Proposed Resolution |
|---|----------|--------|-------------------|
| OQ-1 | What is the practical IndexedDB storage limit across target devices, and how many quotes can we store before hitting it? | High -- data loss if limit reached | Research per-browser limits. Implement storage monitoring. Warn users at 80% capacity. Consider data archival strategy. |
| OQ-2 | How does @react-pdf/renderer perform on older/lower-end Android devices? Are there fallback options? | Medium -- PDF generation is a core feature | Benchmark on Samsung Galaxy A14 and similar budget devices. If too slow, investigate jsPDF as a lighter alternative. |
| OQ-3 | What is the migration path from local-only IndexedDB to cloud sync in Phase 2? | High -- must not lose data or break existing installs | Design the data model with sync in mind from day one. Use UUIDs for all IDs (not auto-increment). Include createdAt/updatedAt timestamps on all records. Plan for conflict resolution. |
| OQ-4 | Should we support multiple businesses per device (e.g., a tradie with an ABN and their partner's ABN)? | Low -- affects data model | Defer to Phase 2. Single business in Phase 1 is sufficient for MVP. |
| OQ-5 | How do we handle GST edge cases (GST-free items mixed with taxable items, different GST rates)? | Medium -- accuracy matters for tradies | Phase 1: GST is all-or-nothing per quote (10% on entire subtotal). Phase 2: Per-line-item GST toggle for mixed quotes. |
| OQ-6 | Should the quote number sequence persist across device reinstalls/cache clears? | Medium -- professional continuity | In Phase 1, quote numbers are stored in IndexedDB and lost if data is cleared. In Phase 2, cloud sync solves this. Document this limitation. |
| OQ-7 | What happens when two quotes are created on different devices (Phase 2) with the same quote number? | Medium -- data integrity | Implement server-side quote number assignment in Phase 2. Lock quote number generation to prevent duplicates. |

### Risks

| # | Risk | Likelihood | Impact | Mitigation |
|---|------|-----------|--------|------------|
| R-1 | **IndexedDB storage limits** -- Browsers may restrict IndexedDB storage, especially on iOS Safari where limits are more aggressive. Users with hundreds of quotes and photo attachments could hit limits. | Medium | High | Monitor storage usage. Implement data export before hitting limits. Encourage PWA installation (which grants more storage). Avoid storing large blobs (e.g., compress logo images). |
| R-2 | **PDF rendering inconsistencies** -- @react-pdf/renderer may produce slightly different output across devices/browsers. Complex layouts may render incorrectly. | Medium | Medium | Keep PDF layout simple and well-tested. Test on multiple devices and PDF viewers. Have a fallback rendering path. |
| R-3 | **iOS Safari PWA limitations** -- iOS Safari has historically had limited PWA support (no push notifications, limited background sync, restricted storage). | High | Medium | Design for these limitations from the start. Do not rely on features unavailable in iOS Safari. Test extensively on iOS. |
| R-4 | **Service worker update issues** -- Users may get stuck on old cached versions if service worker updates fail. | Medium | High | Use autoUpdate registration strategy. Implement version check with prompt to refresh. Include manual cache-clear instructions in Settings. |
| R-5 | **User expectations around "free"** -- Users may expect more features (invoicing, cloud sync) at the free tier and be disappointed. | Medium | Low | Set clear expectations on the landing page. Position Phase 1 as a complete, standalone tool. Frame Phase 2 features as optional upgrades. |
| R-6 | **Data loss from device change** -- Without cloud sync (Phase 1), switching phones means losing all data. | High | High | Implement JSON export/import as a stopgap before cloud sync. Prompt users to back up regularly. Make this a compelling reason to adopt cloud sync in Phase 2. |
| R-7 | **Competition from existing tools** -- Tools like ServiceM8, Tradify, and Fergus already serve Australian tradies, albeit at a price. | Medium | Medium | Compete on simplicity and price ($0). These tools are complex and expensive. QuoteCraft is deliberately smaller in scope and infinitely more accessible. |

---

## Appendix A: Glossary

| Term | Definition |
|------|-----------|
| **ABN** | Australian Business Number -- an 11-digit identifier for Australian businesses. |
| **GST** | Goods and Services Tax -- a 10% tax on most goods and services in Australia. |
| **PWA** | Progressive Web App -- a web application that can be installed and used like a native app. |
| **IndexedDB** | A browser-based database API for storing structured data locally. |
| **Tradie** | Australian slang for a tradesperson (plumber, electrician, painter, etc.). |
| **Ute** | Australian slang for a utility vehicle / pickup truck. |
| **Line item** | A single row in a quote representing one charge (e.g., "2 hours labour @ $85/hr"). |
| **Price book** | A saved library of individual line items with default pricing. |
| **Quote template** | A saved group of line items representing a common job type. |

---

## Appendix B: Competitive Landscape

| Product | Price | Platform | Key Difference from QuoteCraft |
|---------|-------|----------|-------------------------------|
| **ServiceM8** | From $29/mo | iOS, Web | Full job management platform. Complex. Overkill for quoting. |
| **Tradify** | From $39/mo | iOS, Android, Web | Full trade business management. High learning curve. |
| **Fergus** | From $55/mo | Web | Focused on larger trade businesses. No offline support. |
| **Invoice2go** | From $5.99/mo | iOS, Android | Primarily invoicing. Quoting is secondary. Not AU-specific. |
| **Quotient** | From $25/mo | Web | Web-only. Desktop-first. No mobile app. |
| **Pen & paper** | Free | Paper | No cost but unprofessional, error-prone, no records. |
| **Text message** | Free | Phone | Instant but zero detail, leads to disputes. |
| **QuoteCraft** | **Free** | **PWA (all platforms)** | **Free, offline-first, mobile-first, Australian-native, fast.** |

---

*This document is a living specification. It will be updated as decisions are made and the product evolves.*
