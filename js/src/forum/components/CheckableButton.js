import Button from 'flarum/common/components/Button';
import icon from 'flarum/common/helpers/icon';

export default class CheckableButton extends Button {
  /**
   * Get the template for the button's content.
   *
   * @return {*}
   * @protected
   */
  getButtonContent(children) {
    const prev = super.getButtonContent(children);

    if (this.attrs.checked) prev.push(icon('fas fa-check', { className: 'Button-icon ButtonCheck' }));

    return prev;
  }
}
