import React, { Component } from 'react';
import {
    ExtDialog,
    ExtTextfield,
    ExtEmailfield,
    ExtNumberfield
} from '@sencha/ext-react-modern';
// import { Container } from './styles';

export default class DialogAdd extends Component {
    state = {
        currentRecord: {}
    }

    _onChange = ({ sender, newValue }) => {
        this.setState({
            currentRecord: {
                ...this.state.currentRecord,
                [sender.name]: newValue
            }
        });
        sender.focus();
    }

    _onSubmit = () => {
        this.props.onSave(this.state.currentRecord);
        this.setState({
            currentRecord: {}
        });
    }

    render() {
        const { showDialog, onClose, onSave } = this.props;
        const { currentRecord } = this.state;

        return (
            <ExtDialog
                displayed={showDialog}
                title="Adicionar novo"
                width="80%"
                height="40%"
                closable
                maximizable
                closeAction="hide"
                onHide={onClose}
                maskTapHandler={onClose}
                buttonAlign="right"
                buttons= {{
                    ok: {
                        text: 'Salvar',
                        handler: this._onSubmit
                    },
                    cancel: {
                        text: 'Cancelar',
                        margin: '0 0 0 10',
                        handler: onClose
                    }
                }}
            >
                <ExtTextfield 
                    label="Nome"
                    name="name"
                    value={currentRecord.name}
                    onChange={this._onChange}
                />
                <ExtEmailfield 
                    label="Email"
                    name="email"
                    value={currentRecord.email}
                    onChange={this._onChange}
                />
                <ExtNumberfield 
                    label="Telefone"
                    name="phone"
                    value={currentRecord.phone}
                    onChange={this._onChange}
                />
            </ExtDialog>
        );
    }
}
