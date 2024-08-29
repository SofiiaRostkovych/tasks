import { Locator } from "@playwright/test";

export async function extractSelectedDisplayedValue(
  selectedOption,
): Promise<string> {
  return selectedOption.evaluate(
    (sel) => sel.options[sel.options.selectedIndex].textContent,
  );
}
