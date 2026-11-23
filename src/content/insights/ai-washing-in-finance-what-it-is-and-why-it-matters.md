---
title: "AI Washing in finance: What it is and why it matters"
excerpt: "Tenora’s CTO and Co-founder, Nick Corlett, explains AI washing, real AI, and the questions finance teams should be asking."
date: "2026-02-21"
author: "Nick Corlett"
image: "/assets/6999d3bae3ea27cfd33f53e3_AI-washing-Nick-Corlett.png"
imageSrcset: "/assets/6999d3bae3ea27cfd33f53e3_AI-washing-Nick-Corlett-p-500.png 500w, /assets/6999d3bae3ea27cfd33f53e3_AI-washing-Nick-Corlett.png 1063w"
---

“AI-powered” is everywhere.

In many cases, it’s meaningful. In others, it’s marketing.

As AI becomes more embedded in B2B software it’s getting harder to tell the difference between genuine capability and what’s now being called “AI washing.”

We asked our CTO, Nick Corlett, to explain what AI washing actually is, why it’s becoming so common, and what finance teams should look out for.

‍

### How would you define “AI washing” in simple terms?

AI washing is when a company markets something as AI-powered when the underlying technology doesn't meaningfully use AI. It's the gap between the marketing claim and the technical reality. Sometimes it's a rules-based system with an AI label. Sometimes it's basic automation dressed up. Sometimes it's a genuinely useful feature that just isn't AI, and that's fine, except they're calling it AI because it sounds better in a pitch deck.

The simplest test: if you removed the AI branding, would the product work exactly the same way? If yes, it's probably AI washing.

#### 

### From a technical perspective, what’s the difference between automation, rules-based logic, and true AI?

**Automation** is doing a repetitive task without human intervention. A payment that fires on a schedule is automation. There's no intelligence involved. It's just a trigger and an action.

**Rules-based logic** is a step up: if X happens, do Y. If the exchange rate crosses a threshold, send an alert. It's powerful and reliable, but every scenario has to be anticipated and coded in advance. It can't handle ambiguity or situations the developer didn't foresee.

**Genuine AI** is when the system can handle novel situations it wasn't explicitly programmed for. It can interpret unstructured data, recognise patterns, make judgements, and improve over time. When we talk about AI in a meaningful sense, we mean a system that can take a messy CSV it's never seen before and figure out what the columns mean, or look at a client's hedge position in the context of a market move and generate a genuinely contextual recommendation.

All three have their place. The problem isn't using rules-based logic. It's calling it AI when it isn't.

#### 

### Why do you think AI washing has become so common in B2B software, especially in finance?

Two forces colliding. On one side, investors and boards are asking every company what their AI strategy is. On the other, procurement teams at large corporates have started putting "AI capabilities" on their RFP requirements. So there's pressure from both directions to say you do AI, whether you actually do or not.

In finance specifically, the products are complex enough that it's hard for a buyer to tell the difference. A risk dashboard that uses a simple formula looks the same as one that uses machine learning. They both show you a number. The buyer can't look under the hood, so the marketing claim goes unchallenged.

And frankly, some of it is just the hype cycle doing what hype cycles do. Everyone said "cloud-native" ten years ago whether they were or not. Now it's AI. The label changes, the dynamic doesn't.

#### 

### Why is AI washing particularly dangerous when you’re dealing with financial risk and hedging?

Because the consequences of getting it wrong are real money. If a marketing platform's AI recommendation is slightly off, you get a suboptimal ad campaign. If an FX risk platform gives misleading signals about your hedge position, you can end up with material P&L impact.

The danger with AI washing specifically is that it creates false confidence. If a treasurer believes an AI system is monitoring their risk in real-time and generating intelligent alerts, they might reduce their own oversight. But if the "AI" is actually just a static threshold alert that fires at the same level regardless of context, they're getting a false sense of security.

In hedging, context is everything. The same exposure at the same coverage level might be perfectly fine in a low-volatility environment and a serious concern when markets are moving. A system that genuinely understands context behaves very differently from one that's just checking if a number is above or below a line.

#### 

### When you’re building technology, how do you decide whether AI is actually needed?

Start with the problem, not the technology. What is the user actually trying to do? What's difficult about it? Where do they lose time, make mistakes, or miss opportunities?

