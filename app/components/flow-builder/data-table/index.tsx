
import * as React from 'react';
import { MultiGrid, AutoSizer, Index, GridCellProps, SectionRenderedParams, InfiniteLoader } from 'react-virtualized';
import { STYLE, STYLE_BOTTOM_LEFT_GRID, STYLE_TOP_LEFT_GRID, STYLE_TOP_RIGHT_GRID } from './style';
import * as styles from './data-table.scss';

export type Index = {
    index: number;
};
export type IndexRange = {
    startIndex: number;
    stopIndex: number;
};
const map: Map<number, string[]> = new Map();

function getRowData(start: number, stop: number) {
    const tempMap: Map<number, string[]> = new Map();

    for (let i = start; i < stop; i++) {
        const data: string[] = [];
        for (let j = 0; j < 500; j++) {
            data[j] = `r${i}c${j}`;
        }
        tempMap.set(i, data);
    }
    return tempMap;
}

function loadData(startIndex: number, stopIndex: number): Promise<Map<number, string[]>> {
    return new Promise(resolve => {
        resolve(getRowData(startIndex, stopIndex));
    });
}

type Props = {
    title?: string;
};
const MIN_BATCH_SIZE = 100;
const THRESHOLD_SIZE = 100;

export class DataTable extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
        this._onSectionRendered = this._onSectionRendered.bind(this);
    }

    public _onRowsRendered: ({ startIndex, stopIndex }: IndexRange) => void = () => { };

    public render() {
        return (
            <InfiniteLoader
                isRowLoaded={this._isRowLoaded}
                loadMoreRows={this._loadMoreRows}
                threshold={THRESHOLD_SIZE}
                minimumBatchSize={MIN_BATCH_SIZE}
                rowCount={100000}>
                {({ onRowsRendered, registerChild }) => {
                    this._onRowsRendered = onRowsRendered;
                    return (
                        <AutoSizer disableHeight={true}>
                            {({ height, width }) => (
                                <MultiGrid
                                    {...this.state}
                                    ref={registerChild}
                                    onSectionRendered={this._onSectionRendered}
                                    cellRenderer={this._cellRenderer}
                                    columnWidth={75}
                                    columnCount={500}
                                    enableFixedColumnScroll={false}
                                    enableFixedRowScroll={false}
                                    fixedColumnCount={0}
                                    fixedRowCount={1}
                                    height={300}
                                    rowHeight={30}
                                    rowCount={100000}
                                    overscanColumnCount={10}
                                    overscanRowCount={10}
                                    style={STYLE}
                                    styleBottomLeftGrid={STYLE_BOTTOM_LEFT_GRID}
                                    styleTopLeftGrid={STYLE_TOP_LEFT_GRID}
                                    styleTopRightGrid={STYLE_TOP_RIGHT_GRID}
                                    width={width}
                                />
                            )}
                        </AutoSizer>
                    );
                }
                }
            </InfiniteLoader>
        );
    }

    private _isRowLoaded({ index }: Index) {
        return !!map.has(index);
    }

    private _loadMoreRows({ startIndex, stopIndex }: IndexRange) {
        return loadData(startIndex, stopIndex)
            .then((res: Map<number, string[]>) => {
                res.forEach((value, key) => {
                    if (!map.has(key)) {
                        map.set(key, value);
                    }
                });
            });
    }

    private _cellRenderer({ columnIndex, key, rowIndex, style }: GridCellProps) {
        let content;
        const row = map.get(rowIndex);
        if (row !== undefined) {
            content = row[columnIndex];
        } else {
            content = "";
        }
        return (
            <div className={styles.Cell} key={key} style={style}>
                {content}
            </div>
        );
    }

    private _onSectionRendered({ rowStartIndex, rowStopIndex }: SectionRenderedParams) {
        this._onRowsRendered({
            startIndex: rowStartIndex,
            stopIndex: rowStopIndex
        });
    }
}
