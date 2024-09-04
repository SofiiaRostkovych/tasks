export class SelectedValueHelper {
  static async extractSelectedDisplayedValue(selectedOption): Promise<string> {
    return selectedOption.evaluate(
      (sel) => sel.options[sel.options.selectedIndex].textContent,
    );
  }
}