If the problem has a clear, deterministic solution like a calculation, a workflow, or a rule, then you don't need AI. You need good software engineering. And that's not a lesser outcome. Reliable, well-built software is underrated.

AI earns its place when the problem involves ambiguity, unstructured data, pattern recognition, or decisions that depend on context that's hard to codify. Interpreting a document that could be in any format. Synthesising multiple data points into a recommendation. Spotting a pattern across hundreds of clients that no single person would notice. That's where AI genuinely adds value.

The discipline is being honest about which category your problem falls into. Most features in most products are better served by good engineering. The ones that genuinely benefit from AI, you should invest heavily in those.

#### 

### What’s your approach to building systems that finance teams can trust?

Transparency and control. Finance teams need to understand what a system is doing and why. If you give a treasurer a recommendation, they need to see the reasoning. What data went in, what assumptions were made, what the alternatives are. A black box recommendation is useless to someone whose job is to justify decisions to their CFO.

That means designing for humans in the loop. The system should make people more effective, not replace their judgement. In practice, this looks like: here are three options, here's the trade-off for each, here's what happens under different scenarios. The human decides.

And then there's the boring stuff that actually matters. Audit trails, data integrity, consistent calculations, sensible defaults. Trust comes from a system that works reliably every day, not from flashy features that work sometimes.

#### 

### Before adding AI, what foundations have to be in place in a product like TruHedge?

The data model has to be right. If your exposure data is inconsistent, if your hedge positions don't reconcile with your trades, if your market data is stale, no amount of AI fixes that. Garbage in, garbage out applies more to AI than to anything else, because AI is very good at generating confident-sounding answers from bad data.

Then the workflow architecture. You need clean interfaces between systems, reliable event flows, and a solid permissions model. AI capabilities are most powerful when they can plug into an existing system and act on reliable data through well-defined actions. If the plumbing isn't there, you end up with an AI demo that looks impressive but can't actually do anything in production.

We've been deliberate about building these foundations first. The platform's architecture, how services communicate, how data flows, how actions are authorised, was designed with the expectation that intelligent capabilities would be layered on top. That's a very different starting point from trying to bolt AI onto a legacy system.

### 

### Where do you see AI genuinely adding value in FX risk management over the next few years?

Data ingestion is the most immediate one. Every corporate manages their FX exposures differently. Different formats, different systems, different conventions. AI that can take whatever format a client has and normalise it into something usable eliminates enormous friction.

Proactive monitoring and contextual recommendations. Not just alerting you when a threshold is crossed, but understanding the context: what's your policy, what are current market conditions, what are the trade-offs of acting now versus waiting? That's a problem that genuinely benefits from AI because the number of variables and the context-dependency make it very difficult to codify as rules.

And at scale, pattern recognition across an entire client base. What are companies in similar industries doing? What policy structures correlate with better outcomes? That kind of aggregate intelligence is only possible with AI, and it gets more valuable as the client base grows.

The common thread is that these are all problems where context, ambiguity, and scale make traditional programming insufficient. That's where AI earns its place.

#### 

### What questions should CFOs ask vendors who claim their platform is AI-powered?

First: **Can you show me exactly where AI is used in the product and what it does?** <em>‍</em>

*Not the marketing page, the actual feature. If the answer is vague, that tells you something.*

‍

Second: **What happens if the AI is wrong?**

<em>Is there a human review step? Can I override it? How do I know when it's confident versus when it's guessing? Any vendor building AI responsibly has thought carefully about failure modes.</em><strong><br>‍</strong>

Third: **What data does the AI use, where does it come from, and who controls it?**

*Especially in finance, you need to know whether your data is being used to train models that serve your competitors.*

<br>And honestly, ask them to turn the AI off and show you the product without it. If the product is fundamentally the same, the AI isn't doing much. If it's materially different, that's a good sign.

#### 

### **What this means for finance teams**

AI will play a transformative role in financial technology. That’s not in question.

What matters is how it’s used.

The difference between automation, rules-based logic, and genuine AI isn’t just technical semantics, it has real implications for risk, oversight, and decision-making. Especially in areas like FX hedging, where context matters and mistakes carry financial consequences.

AI washing thrives on opacity. Trust is built on transparency.

For finance teams, the takeaway isn’t to avoid AI. It’s to ask better questions.
