# AI Workspace Companion

AI Workplace Productivity Assistant - Full Application Development Prompt

Build a modern, professional, fully responsive SaaS-style web application called "AI Workplace Productivity Assistant" that helps professionals automate and improve workplace productivity using Artificial Intelligence.

Core Objective

Create a frontend-only web application (no backend, no database, no authentication) that provides AI-powered workplace assistance through specialized productivity tools.

The application should feel like a premium SaaS product used by corporate professionals, consultants, managers, researchers, and remote teams.

Technical Requirements

Architecture

Frontend only

No backend required

No login or registration

No user accounts

No database

All functionality handled client-side

Clean and scalable component structure

Recommended Stack

React + TypeScript

Tailwind CSS

shadcn/ui components

Lucide React icons

Responsive design

Modern animations and transitions

Design Requirements

Visual Theme

Create a highly professional SaaS dashboard.

Color Palette

Primary Background:

Navy Blue (#0A192F)

Secondary Background:

Dark Navy (#112240)

Cards:

#1B2A41

Accent Color:

#3B82F6

Success:

#10B981

Warning:

#F59E0B

Text:

White (#FFFFFF)

Light Gray (#CBD5E1)

Design Style

Clean

Modern

Enterprise-grade

Minimalistic

Premium SaaS appearance

Soft shadows

Rounded corners

Smooth hover effects

Professional typography

Layout

Left Sidebar Navigation

Include:

Dashboard

Smart Email Generator

AI Task Planner

AI Research Assistant

AI Settings

Help

Sidebar should:

Collapse on mobile

Be sticky

Include icons

Highlight active page

Dashboard

Create a modern dashboard homepage showing:

Welcome Section

Display:

"Welcome to AI Workplace Productivity Assistant"

Subtitle:

"Automate workplace tasks, generate professional content, and improve productivity with AI."

Stats Cards

Show sample metrics:

Emails Generated

Tasks Planned

Research Reports Created

Productivity Score

Use animated cards.

Quick Actions

Buttons:

Generate Email

Plan Tasks

Start Research

Feature 1: Smart Email Generator

Purpose

Help users create professional workplace emails.

Input Form

Fields:

Email Purpose

Recipient Type

Tone

Key Information

Desired Length

Tone Options

Professional

Friendly

Formal

Persuasive

Executive

AI Prompt Structure

Generate highly contextual outputs using:

"You are an executive communication specialist.

Write a [tone] email intended for [recipient type].

Purpose:
[purpose]

Important details:
[details]

Length:
[length]

Requirements:

Clear subject line

Professional formatting

Strong call to action

Workplace-appropriate language"

Output

Display:

Subject Line

Email Content

Features:

Editable output

Copy button

Regenerate button

Character count

Outputs must be detailed and realistic, not generic placeholder text.

Feature 2: AI Task Planner

Purpose

Convert goals into structured action plans.

Input Form

Fields:

Goal

Deadline

Priority

Team Size

Additional Notes

AI Prompt Structure

"You are a productivity and project management expert.

Create a structured action plan for:

Goal:
[goal]

Deadline:
[deadline]

Priority:
[priority]

Team Size:
[team size]

Additional Notes:
[notes]

Generate:

Key objectives

Action steps

Timeline

Dependencies

Risk factors

Success metrics"

Output

Display:

Objectives

Task Breakdown

Timeline

Milestones

Risks

Recommendations

Features:

Editable content

Copy plan button

Export as text

Output should resemble real project planning documentation.

Feature 3: AI Research Assistant

Purpose

Help users generate workplace research summaries and reports.

Input Form

Fields:

Research Topic

Industry

Research Depth

Research Depth Options

Quick Summary

Standard Analysis

Comprehensive Report

AI Prompt Structure

"You are a senior business analyst.

Research Topic:
[topic]

Industry:
[industry]

Depth:
[depth]

Generate:

Executive Summary

Key Findings

Industry Trends

Opportunities

Risks

Recommendations

Conclusion"

Output

Display:

Executive Summary

Findings

Trends

Recommendations

Conclusion

Features:

Editable output

Copy button

Export button

Outputs must appear AI-generated, professional, and comprehensive.

AI Output Experience

Every AI tool must include:

Output Toolbar

Copy

Edit

Regenerate

Clear

Editable Results

Users must be able to:

Modify generated text

Update sections

Continue editing manually

Loading States

Show:

AI thinking animation

Progress indicators

Skeleton loaders

Responsible AI Section

Display on every AI tool page:

"Responsible AI Notice

This application uses Artificial Intelligence to generate workplace content and recommendations. Outputs should be reviewed and verified before use in professional or business-critical situations. AI-generated content may occasionally contain inaccuracies and should not replace professional judgment."

Style it as a professional information card.

Mobile Responsiveness

Support:

Mobile

Tablet

Desktop

Requirements:

Responsive sidebar

Stacked cards on mobile

Touch-friendly controls

Optimized spacing

User Experience Enhancements

Include:

Smooth page transitions

Hover animations

Loading animations

Tooltips

Toast notifications

Dark SaaS aesthetic

Modern charts on dashboard

Clean empty states

Deliverables

Generate:

Complete frontend application

Fully responsive layout

Modern SaaS dashboard UI

Sidebar navigation

Smart Email Generator

AI Task Planner

AI Research Assistant

Editable AI outputs

Responsible AI disclaimer

Navy-blue professional theme

Important:
Do not generate placeholder or generic responses. Simulate realistic AI-generated workplace content using the structured prompts above. The application must look and feel like a premium enterprise SaaS product used by modern professionals.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/a1f994ec-0085-42a6-aae3-e92dd0e6df57).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
