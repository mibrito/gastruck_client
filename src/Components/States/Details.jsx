import _ from 'lodash';
import React from 'react';

// components
import {Link} from 'react-router'; 
import {Col, Row} from 'react-bootstrap';
import PanelBox from '../Lib/PanelBox';

// flux
import StatesStore from '../../Flux/States/StatesStore';
import StatesActions from '../../Flux/States/StatesActions';

class States extends React.Component {
	constructor(props) {
		super(props);
		this.displayName = 'States';

		this.state = StatesStore.getState();
		this._onStoreChange = this._onStoreChange.bind(this);
	}

	componentWillMount() {
		StatesActions.loadOne(this.props.params.state);
	}

	componentDidMount() {
		StatesStore.listen(this._onStoreChange);
	}

	componentWillUnmount() {
		StatesStore.unlisten(this._onStoreChange);
	}

	_onStoreChange(state){
		this.setState(state);
	}

	render() {
		var state = this.state.states[this.props.params.state] || {};
		var pathname = this.props.location.pathname;

		return (<div className="states">
			<PanelBox vector={state.cities|| []} pathname={pathname} top="stations" truncate />
		</div>);
	}
}

export default States;
