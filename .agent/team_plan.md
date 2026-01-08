
# Plan for "Team Categories" Separation

The user wants: "die kategorie der teammitgleiucher trennen, zu oberst führung und projektleiter dann buchhaltung und HR, dann produktion."

Since `TeamGridBlock.tsx` currently fetches *all* members and renders them in one grid:
```tsx
const members = await getTeamMembers();
// ...
{members.map(...)}
```

`getTeamMembers()` returns a sorted list.
If I just sort them by `order`, they will be in the correct order but visually in one big grid.
To "separate" them (add spacing/headers), I need to upgrade `TeamGridBlock.tsx` to handle groups or render categories.

**Strategy:**
1.  **Modify `TeamGridBlock.tsx`**: Add logic to group members by `department` field?
    *   BUT: We don't have a `department` field in the CMS Schema yet.
    *   User didn't ask to add schema fields explicitly, but it's the right way.
    *   *Alternative:* Just use hardcoded ranges of indexes? Brittle.
    *   *Alternative:* Check `role`?
    *   *Alternative (Chosen):* Add `department` (Select field) to Team schema in `keystatic.config.ts`.
        *   Options: `management` (Führung & Projektleitung), `office` (Buchhaltung & Personal), `production` (Produktion & Qualität).
2.  **Update `TeamGridBlock`**:
    *   Fetch all members.
    *   Group by department.
    *   Render 3 sections with optional headers? Or just spacers?
    *   User said "trennen" (separate). I will render them in distinct grids with a small header or gap.
3.  **Update Team Member JSONs**: Assign the correct department.

**Wait, simpler approach (No Schema Change if possible?):**
User asked for order + separation.
If I change `TeamGridBlock` to *accept* a filter prop? No, it's automatic.
I WILL add the `department` field. It's the cleanest way to query/sort/group.

**Steps:**
1.  Update `keystatic.config.ts`: Add `department` select to `team` collection.
2.  Update JSONs: Add `department` field to all team members along with their new roles/orders.
3.  Update `TeamGridBlock.tsx`: Group members by department map.
    *   Order: Management > Office > Production.
    *   Render.
