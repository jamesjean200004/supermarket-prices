# MARKDOWN_DOCUMENT_RULES.md

## Scenario-Based Mandatory

触发条件：修改 rule Markdown 文件；Human 要 AI 写一份文档；新建或修改 Team / client-facing 的 Markdown 文档或 `README.md`。入口见 `AGENTS.md` 的 `规则索引：什么任务读哪个文件`。

### 给 Human 看的文档写成信息汇总

- **不写 `.md`**：Human 要 AI 写的文档（说明、计划、runbook、Knowledge Hub 的 Topic 等）写成 `info-summary/` 里的一页信息汇总，按 `prompts/common-prompts/rules/INFO_SUMMARY_HTML_RULES.md` 写，在总索引里一行（2026-11-13 Human 定：Markdown 很难读）。
- **哪些还写 `.md`**：AI 读的规则文件（格式见下面 `Rule Markdown 格式`）、Team / client-facing 文档、`README.md`；完整清单见 `PROJECT_STATE_RULES.md` 的 `Human 会读的都写成信息汇总`。
- **已有的 `.md` 文档**：下次更新它时照 `INFO_SUMMARY_HTML_RULES.md` 的 `已有的 Markdown 汇总` 搬进信息汇总。

### Team / README Markdown 文档结构

Team / client-facing 文档没有 Team 既定 template 时，和 `README.md` 一样默认统一使用：

1. `## Goal`
2. `## 📊 Flow / Status Diagram`
3. `## 🧭 Q&A Table`
4. `## Notes`

Mandatory：

- **Goal**：第一节只回答“这个文档是干什么的 / 要让读者得到什么”；先讲结果和用途，不提前展开正文 detail。
- **Diagram**：默认 Vertical First，从上到下用箭头；展示主要 Steps / Components / Objects，以及必要流程、层级、分支或状态；涉及状态时用 emoji；不把正文 detail 塞进图里。
- **Diagram ↔ Q&A 一一对应**：Q&A Table 固定使用 `问题 | 回答` 两列；每个 Question 针对一个 Diagram 中的 Step / Component / Object；Diagram 有的主要对象必须覆盖，Q&A 不得新增 Diagram 中不存在的主要对象。
- **一件事一行**：每行只针对一个对象 / 一件事，先找最能帮助 Human 理解该对象的问题，再直接回答。
- **Notes**：同样优先 Q&A；只放不能自然归入 Diagram 对象、但确实需要保留的补充说明、边界、历史或 caveat；不能变成第二正文。
- **Rule document 结构例外**：`CODING_STANDARDS.md` / `CODING_STANDARDS_REVIEW.md` 不使用 Goal / Diagram / Q&A；它们模仿 AGENTS 的 requirement model，只保留 `Mandatory Requirements` / `Conditional Requirements` 两个顶层规则区，正文用 Table。
- **Team pattern first**：Team / client-facing 文档有既定 template / required sections 时，以 Team 格式为准；没有时 fallback 到本结构。
- **文件日期**：Human 要求 AI 新建的可读 document file（包括信息汇总）默认必须以 `YYYY-MM-DD-` 开头；固定入口状态文件、AI-only rule files、code/config/generated/machine-readable file 例外。
- **Knowledge Hub 日期必须可追溯**：新增有意义的事实、行动、观察、想法、判断或决定时必须记录实际日期；后来补录时必要时区分发生日期与补录日期；原日期 unknown 就明确写 unknown，不猜。
- **重构不丢内容**：合并、移动、删除旧入口 / 旧文档 / rule 前，先读原文件并分类：仍有效的内容迁入正确文件，有历史 / 复盘价值的内容归档到合适 dated document，确认没丢后才删除。结构变简单不能以丢失内容为代价；已有有效 rule / review gate 不得静默丢失；Git history 不能作为删除有价值内容的唯一理由。
- **非文档 artifact 不机械套用**：Raw archive、generated file、machine-readable data、code/config、原始消息/log 等按自身格式保持。

### Rule Markdown 格式

| 文件 / 类型 | Mandatory format |
|---|---|
| `AGENTS.md` / `WEBCHAT_AGENTS.md` / `PROJECT_LOCAL_OVERRIDES.md` / `prompts/common-prompts/rules/*.md` | 顶层只保留 `## Always Mandatory` 和 `## Scenario-Based Mandatory`；child sections 按主题组织；不得 FAQ 化，不加 Diagram。`prompts/common-prompts/rules/*.md` 另外要在文件开头写清触发条件（触发条件已写在第一段规则里时不重复）。 |
| `CODING_STANDARDS.md` / `CODING_STANDARDS_REVIEW.md` | 同样只保留 Mandatory / Conditional 两个顶层规则区；正文全部使用 Table；中文为主，technical terms / proper nouns / code symbols 保留 English；Standards 与 Review 必须一一对应。 |
| Requirement level | Always Mandatory = 所有场景都必须；Scenario-Based Mandatory = 只有对应场景触发时适用，但一旦触发就是强制。 |
| Zero-context AI 读者 | AI 要遵守的规则（上面所有 rule files、`CODING_STANDARDS*.md`、`*_REVIEW.md`、`prompts/common-prompts/explain/`、模板里的注释）都按“零上下文 AI”来写：读者只有 repo 里的文件，没有任何 Chat 记录。对象写完整名字或路径（例如 Common 第一次出现写 Common repo `common-user-preferences-hub`）；写清在哪个文件、哪个 section、具体怎么做、缺东西时怎么办；不写“以前”“刚才”“我们讨论的”“上面那个”这类要靠聊天才懂的说法；理由写成能核对的事实。写完假装只读这一个文件，确认能照做。 |
| Content preservation | 重构 rule 文件只允许合并重复、调整位置和语言表达；其他要求见上面的 `重构不丢内容`。 |
