# Design Spec: Subagent-Driven Hybrid Context Research Delegation

## 1. Problem Statement & Goals

While recursive context generation resolves the context compression issue in deep directory trees, executing it directly in the controller agent's main session leads to severe **Context Pollution** and **Uncontrolled Token Consumption** (Bill Shock). To solve this, we introduce a **Hybrid Context Update Strategy**:
- Use a lightweight checksum score to determine change severity.
- Perform small inline patches in the current session for minor changes.
- Delegate large/structural research tasks to a specialized subagent asynchronously after explicit user approval with a calculated token/time cost estimate.

---

## 2. Hybrid Update Strategy (Change Severity Score)

When entering a domain or after code modifications, the agent calculates a **Change Severity Score**:

- **Modified/Added File**: `+1 point` per file
- **Directory Structural Change** (new folder, renamed folder): `+5 points`
- **Configuration/Entry Point Change** (e.g. `funnelConfig.ts`, `page.tsx`): `+3 points`

### Execution Branching Rules

| Score | Classification | Action |
| :--- | :--- | :--- |
| **Score = 0** | No Change | Use cached `context.md` directly. No tools or tokens spent. |
| **0 < Score <= 3** | Minor Change | **Inline Patch**: Main agent parses local `git diff` and applies minor text edits to existing `context.md` in the current session. No subagent spawned. |
| **Score > 3** | Large / Structural | **Subagent Delegation**: Show token/time estimate to the user and request approval. If approved, delegate recursive research to a specialized subagent. |

---

## 3. Subagent Delegation Interface

When executing a large/structural update, the subagent is triggered with:
- **TypeName**: `self` (inheriting file read/write and execution permissions)
- **Role**: `Recursive Domain Researcher`
- **Workspace**: `inherit` (sharing uncommitted workspace modifications)

### Subagent Prompt Metadata
- **TargetDirectory**: Relative path to target domain (e.g. `frontend/src/app/login`)
- **PreviousHash**: Git reference point before the changes

---

## 4. Strict Constraints & Gates

<HARD-GATE>
**Execution Isolation**
- The subagent MUST restrict its file reads and modifications strictly to the specified `TargetDirectory` and its subdirectories.
- Reading or writing files outside this subdirectory is strictly forbidden.
</HARD-GATE>

<HARD-GATE>
**Standard Reporting Protocol**
- The subagent must report back using the following exact format upon completion:
  ```markdown
  - **Status**: DONE | DONE_WITH_CONCERNS | BLOCKED
  - **Estimated Tokens Used**: [Calculated token estimate]
  - **Files Updated**: [List of absolute paths to updated context.md files]
  - **Summary**: [3-line summary of major domain changes]
  ```
</HARD-GATE>

<HARD-GATE>
**User Cost Gate**
- The controller agent MUST NOT spawn the `Recursive Domain Researcher` subagent without receiving explicit approval from the user via the cost disclosure prompt.
</HARD-GATE>

<CONSTRAINT>
**Manual Note Preservation**
- Even when updating context via a subagent, any developer notes written under `## 개발자 참고 사항 (Manual Notes)` must be preserved at the top of the file.
</CONSTRAINT>
