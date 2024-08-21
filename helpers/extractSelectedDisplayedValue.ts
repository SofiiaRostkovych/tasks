export async function extractSelectedDisplayedValue(selectedOption) {
  return selectedOption.evaluate(
    (sel) => sel.options[sel.options.selectedIndex].textContent,
  );
}
