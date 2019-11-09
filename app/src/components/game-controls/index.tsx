import React from 'react';

interface GameControlClick {
  reset: () => void,
  setColumns: (columns: number) => void,
  setClues: (clues: number) => void,
  columnsSelected: number,
  cluesSelected: number
}

export default class GameControls extends React.Component<GameControlClick> {
  render() {
    return (
      <div className={'row'}>
        <div className={'col-4'}>
          Categoories:
          <select className={'form-control'} value={this.props.columnsSelected} onChange={(ev: any) => this.props.setColumns(Number(ev.target.value))}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </div>
        <div className={'col-4'}>
          Clues:
          <select className={'form-control'} value={this.props.cluesSelected} onChange={(ev: any) => this.props.setClues(Number(ev.target.value))}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </div>
        <div className={'col-4 d-flex flex-column justify-content-end align-items-end'}>
          <button className={'btn btn-danger'} onClick={() => this.props.reset()}>Reset</button>
        </div>
      </div>
    )
  }
}
