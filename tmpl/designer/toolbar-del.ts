/*
    author:xinglie.lkf@alibaba-inc.com
*/
'ref@./toolbar.less';
import Magix, { State } from 'magix';
import StageElements from './stage-elements';
import DHistory from './history';
export default Magix.View.extend({
    tmpl: '@toolbar-del.html',
    init() {
        let update = this.render.bind(this);
        State.on('@{event#history.shift}', update);
        State.on('@{event#stage.select.elements.change}', update);
        State.on('@{event#stage.select.element.props.update}', update);
    },
    render() {
        this.digest({
            elements: State.get('@{stage.select.elements}')
        });
    },
    '@{remove.elements}<click>'(e) {
        if (e.eventTarget.classList.contains('@toolbar.less:toolbar-item-disabled')) {
            return;
        }
        if (StageElements["@{delete.select.elements}"]()) {
            State.fire('@{event#stage.elements.change}');
            DHistory["@{save}"]();
        }
    }
});