import Button, { type IButtonAttrs } from 'flarum/common/components/Button';
import Icon from 'flarum/common/components/Icon';
import type Mithril from 'mithril';

export interface ICheckableButtonAttrs extends IButtonAttrs {
  /**
   * Whether to show a check mark alongside the button's label.
   */
  checked?: boolean;
}

/**
 * A button that displays a check mark when active, used for the group filters.
 */
export default class CheckableButton<CustomAttrs extends ICheckableButtonAttrs = ICheckableButtonAttrs> extends Button<CustomAttrs> {
  protected getButtonContent(children: Mithril.Children): Mithril.ChildArray {
    const content = super.getButtonContent(children);

    if (this.attrs.checked) {
      content.push(<Icon name="fas fa-check" className="Button-icon ButtonCheck" />);
    }

    return content;
  }
}
