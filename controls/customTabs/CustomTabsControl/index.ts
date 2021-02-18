import {IInputs, IOutputs} from "./generated/ManifestTypes";
import * as $ from "jquery";

export class CustomTabsControl implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	// samplePropertyTab1 value
	private _value: any;
	// samplePropertyPanel1 value
	private _value2: any;
	// samplePropertyTab2 value
	private _value3: any;
	// samplePropertyPanel2 value
	private _value4: any;
	// PCF context
	private _context: ComponentFramework.Context<IInputs>;
	// Main container
	private _container: HTMLDivElement;
	// Tabs container
	private _containerTabs: HTMLDivElement;
	// Panels container
	private _containerPanels: HTMLDivElement;
	// Tabs
	private _tab1: HTMLDivElement;
	private _tab2: HTMLDivElement;
	// Panels
	private _panel1: HTMLDivElement;
	private _panel2: HTMLDivElement;

	// Constructor
	constructor(){}

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement)
	{
		// Add control initialization code
		this._context = context;

		// Create the main container
		this._container = document.createElement("div");
		this._container.className = 'main-container';

		// Create the tabs container
		this._containerTabs = document.createElement("div");
		this._containerTabs.className = 'tabs';

		// Create tabs
		this._tab1 = document.createElement("div");
		this._tab1.className = 'tab active';
		this._tab1.setAttribute("data-tab", "tab-1");
		this._tab2 = document.createElement("div");
		this._tab2.className = 'tab';
		this._tab2.setAttribute("data-tab", "tab-2");

		// Create the panels container
		this._containerPanels = document.createElement("div");
		this._containerPanels.className = 'panels';

		// Create panels
		this._panel1 = document.createElement("div");
		this._panel1.className = 'panel active';
		this._panel1.id = 'tab-1';
		this._panel2 = document.createElement("div");
		this._panel2.className = 'panel';
		this._panel2.id = 'tab-2';

		// Gets value from control and puts into elements
		this._value = context.parameters.samplePropertyTab1.raw;
		this._tab1.innerText = this._value;
		this._value2 = context.parameters.samplePropertyPanel1.raw;
		this._panel1.innerText = this._value;
		this._value3 = context.parameters.samplePropertyTab2.raw;
		this._tab2.innerText = this._value3;
		this._value4 = context.parameters.samplePropertyPanel2.raw;
		this._panel2.innerText = this._value4;

		console.log(this._containerPanels)
		console.log(this._container)

		// Append container divs
		this._container.appendChild(this._containerTabs)
		this._container.appendChild(this._containerPanels)

		// Append tabs and panels
		this._containerTabs.appendChild(this._tab1)
		this._containerTabs.appendChild(this._tab2)
		this._containerPanels.appendChild(this._panel1)
		this._containerPanels.appendChild(this._panel2)

		// Append everything to main container
		container.appendChild(this._container)

		// Run jQuery for tab animation stuff
		this.runJquery();

	}

	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		// Add code to update control view
		this._value = context.parameters.samplePropertyTab1.raw;
		this._value2 = context.parameters.samplePropertyPanel1.raw;
		this._value3 = context.parameters.samplePropertyTab2.raw;
		this._value4 = context.parameters.samplePropertyPanel2.raw;
		this._context = context;
		this._tab1.innerText = this._value
		this._panel1.innerText = this._value2
		this._tab2.innerText = this._value3
		this._panel2.innerText = this._value4
	}

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		return {};
	}

	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void
	{
		// Add code to cleanup control if necessary
	}

	private runJquery() {
		$(function(){
			$('div.tabs div').on('click', function(){
				var tab_id = $(this).attr('data-tab');
		
				$('div.tabs div').removeClass('active');
				$('.panel').removeClass('active');
		
				$(this).addClass('active');
				$("#"+tab_id).addClass('active');
			})
		})
	}
}