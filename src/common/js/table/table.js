import React, {Component} from "react"
import table  from "./../libs/dnx-web-components/table.min.js"
import toast from "./../libs/dnx-web-components/src/components/alertsNotifications/toast/addToast";
import _ from 'lodash';
import { DtableWrapper, DnxToast } from 'dnxComponents'



const DnxTable = DtableWrapper(table);

export class TableComponent extends Component {
    constructor(props){
        super(props);
        this.panelHeightChange = this.panelHeightChange.bind(this);
        this.debouncedSetTableHeight = _.debounce(this.setTableBodyHeight, 200).bind(
            this
        );
    }
    render() {
        let tableProps = this.getDtableProps(this.props.id, this.props.data, this.props.column, this.props.dtOption, this.props.config);
        console.log("Inside Render", tableProps);
        if(_.isEmpty(tableProps)){
            console.log("Test");
            return [];
        }
        return (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column"
                }}
            >
                <div
                    style={{
                        flex: "auto",
                        overflow: "hidden"
                    }}
                    ref={c => {
                        this.tableContainerRef = c;
                    }}
                >
                    <DnxTable
                        {...tableProps}
                        ref={d => {
                            this.tableRef = d;
                        }}
                    />
                </div>
                <DnxToast />
            </div>
        );
    }

    componentDidMount() {
        this.dTable = this.tableRef.table;
        this.setTableBodyHeight();
        window.addEventListener("resize", this.debouncedSetTableHeight);
        document.body.addEventListener("actionclick", this.handleActionClick);
    }

    componentWillUnmount() {
        // >> IMPORTANT
        window.removeEventListener("resize", this.debouncedSetTableHeight);
        document.body.removeEventListener("actionclick", this.handleActionClick);
    }

    handleActionClick(e) {
        if (e.target.dataset.name === "my-device-table-actions") {
            toast({
                label: `${e.target.value} Action Triggered`,
                message: `For ID: ${e.target.dataset.id}`,
                flavor: "success"
            });
        }
    }

    panelHeightChange() {
        // Defering height change by 300ms to account for panel animation
        setTimeout(() => {
            this.setTableBodyHeight();
        }, 300);
    }

    /**
     * Sets table body height, call this whenever table height needs to be calculated and set
     */
    setTableBodyHeight() {
        /* IMPORTANT
         * Table container should have styles to automatically fill available space.
         */
        const containerHeight = this.tableContainerRef.offsetHeight;
        this.dTable.fitToContainer(containerHeight);
    }

    getDtableProps(id, data, columns, options, config) {
      // console.log("Data from Table ::  ", data);
        const dtOption = [];
        for(let i=0; i < options.length; i++){
         {
            dtOption.push({
                text: options[i],
                action: () => {
                    actionHandler(options[i]);
                }
            });
        }
      }
        const actionHandler = type => {
           const selected = this.dTable.getSelectedItems();
            toast({
                label: `${type} triggered!`,
                message: selected.map(i => i.deviceSerialNumber).join("  |  "),
                flavor: "success"
            });
        };

        const addAction = {
            visible: true,
            action: () => {
                actionHandler("Add");
            }
        };

        console.log("Data from Table ::  ", data);
        const tableConfig = {
            idData: config['uuid'] ? config['uuid'] : 'id',
            data: data,
            columns: columns,
            title: id,
            titleCount: config['titleCount'] ? config['titleCount'] : '',
            lastUpdated: config['lastUpdated'] ? config['lastUpdated'] : '',
            refreshAction: config['refreshAction'] ? config['refreshAction'] : '',
            exportAction: config['exportAction'] ? config['exportAction'] : '',
            filter: config['filter'] ? config['filter'] : '',
            findAction: config['findAction'] ? config['findAction'] : '',
          //  addAction: config['addAction'] ? config['addAction'].actionHandler("Row  | Unselect ") : '',
            addAction: addAction,
            dtOptions: {
                scrollY: 500,
                scrollX: true,
                pagingType: "show_more",
                order: [[0, "asc"]],
                pageLength: 50,
                buttons :  dtOption,
            },
            createdCallBack: function() {
                this.disableActions();
            },
            rowSelect: config['rowSelect'] ? config['rowSelect']: '',
            rowSelectCallback: (id, items, obj, itemObjs) => {
            if (!items.length) this.dTable.disableActions();
            else this.dTable.enableActions();
            actionHandler("Row Select | Unselect ");
            console.log([id, items, obj, itemObjs]);
        },
            dataTableClasses: config['dataTableClasses'] ? config['dataTableClasses']: '',
            layoutBtn: config['layoutBtn'] ? config['layoutBtn']: ''
        };
        console.log("Table Config: ", tableConfig);
        return tableConfig;


    }
    /**
     * Dtable is an uncontrolled component, it handles its own state
     * Instead of updating your app's state, use datatables API directly
     */
    updateData(e){
    	   // https://datatables.net/reference/api/rows.add()
        this.datatable
            .clear()
            .rows.add(this.props.data)
            .draw();
    }
}
