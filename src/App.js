import React, { Component } from 'react';
import { 
	ExtGrid,
	ExtColumn,
	ExtToolbar,
	ExtButton
} from "@sencha/ext-react-modern";
import DialogAdd from './components/DialogAdd';

const Ext = window['Ext'];

class App extends Component {
	state = {
		showDialog: false
	}

	constructor() {
		super()

		var data=[
			{ name: 'Marc', email: 'marc@gmail.com', phone: '42999346585' },
			{ name: 'Nick', email: 'nick@gmail.com', phone: '42999346585' },
			{ name: 'Andy', email: 'andy@gmail.com', phone: '42999346585' }
		]
		this.store = Ext.create('Ext.data.Store', {data: data})
	}

	onAdd = () => {
		this.setState({
			showDialog: true
		});
	}

	onClose = () => {
		this.setState({
			showDialog: false
		});
	}

	onSave = (values) => {
		this.store.add(values);
		this.onClose();
	}

	onDelete = (grid, info) => {
		const store = this.store;

		Ext.Msg.confirm(
			'Excluir?', 
			`Deseja excluir o registro de: "${info.record.get('name')}"`,
			function(btnId) {
				if(btnId == 'yes') {
					store.remove(info.record);
				}
			}
		);
	}

	render() {
		const { showDialog } = this.state;

		return (
			<ExtGrid
				viewport={ true }
				ref={ grid => this.grid = grid }
				title="The Grid"
				store={ this.store }
				onReady={ this.extReactDidMount }
				plugins={{
					rowedit: {}
				}}
			>
				<ExtColumn editable flex={1} text="Nome" dataIndex="name" />
				<ExtColumn editable flex={1} text="Email" dataIndex="email" />
				<ExtColumn editable text="Telefone" dataIndex="phone"  width="200" />
				<ExtColumn
					text="Ações"
					width="50"
					cell={{
						tools: {
							trash: {
								handler: this.onDelete
							}
						}
					}}
				/>
				<ExtToolbar docked="top">
					<ExtButton text="Adicionar novo" handler={this.onAdd} />
				</ExtToolbar>
				<DialogAdd
					showDialog={showDialog}
					onClose={this.onClose}
					onSave={this.onSave}
				/>
			</ExtGrid>
		)
	}

}
export default App;
