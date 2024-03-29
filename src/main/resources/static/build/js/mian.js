"use strict";
var KISBPM = KISBPM || {};
KISBPM.CONFIG = {
    showRemovedProperties: !1
},
    KISBPM.HEADER_CONFIG = {
        showAppTitle: !0,
        showHeaderMenu: !0,
        showMainNavigation: !0,
        showPageHeader: !0
    };
var KISBPM = KISBPM || {};
if (KISBPM.URL = {
    getModel: function (e) {
        return ACTIVITI.CONFIG.contextRoot + "/model/" + e + "/json"
    },
    getStencilSet: function () {
        return "../flow-editor/editor-app/stencilsets/stencilset.json"
        // return ACTIVITI.CONFIG.contextRoot + '/editor/stencilset?version=' + Date.now();
    },
    putModel: function (modelId) {
        return ACTIVITI.CONFIG.contextRoot + '/model/' + modelId + '/save';

    }
}, !ORYX) var ORYX = {};
if (ORYX.I18N || (ORYX.I18N = {}), ORYX.I18N.Language = "en_us", ORYX.I18N.Oryx || (ORYX.I18N.Oryx = {}), ORYX.I18N.Oryx.title = "Oryx", ORYX.I18N.Oryx.noBackendDefined = "Caution! \nNo Backend defined.\n The requested model cannot be loaded. Try to load a configuration with a save plugin.", ORYX.I18N.Oryx.pleaseWait = "Please wait while loading...", ORYX.I18N.Oryx.notLoggedOn = "Not logged on", ORYX.I18N.Oryx.editorOpenTimeout = "The editor does not seem to be started yet. Please check, whether you have a popup blocker enabled and disable it or allow popups for this site. We will never display any commercials on this site.", ORYX.I18N.AddDocker || (ORYX.I18N.AddDocker = {}), ORYX.I18N.AddDocker.group = "Docker", ORYX.I18N.AddDocker.add = "Add Docker", ORYX.I18N.AddDocker.addDesc = "Add a Docker to an edge, by clicking on it", ORYX.I18N.AddDocker.del = "Delete Docker", ORYX.I18N.AddDocker.delDesc = "Delete a Docker", ORYX.I18N.Arrangement || (ORYX.I18N.Arrangement = {}), ORYX.I18N.Arrangement.groupZ = "Z-Order", ORYX.I18N.Arrangement.btf = "Bring To Front", ORYX.I18N.Arrangement.btfDesc = "Bring to Front", ORYX.I18N.Arrangement.btb = "Bring To Back", ORYX.I18N.Arrangement.btbDesc = "Bring To Back", ORYX.I18N.Arrangement.bf = "Bring Forward", ORYX.I18N.Arrangement.bfDesc = "Bring Forward", ORYX.I18N.Arrangement.bb = "Bring Backward", ORYX.I18N.Arrangement.bbDesc = "Bring Backward", ORYX.I18N.Arrangement.groupA = "Alignment", ORYX.I18N.Arrangement.ab = "Alignment Bottom", ORYX.I18N.Arrangement.abDesc = "Bottom", ORYX.I18N.Arrangement.am = "Alignment Middle", ORYX.I18N.Arrangement.amDesc = "Middle", ORYX.I18N.Arrangement.at = "Alignment Top", ORYX.I18N.Arrangement.atDesc = "Top", ORYX.I18N.Arrangement.al = "Alignment Left", ORYX.I18N.Arrangement.alDesc = "Left", ORYX.I18N.Arrangement.ac = "Alignment Center", ORYX.I18N.Arrangement.acDesc = "Center", ORYX.I18N.Arrangement.ar = "Alignment Right", ORYX.I18N.Arrangement.arDesc = "Right", ORYX.I18N.Arrangement.as = "Alignment Same Size", ORYX.I18N.Arrangement.asDesc = "Same Size", ORYX.I18N.Edit || (ORYX.I18N.Edit = {}), ORYX.I18N.Edit.group = "Edit", ORYX.I18N.Edit.cut = "Cut", ORYX.I18N.Edit.cutDesc = "Cuts the selection into an Oryx clipboard", ORYX.I18N.Edit.copy = "Copy", ORYX.I18N.Edit.copyDesc = "Copies the selection into an Oryx clipboard", ORYX.I18N.Edit.paste = "Paste", ORYX.I18N.Edit.pasteDesc = "Pastes the Oryx clipboard to the canvas", ORYX.I18N.Edit.del = "Delete", ORYX.I18N.Edit.delDesc = "Deletes all selected shapes", ORYX.I18N.EPCSupport || (ORYX.I18N.EPCSupport = {}), ORYX.I18N.EPCSupport.group = "EPC", ORYX.I18N.EPCSupport.exp = "Export EPC", ORYX.I18N.EPCSupport.expDesc = "Export diagram to EPML", ORYX.I18N.EPCSupport.imp = "Import EPC", ORYX.I18N.EPCSupport.impDesc = "Import an EPML file", ORYX.I18N.EPCSupport.progressExp = "Exporting model", ORYX.I18N.EPCSupport.selectFile = "Select an EPML (.empl) file to import.", ORYX.I18N.EPCSupport.file = "File", ORYX.I18N.EPCSupport.impPanel = "Import EPML File", ORYX.I18N.EPCSupport.impBtn = "Import", ORYX.I18N.EPCSupport.close = "Close", ORYX.I18N.EPCSupport.error = "Error", ORYX.I18N.EPCSupport.progressImp = "Import...", ORYX.I18N.ERDFSupport || (ORYX.I18N.ERDFSupport = {}), ORYX.I18N.ERDFSupport.exp = "Export to ERDF", ORYX.I18N.ERDFSupport.expDesc = "Export to ERDF", ORYX.I18N.ERDFSupport.imp = "Import from ERDF", ORYX.I18N.ERDFSupport.impDesc = "Import from ERDF", ORYX.I18N.ERDFSupport.impFailed = "Request for import of ERDF failed.", ORYX.I18N.ERDFSupport.impFailed2 = "An error while importing occurs! <br/>Please check error message: <br/><br/>", ORYX.I18N.ERDFSupport.error = "Error", ORYX.I18N.ERDFSupport.noCanvas = "The xml document has no Oryx canvas node included!", ORYX.I18N.ERDFSupport.noSS = "The Oryx canvas node has no stencil set definition included!", ORYX.I18N.ERDFSupport.wrongSS = "The given stencil set does not fit to the current editor!", ORYX.I18N.ERDFSupport.selectFile = "Select an ERDF (.xml) file or type in the ERDF to import it!", ORYX.I18N.ERDFSupport.file = "File", ORYX.I18N.ERDFSupport.impERDF = "Import ERDF", ORYX.I18N.ERDFSupport.impBtn = "Import", ORYX.I18N.ERDFSupport.impProgress = "Importing...", ORYX.I18N.ERDFSupport.close = "Close", ORYX.I18N.ERDFSupport.deprTitle = "Really export to eRDF?", ORYX.I18N.ERDFSupport.deprText = "Exporting to eRDF is not recommended anymore because the support will be stopped in future versions of the Oryx editor. If possible, export the model to JSON. Do you want to export anyway?", ORYX.I18N.jPDLSupport || (ORYX.I18N.jPDLSupport = {}), ORYX.I18N.jPDLSupport.group = "ExecBPMN", ORYX.I18N.jPDLSupport.exp = "Export to jPDL", ORYX.I18N.jPDLSupport.expDesc = "Export to jPDL", ORYX.I18N.jPDLSupport.imp = "Import from jPDL", ORYX.I18N.jPDLSupport.impDesc = "Import jPDL File", ORYX.I18N.jPDLSupport.impFailedReq = "Request for import of jPDL failed.", ORYX.I18N.jPDLSupport.impFailedJson = "Transformation of jPDL failed.", ORYX.I18N.jPDLSupport.impFailedJsonAbort = "Import aborted.", ORYX.I18N.jPDLSupport.loadSseQuestionTitle = "jBPM stencil set extension needs to be loaded", ORYX.I18N.jPDLSupport.loadSseQuestionBody = "In order to import jPDL, the stencil set extension has to be loaded. Do you want to proceed?", ORYX.I18N.jPDLSupport.expFailedReq = "Request for export of model failed.", ORYX.I18N.jPDLSupport.expFailedXml = "Export to jPDL failed. Exporter reported: ", ORYX.I18N.jPDLSupport.error = "Error", ORYX.I18N.jPDLSupport.selectFile = "Select an jPDL (.xml) file or type in the jPDL to import it!", ORYX.I18N.jPDLSupport.file = "File", ORYX.I18N.jPDLSupport.impJPDL = "Import jPDL", ORYX.I18N.jPDLSupport.impBtn = "Import", ORYX.I18N.jPDLSupport.impProgress = "Importing...", ORYX.I18N.jPDLSupport.close = "Close", ORYX.I18N.Save || (ORYX.I18N.Save = {}), ORYX.I18N.Save.group = "File", ORYX.I18N.Save.save = "Save", ORYX.I18N.Save.saveDesc = "Save", ORYX.I18N.Save.saveAs = "Save As...", ORYX.I18N.Save.saveAsDesc = "Save As...", ORYX.I18N.Save.unsavedData = "There are unsaved data, please save before you leave, otherwise your changes get lost!", ORYX.I18N.Save.newProcess = "New Process", ORYX.I18N.Save.saveAsTitle = "Save as...", ORYX.I18N.Save.saveBtn = "Save", ORYX.I18N.Save.close = "Close", ORYX.I18N.Save.savedAs = "Saved As", ORYX.I18N.Save.saved = "Saved!", ORYX.I18N.Save.failed = "Saving failed.", ORYX.I18N.Save.noRights = "You have no rights to save changes.", ORYX.I18N.Save.saving = "Saving", ORYX.I18N.Save.saveAsHint = "The process diagram is stored under:", ORYX.I18N.File || (ORYX.I18N.File = {}), ORYX.I18N.File.group = "File", ORYX.I18N.File.print = "Print", ORYX.I18N.File.printDesc = "Print current model", ORYX.I18N.File.pdf = "Export as PDF", ORYX.I18N.File.pdfDesc = "Export as PDF", ORYX.I18N.File.info = "Info", ORYX.I18N.File.infoDesc = "Info", ORYX.I18N.File.genPDF = "Generating PDF", ORYX.I18N.File.genPDFFailed = "Generating PDF failed.", ORYX.I18N.File.printTitle = "Print", ORYX.I18N.File.printMsg = "We are currently experiencing problems with the printing function. We recommend using the PDF Export to print the diagram. Do you really want to continue printing?", ORYX.I18N.Grouping || (ORYX.I18N.Grouping = {}), ORYX.I18N.Grouping.grouping = "Grouping", ORYX.I18N.Grouping.group = "Group", ORYX.I18N.Grouping.groupDesc = "Groups all selected shapes", ORYX.I18N.Grouping.ungroup = "Ungroup", ORYX.I18N.Grouping.ungroupDesc = "Deletes the group of all selected Shapes", ORYX.I18N.Loading || (ORYX.I18N.Loading = {}), ORYX.I18N.Loading.waiting = "Please wait...", ORYX.I18N.PropertyWindow || (ORYX.I18N.PropertyWindow = {}), ORYX.I18N.PropertyWindow.name = "Name", ORYX.I18N.PropertyWindow.value = "Value", ORYX.I18N.PropertyWindow.selected = "selected", ORYX.I18N.PropertyWindow.clickIcon = "Click Icon", ORYX.I18N.PropertyWindow.add = "Add", ORYX.I18N.PropertyWindow.rem = "Remove", ORYX.I18N.PropertyWindow.complex = "Editor for a Complex Type", ORYX.I18N.PropertyWindow.text = "Editor for a Text Type", ORYX.I18N.PropertyWindow.ok = "Ok", ORYX.I18N.PropertyWindow.cancel = "Cancel", ORYX.I18N.PropertyWindow.dateFormat = "m/d/y", ORYX.I18N.ShapeMenuPlugin || (ORYX.I18N.ShapeMenuPlugin = {}), ORYX.I18N.ShapeMenuPlugin.drag = "Drag", ORYX.I18N.ShapeMenuPlugin.clickDrag = "Click or drag", ORYX.I18N.ShapeMenuPlugin.morphMsg = "Morph shape", ORYX.I18N.SyntaxChecker || (ORYX.I18N.SyntaxChecker = {}), ORYX.I18N.SyntaxChecker.group = "Verification", ORYX.I18N.SyntaxChecker.name = "Syntax Checker", ORYX.I18N.SyntaxChecker.desc = "Check Syntax", ORYX.I18N.SyntaxChecker.noErrors = "There are no syntax errors.", ORYX.I18N.SyntaxChecker.invalid = "Invalid answer from server.", ORYX.I18N.SyntaxChecker.checkingMessage = "Checking ...", ORYX.I18N.FormHandler || (ORYX.I18N.FormHandler = {}), ORYX.I18N.FormHandler.group = "FormHandling", ORYX.I18N.FormHandler.name = "FormHandler", ORYX.I18N.FormHandler.desc = "Testing from handling", ORYX.I18N.Deployer || (ORYX.I18N.Deployer = {}), ORYX.I18N.Deployer.group = "Deployment", ORYX.I18N.Deployer.name = "Deployer", ORYX.I18N.Deployer.desc = "Deploy to engine", ORYX.I18N.Tester || (ORYX.I18N.Tester = {}), ORYX.I18N.Tester.group = "Testing", ORYX.I18N.Tester.name = "Test process", ORYX.I18N.Tester.desc = "Open the test component to test this process definition", ORYX.I18N.Undo || (ORYX.I18N.Undo = {}), ORYX.I18N.Undo.group = "Undo", ORYX.I18N.Undo.undo = "Undo", ORYX.I18N.Undo.undoDesc = "Undo the last action", ORYX.I18N.Undo.redo = "Redo", ORYX.I18N.Undo.redoDesc = "Redo the last undone action", ORYX.I18N.View || (ORYX.I18N.View = {}), ORYX.I18N.View.group = "Zoom", ORYX.I18N.View.zoomIn = "Zoom In", ORYX.I18N.View.zoomInDesc = "Zoom into the model", ORYX.I18N.View.zoomOut = "Zoom Out", ORYX.I18N.View.zoomOutDesc = "Zoom out of the model", ORYX.I18N.View.zoomStandard = "Zoom Standard", ORYX.I18N.View.zoomStandardDesc = "Zoom to the standard level", ORYX.I18N.View.zoomFitToModel = "Zoom fit to model", ORYX.I18N.View.zoomFitToModelDesc = "Zoom to fit the model size", ORYX.I18N.XFormsSerialization || (ORYX.I18N.XFormsSerialization = {}), ORYX.I18N.XFormsSerialization.group = "XForms Serialization", ORYX.I18N.XFormsSerialization.exportXForms = "XForms Export", ORYX.I18N.XFormsSerialization.exportXFormsDesc = "Export XForms+XHTML markup", ORYX.I18N.XFormsSerialization.importXForms = "XForms Import", ORYX.I18N.XFormsSerialization.importXFormsDesc = "Import XForms+XHTML markup", ORYX.I18N.XFormsSerialization.noClientXFormsSupport = "No XForms support", ORYX.I18N.XFormsSerialization.noClientXFormsSupportDesc = '<h2>Your browser does not support XForms. Please install the <a href="https://addons.mozilla.org/firefox/addon/824" target="_blank">Mozilla XForms Add-on</a> for Firefox.</h2>', ORYX.I18N.XFormsSerialization.ok = "Ok", ORYX.I18N.XFormsSerialization.selectFile = "Select a XHTML (.xhtml) file or type in the XForms+XHTML markup to import it!", ORYX.I18N.XFormsSerialization.selectCss = "Please insert url of css file", ORYX.I18N.XFormsSerialization.file = "File", ORYX.I18N.XFormsSerialization.impFailed = "Request for import of document failed.", ORYX.I18N.XFormsSerialization.impTitle = "Import XForms+XHTML document", ORYX.I18N.XFormsSerialization.expTitle = "Export XForms+XHTML document", ORYX.I18N.XFormsSerialization.impButton = "Import", ORYX.I18N.XFormsSerialization.impProgress = "Importing...", ORYX.I18N.XFormsSerialization.close = "Close", ORYX.I18N.PropertyWindow.title = "Properties", ORYX.I18N.ShapeRepository || (ORYX.I18N.ShapeRepository = {}), ORYX.I18N.ShapeRepository.title = "Shape Repository", ORYX.I18N.Save.dialogDesciption = "Please enter a name, a description and a comment.", ORYX.I18N.Save.dialogLabelTitle = "Title", ORYX.I18N.Save.dialogLabelDesc = "Description", ORYX.I18N.Save.dialogLabelType = "Type", ORYX.I18N.Save.dialogLabelComment = "Revision comment", ORYX.I18N.Perspective || (ORYX.I18N.Perspective = {}), ORYX.I18N.Perspective.no = "No Perspective", ORYX.I18N.Perspective.noTip = "Unload the current perspective", ORYX.I18N.JSONSupport = {
    imp: {
        name: "Import from JSON",
        desc: "Imports a model from JSON",
        group: "Export",
        selectFile: "Select an JSON (.json) file or type in JSON to import it!",
        file: "File",
        btnImp: "Import",
        btnClose: "Close",
        progress: "Importing ...",
        syntaxError: "Syntax error"
    },
    exp: {
        name: "Export to JSON",
        desc: "Exports current model to JSON",
        group: "Export"
    }
}, ORYX.I18N.JSONImport || (ORYX.I18N.JSONImport = {}), ORYX.I18N.JSONImport.title = "JSON Import", ORYX.I18N.JSONImport.wrongSS = "The stencil set of the imported file ({0}) does not match to the loaded stencil set ({1}).", ORYX.I18N.RDFExport || (ORYX.I18N.RDFExport = {}), ORYX.I18N.RDFExport.group = "Export", ORYX.I18N.RDFExport.rdfExport = "Export to RDF", ORYX.I18N.RDFExport.rdfExportDescription = "Exports current model to the XML serialization defined for the Resource Description Framework (RDF)", ORYX.I18N.SyntaxChecker.BPMN || (ORYX.I18N.SyntaxChecker.BPMN = {}), ORYX.I18N.SyntaxChecker.BPMN_NO_SOURCE = "An edge must have a source.", ORYX.I18N.SyntaxChecker.BPMN_NO_TARGET = "An edge must have a target.", ORYX.I18N.SyntaxChecker.BPMN_DIFFERENT_PROCESS = "Source and target node must be contained in the same process.", ORYX.I18N.SyntaxChecker.BPMN_SAME_PROCESS = "Source and target node must be contained in different pools.", ORYX.I18N.SyntaxChecker.BPMN_FLOWOBJECT_NOT_CONTAINED_IN_PROCESS = "A flow object must be contained in a process.", ORYX.I18N.SyntaxChecker.BPMN_ENDEVENT_WITHOUT_INCOMING_CONTROL_FLOW = "An end event must have an incoming sequence flow.", ORYX.I18N.SyntaxChecker.BPMN_STARTEVENT_WITHOUT_OUTGOING_CONTROL_FLOW = "A start event must have an outgoing sequence flow.", ORYX.I18N.SyntaxChecker.BPMN_STARTEVENT_WITH_INCOMING_CONTROL_FLOW = "Start events must not have incoming sequence flows.", ORYX.I18N.SyntaxChecker.BPMN_ATTACHEDINTERMEDIATEEVENT_WITH_INCOMING_CONTROL_FLOW = "Attached intermediate events must not have incoming sequence flows.", ORYX.I18N.SyntaxChecker.BPMN_ATTACHEDINTERMEDIATEEVENT_WITHOUT_OUTGOING_CONTROL_FLOW = "Attached intermediate events must have exactly one outgoing sequence flow.", ORYX.I18N.SyntaxChecker.BPMN_ENDEVENT_WITH_OUTGOING_CONTROL_FLOW = "End events must not have outgoing sequence flows.", ORYX.I18N.SyntaxChecker.BPMN_EVENTBASEDGATEWAY_BADCONTINUATION = "Event-based gateways must not be followed by gateways or subprocesses.", ORYX.I18N.SyntaxChecker.BPMN_NODE_NOT_ALLOWED = "Node type is not allowed.", ORYX.I18N.SyntaxChecker.IBPMN || (ORYX.I18N.SyntaxChecker.IBPMN = {}), ORYX.I18N.SyntaxChecker.IBPMN_NO_ROLE_SET = "Interactions must have a sender and a receiver role set", ORYX.I18N.SyntaxChecker.IBPMN_NO_INCOMING_SEQFLOW = "This node must have incoming sequence flow.", ORYX.I18N.SyntaxChecker.IBPMN_NO_OUTGOING_SEQFLOW = "This node must have outgoing sequence flow.", ORYX.I18N.SyntaxChecker.InteractionNet || (ORYX.I18N.SyntaxChecker.InteractionNet = {}), ORYX.I18N.SyntaxChecker.InteractionNet_SENDER_NOT_SET = "Sender not set", ORYX.I18N.SyntaxChecker.InteractionNet_RECEIVER_NOT_SET = "Receiver not set", ORYX.I18N.SyntaxChecker.InteractionNet_MESSAGETYPE_NOT_SET = "Message type not set", ORYX.I18N.SyntaxChecker.InteractionNet_ROLE_NOT_SET = "Role not set", ORYX.I18N.SyntaxChecker.EPC || (ORYX.I18N.SyntaxChecker.EPC = {}), ORYX.I18N.SyntaxChecker.EPC_NO_SOURCE = "Each edge must have a source.", ORYX.I18N.SyntaxChecker.EPC_NO_TARGET = "Each edge must have a target.", ORYX.I18N.SyntaxChecker.EPC_NOT_CONNECTED = "Node must be connected with edges.", ORYX.I18N.SyntaxChecker.EPC_NOT_CONNECTED_2 = "Node must be connected with more edges.", ORYX.I18N.SyntaxChecker.EPC_TOO_MANY_EDGES = "Node has too many connected edges.", ORYX.I18N.SyntaxChecker.EPC_NO_CORRECT_CONNECTOR = "Node is no correct connector.", ORYX.I18N.SyntaxChecker.EPC_MANY_STARTS = "There must be only one start event.", ORYX.I18N.SyntaxChecker.EPC_FUNCTION_AFTER_OR = "There must be no functions after a splitting OR/XOR.", ORYX.I18N.SyntaxChecker.EPC_PI_AFTER_OR = "There must be no process interface after a splitting OR/XOR.", ORYX.I18N.SyntaxChecker.EPC_FUNCTION_AFTER_FUNCTION = "There must be no function after a function.", ORYX.I18N.SyntaxChecker.EPC_EVENT_AFTER_EVENT = "There must be no event after an event.", ORYX.I18N.SyntaxChecker.EPC_PI_AFTER_FUNCTION = "There must be no process interface after a function.", ORYX.I18N.SyntaxChecker.EPC_FUNCTION_AFTER_PI = "There must be no function after a process interface.", ORYX.I18N.SyntaxChecker.EPC_SOURCE_EQUALS_TARGET = "Edge must connect two distinct nodes.", ORYX.I18N.SyntaxChecker.PetriNet || (ORYX.I18N.SyntaxChecker.PetriNet = {}), ORYX.I18N.SyntaxChecker.PetriNet_NOT_BIPARTITE = "The graph is not bipartite", ORYX.I18N.SyntaxChecker.PetriNet_NO_LABEL = "Label not set for a labeled transition", ORYX.I18N.SyntaxChecker.PetriNet_NO_ID = "There is a node without id", ORYX.I18N.SyntaxChecker.PetriNet_SAME_SOURCE_AND_TARGET = "Two flow relationships have the same source and target", ORYX.I18N.SyntaxChecker.PetriNet_NODE_NOT_SET = "A node is not set for a flowrelationship", ORYX.I18N.Edge = "Edge", ORYX.I18N.Node = "Node", ORYX.I18N.SyntaxChecker.notice = "Move the mouse over a red cross icon to see the error message.", ORYX.I18N.RESIZE || (ORYX.I18N.RESIZE = {}), ORYX.I18N.RESIZE.tipGrow = "Increase canvas size:", ORYX.I18N.RESIZE.tipShrink = "Decrease canvas size:", ORYX.I18N.RESIZE.N = "Top", ORYX.I18N.RESIZE.W = "Left", ORYX.I18N.RESIZE.S = "Down", ORYX.I18N.RESIZE.E = "Right", ORYX.I18N.Layouting || (ORYX.I18N.Layouting = {}), ORYX.I18N.Layouting.doing = "Layouting...", ORYX.I18N.SyntaxChecker.MULT_ERRORS = "Multiple Errors", ORYX.I18N.PropertyWindow || (ORYX.I18N.PropertyWindow = {}), ORYX.I18N.PropertyWindow.oftenUsed = "Often used", ORYX.I18N.PropertyWindow.moreProps = "More Properties", ORYX.I18N.SyntaxChecker.BPMN2 || (ORYX.I18N.SyntaxChecker.BPMN2 = {}), ORYX.I18N.SyntaxChecker.BPMN2_DATA_INPUT_WITH_INCOMING_DATA_ASSOCIATION = "A Data Input must not have any incoming Data Associations.", ORYX.I18N.SyntaxChecker.BPMN2_DATA_OUTPUT_WITH_OUTGOING_DATA_ASSOCIATION = "A Data Output must not have any outgoing Data Associations.", ORYX.I18N.SyntaxChecker.BPMN2_EVENT_BASED_TARGET_WITH_TOO_MANY_INCOMING_SEQUENCE_FLOWS = "Targets of Event-based Gateways may only have one incoming Sequence Flow.", ORYX.I18N.SyntaxChecker.BPMN2_EVENT_BASED_WITH_TOO_LESS_OUTGOING_SEQUENCE_FLOWS = "An Event-based Gateway must have two or more outgoing Sequence Flows.", ORYX.I18N.SyntaxChecker.BPMN2_EVENT_BASED_EVENT_TARGET_CONTRADICTION = "If Message Intermediate Events are used in the configuration, then Receive Tasks must not be used and vice versa.", ORYX.I18N.SyntaxChecker.BPMN2_EVENT_BASED_WRONG_TRIGGER = "Only the following Intermediate Event triggers are valid: Message, Signal, Timer, Conditional and Multiple.", ORYX.I18N.SyntaxChecker.BPMN2_EVENT_BASED_WRONG_CONDITION_EXPRESSION = "The outgoing Sequence Flows of the Event Gateway must not have a condition expression.", ORYX.I18N.SyntaxChecker.BPMN2_EVENT_BASED_NOT_INSTANTIATING = "The Gateway does not meet the conditions to instantiate the process. Please use a start event or an instantiating attribute for the gateway.", ORYX.I18N.SyntaxChecker.BPMN2_GATEWAYDIRECTION_MIXED_FAILURE = "The Gateway must have both multiple incoming and outgoing Sequence Flows.", ORYX.I18N.SyntaxChecker.BPMN2_GATEWAYDIRECTION_CONVERGING_FAILURE = "The Gateway must have multiple incoming but most NOT have multiple outgoing Sequence Flows.", ORYX.I18N.SyntaxChecker.BPMN2_GATEWAYDIRECTION_DIVERGING_FAILURE = "The Gateway must NOT have multiple incoming but must have multiple outgoing Sequence Flows.", ORYX.I18N.SyntaxChecker.BPMN2_GATEWAY_WITH_NO_OUTGOING_SEQUENCE_FLOW = "A Gateway must have a minimum of one outgoing Sequence Flow.", ORYX.I18N.SyntaxChecker.BPMN2_RECEIVE_TASK_WITH_ATTACHED_EVENT = "Receive Tasks used in Event Gateway configurations must not have any attached Intermediate Events.", ORYX.I18N.SyntaxChecker.BPMN2_EVENT_SUBPROCESS_BAD_CONNECTION = "An Event Subprocess must not have any incoming or outgoing Sequence Flow.", ORYX.I18N.SyntaxChecker.BPMN_MESSAGE_FLOW_NOT_CONNECTED = "At least one side of the Message Flow has to be connected.", ORYX.I18N.SyntaxChecker.BPMN2_TOO_MANY_INITIATING_MESSAGES = "A Choreography Activity may only have one initiating message.", ORYX.I18N.SyntaxChecker.BPMN_MESSAGE_FLOW_NOT_ALLOWED = "A Message Flow is not allowed here.", ORYX.I18N.SyntaxChecker.BPMN2_EVENT_BASED_WITH_TOO_LESS_INCOMING_SEQUENCE_FLOWS = "An Event-based Gateway that is not instantiating must have a minimum of one incoming Sequence Flow.", ORYX.I18N.SyntaxChecker.BPMN2_TOO_FEW_INITIATING_PARTICIPANTS = "A Choreography Activity must have one initiating Participant (white).", ORYX.I18N.SyntaxChecker.BPMN2_TOO_MANY_INITIATING_PARTICIPANTS = "A Choreography Acitivity must not have more than one initiating Participant (white).", ORYX.I18N.SyntaxChecker.COMMUNICATION_AT_LEAST_TWO_PARTICIPANTS = "The communication must be connected to at least two participants.", ORYX.I18N.SyntaxChecker.MESSAGEFLOW_START_MUST_BE_PARTICIPANT = "The message flow's source must be a participant.", ORYX.I18N.SyntaxChecker.MESSAGEFLOW_END_MUST_BE_PARTICIPANT = "The message flow's target must be a participant.", ORYX.I18N.SyntaxChecker.CONV_LINK_CANNOT_CONNECT_CONV_NODES = "The conversation link must connect a communication or sub conversation node with a participant.", ORYX.I18N.PropertyWindow.dateFormat = "d/m/y", ORYX.I18N.View.East = "Attributes", ORYX.I18N.View.West = "Modeling Elements", ORYX.I18N.Oryx.title = "Signavio", ORYX.I18N.Oryx.pleaseWait = "Please wait while the Signavio Process Editor is loading...", ORYX.I18N.Edit.cutDesc = "Cuts the selection into the clipboard", ORYX.I18N.Edit.copyDesc = "Copies the selection into the clipboard", ORYX.I18N.Edit.pasteDesc = "Pastes the clipboard to the canvas", ORYX.I18N.ERDFSupport.noCanvas = "The xml document has no canvas node included!", ORYX.I18N.ERDFSupport.noSS = "The Signavio Process Editor canvas node has no stencil set definition included!", ORYX.I18N.ERDFSupport.deprText = "Exporting to eRDF is not recommended anymore because the support will be stopped in future versions of the Signavio Process Editor. If possible, export the model to JSON. Do you want to export anyway?", ORYX.I18N.Save.pleaseWait = "Please wait<br/>while saving...", ORYX.I18N.Save.saveAs = "Save a copy...", ORYX.I18N.Save.saveAsDesc = "Save a copy...", ORYX.I18N.Save.saveAsTitle = "Save a copy...", ORYX.I18N.Save.savedAs = "Copy saved", ORYX.I18N.Save.savedDescription = "The process diagram is stored under", ORYX.I18N.Save.notAuthorized = "You are currently not logged in. Please <a href='/p/login' target='_blank'>log in</a> in a new window so that you can save the current diagram.", ORYX.I18N.Save.transAborted = "The saving request took too long. You may use a faster internet connection. If you use wireless LAN, please check the strength of your connection.", ORYX.I18N.Save.noRights = "You do not have the required rights to store that model. Please check in the <a href='/p/explorer' target='_blank'>Signavio Explorer</a>, if you still have the rights to write in the target directory.", ORYX.I18N.Save.comFailed = "The communication with the Signavio server failed. Please check your internet connection. If the problem resides, please contact the Signavio Support via the envelope symbol in the toolbar.", ORYX.I18N.Save.failed = "Something went wrong when trying to save your diagram. Please try again. If the problem resides, please contact the Signavio Support via the envelope symbol in the toolbar.", ORYX.I18N.Save.exception = "Some exceptions are raised while trying to save your diagram. Please try again. If the problem resides, please contact the Signavio Support via the envelope symbol in the toolbar.", ORYX.I18N.Save.retrieveData = "Please wait, data is retrieving.", ORYX.I18N.ShapeMenuPlugin || (ORYX.I18N.ShapeMenuPlugin = {}), ORYX.I18N.ShapeMenuPlugin.morphMsg = "Transform shape", ORYX.I18N.ShapeMenuPlugin.morphWarningTitleMsg = "Transform shape", ORYX.I18N.ShapeMenuPlugin.morphWarningMsg = "There are child shape which can not be contained in the transformed element.<br/>Do you want to transform anyway?", !Signavio) var Signavio = {};
Signavio.I18N || (Signavio.I18N = {}),
Signavio.I18N.Editor || (Signavio.I18N.Editor = {}),
Signavio.I18N.Editor.Linking || (Signavio.I18N.Editor.Linking = {}),
    Signavio.I18N.Editor.Linking.CreateDiagram = "Create a new diagram",
    Signavio.I18N.Editor.Linking.UseDiagram = "Use existing diagram",
    Signavio.I18N.Editor.Linking.UseLink = "Use web link",
    Signavio.I18N.Editor.Linking.Close = "Close",
    Signavio.I18N.Editor.Linking.Cancel = "Cancel",
    Signavio.I18N.Editor.Linking.UseName = "Adopt diagram name",
    Signavio.I18N.Editor.Linking.UseNameHint = "Replaces the current name of the modeling element ({type}) with the name of the linked diagram.",
    Signavio.I18N.Editor.Linking.CreateTitle = "Establish link",
    Signavio.I18N.Editor.Linking.AlertSelectModel = "You have to select a model.",
    Signavio.I18N.Editor.Linking.ButtonLink = "Link diagram",
    Signavio.I18N.Editor.Linking.LinkNoAccess = "You have no access to this diagram.",
    Signavio.I18N.Editor.Linking.LinkUnavailable = "The diagram is unavailable.",
    Signavio.I18N.Editor.Linking.RemoveLink = "Remove link",
    Signavio.I18N.Editor.Linking.EditLink = "Edit Link",
    Signavio.I18N.Editor.Linking.OpenLink = "Open",
    Signavio.I18N.Editor.Linking.BrokenLink = "The link is broken!",
    Signavio.I18N.Editor.Linking.PreviewTitle = "Preview",
Signavio.I18N.Glossary_Support || (Signavio.I18N.Glossary_Support = {}),
    Signavio.I18N.Glossary_Support.renameEmpty = "No dictionary entry",
    Signavio.I18N.Glossary_Support.renameLoading = "Searching...",
ORYX.I18N.PropertyWindow || (ORYX.I18N.PropertyWindow = {}),
    ORYX.I18N.PropertyWindow.oftenUsed = "Main properties",
    ORYX.I18N.PropertyWindow.moreProps = "More properties",
    ORYX.I18N.PropertyWindow.btnOpen = "Open",
    ORYX.I18N.PropertyWindow.btnRemove = "Remove",
    ORYX.I18N.PropertyWindow.btnEdit = "Edit",
    ORYX.I18N.PropertyWindow.btnUp = "Move up",
    ORYX.I18N.PropertyWindow.btnDown = "Move down",
    ORYX.I18N.PropertyWindow.createNew = "Create new",
ORYX.I18N.PropertyWindow || (ORYX.I18N.PropertyWindow = {}),
    ORYX.I18N.PropertyWindow.oftenUsed = "Main attributes",
    ORYX.I18N.PropertyWindow.moreProps = "More attributes",
    ORYX.I18N.PropertyWindow.characteristicNr = "Cost &amp; Resource Analysis",
    ORYX.I18N.PropertyWindow.meta = "Custom attributes",
ORYX.I18N.PropertyWindow.Category || (ORYX.I18N.PropertyWindow.Category = {}),
    ORYX.I18N.PropertyWindow.Category.popular = "Main Attributes",
    ORYX.I18N.PropertyWindow.Category.characteristicnr = "Cost &amp; Resource Analysis",
    ORYX.I18N.PropertyWindow.Category.others = "More Attributes",
    ORYX.I18N.PropertyWindow.Category.meta = "Custom Attributes",
ORYX.I18N.PropertyWindow.ListView || (ORYX.I18N.PropertyWindow.ListView = {}),
    ORYX.I18N.PropertyWindow.ListView.title = "Edit: ",
    ORYX.I18N.PropertyWindow.ListView.dataViewLabel = "Already existing entries.",
    ORYX.I18N.PropertyWindow.ListView.dataViewEmptyText = "No list entries.",
    ORYX.I18N.PropertyWindow.ListView.addEntryLabel = "Add a new entry",
    ORYX.I18N.PropertyWindow.ListView.buttonAdd = "Add",
    ORYX.I18N.PropertyWindow.ListView.save = "Save",
    ORYX.I18N.PropertyWindow.ListView.cancel = "Cancel",
Signavio.I18N.Buttons || (Signavio.I18N.Buttons = {}),
    Signavio.I18N.Buttons.save = "Save",
    Signavio.I18N.Buttons.cancel = "Cancel",
    Signavio.I18N.Buttons.remove = "Remove",
Signavio.I18N.btn || (Signavio.I18N.btn = {}),
    Signavio.I18N.btn.btnEdit = "Edit",
    Signavio.I18N.btn.btnRemove = "Remove",
    Signavio.I18N.btn.moveUp = "Move up",
    Signavio.I18N.btn.moveDown = "Move down",
Signavio.I18N.field || (Signavio.I18N.field = {}),
    Signavio.I18N.field.Url = "URL",
    Signavio.I18N.field.UrlLabel = "Label";
var KISBPM = KISBPM || {};

function showDialog(e, t) {
    var i = {
        yes: function () {
            t.$digest()
        }
    };
    jQuery.extend(i, e),
        jQuery.Dialog.open(i)
}
KISBPM.eventBus = {
    EVENT_TYPE_EDITOR_READY: "event-type-editor-ready",
    EVENT_TYPE_SELECTION_CHANGE: "event-type-selection-change",
    EVENT_TYPE_TOOLBAR_BUTTON_CLICKED: "event-type-toolbar-button-clicked",
    EVENT_TYPE_ITEM_DROPPED: "event-type-item-dropped",
    EVENT_TYPE_PROPERTY_VALUE_CHANGED: "event-type-property-value-changed",
    EVENT_TYPE_DOUBLE_CLICK: "event-type-double-click",
    EVENT_TYPE_MOUSE_OUT: "event-type-mouse-out",
    EVENT_TYPE_MOUSE_OVER: "event-type-mouse-over",
    EVENT_TYPE_MODEL_SAVED: "event-type-model-saved",
    EVENT_TYPE_HIDE_SHAPE_BUTTONS: "event-type-hide-shape-buttons",
    listeners: {},
    editor: null,
    addListener: function (e, t, i) {
        void 0 !== this.listeners[e] ? this.listeners[e].push({
            scope: i,
            callback: t
        }) : this.listeners[e] = [{
            scope: i,
            callback: t
        }]
    },
    removeListener: function (e, t, i) {
        if (void 0 !== this.listeners[e]) {
            for (var n = this.listeners[e].length, o = [], s = 0; s < n; s++) {
                var r = this.listeners[e][s];
                r.scope === i && r.callback === t || o.push(r)
            }
            this.listeners[e] = o
        }
    },
    hasListener: function (e, t, i) {
        if (void 0 !== this.listeners[e]) {
            var n = this.listeners[e].length;
            if (void 0 === t && void 0 === i) return 0 < n;
            for (var o = 0; o < n; o++) {
                var s = this.listeners[e][o];
                if (s.scope == i && s.callback == t) return !0
            }
        }
        return !1
    },
    dispatch: function (e, t) {
        if (void 0 !== this.listeners[e]) for (var i = this.listeners[e].length, n = 0; n < i; n++) {
            var o = this.listeners[e][n];
            o && o.callback && o.callback.apply(o.scope, [t])
        }
    },
    dispatchOryxEvent: function (e, t) {
        KISBPM.eventBus.editor.handleEvents(e, t)
    }
},
    angular.module("nodeDefModel", ["base"]).service("nodeDefService", ["$rootScope", "baseService", "$compile", function (e, t, i) {
        return {}
    }]).directive("bpmForm", function () {
        return {
            restrict: "AE",
            scope: {
                bpmForm: "=",
                mobileForm: "="
            },
            link: function (s, e, t, i) {
                s.title = t.title;
                var r = s.type = t.type;
                s.selectForm = function (n) {
                    var e = s.getBoCodes();
                    e ? CustUtil.openCustDialog("formSelector", {
                        bo_key_: e,
                        type_: n ? "pc" : "mobile"
                    }, function (e, t) {
                        var i = n ? "bpmForm" : "mobileForm";
                        s.$apply(function () {
                            s[i] || (s[i] = {}),
                                s[i].type = "INNER",
                                s[i].name = e[0].name,
                                s[i].formValue = e[0].key
                        }),
                            jQuery.Dialog.close(t)
                    }) : jQuery.Dialog.warning("配置自定义表单，必须首先选择业务数据模型！")
                },
                    s.authorize = function () {
                        var e = s.getBoCodes();
                        if (e) {
                            var t = r,
                                i = "global" == r ? "全局" : "实例";
                            "node" === r && (t = s.$parent.selectedItem.nodeId, i = s.$parent.selectedItem.title);
                            var n = "/bus/businessPermission/businessPermissionEdit.html?objType=flow&objVal=" + (t = s.$parent.bpmDefSetting.bpmDefinition.key + "-" + t) + "&boKeys=" + e,
                                o = {
                                    title: i + "授权",
                                    width: 800,
                                    height: 600,
                                    modal: !0,
                                    resizable: !0
                                };
                            o.url = n,
                                jQuery.Dialog.open(o)
                        } else jQuery.Dialog.warning("配置业务数据权限，必须首先选择业务数据模型！")
                    },
                    s.getBoCodes = function () {
                        for (var e, t = "", i = 0; e = s.$parent.bpmDefSetting.flow.dataModelList[i++];) t && (t += ","),
                            t += e.code;
                        return t
                    },
                    s.clearForm = function (e) {
                        e.name = "",
                            e.formValue = ""
                    },
                    s.changeFormType = function () {
                        s.bpmForm.name = "",
                            s.bpmForm.formValue = "",
                        s.mobileForm && (s.mobileForm.name = "", s.mobileForm.formValue = "", s.mobileForm.type = s.bpmForm.type)
                    }
            },
            template: '<div class="panel-body" style="min-height: 100px">                                                                                           \t\t<table class="table table-hover table-bordered">                                                                                 \t\t    \t<tr>                                                                                                                                               \t\t    \t\t<th>{{title}}</th>                                                                                                                             \t\t    \t\t<td>                                                                                                                                           \t\t    \t\t\t<select class="form-control" ng-model="bpmForm.type" ng-change="changeFormType()">                                                       \t\t\t\t\t\t\t\t     \t\t\t\t\t\t<option value="">请选择</option>\t\t    \t\t\t\t<option value="INNER">在线表单</option>                                                                                                \t\t    \t\t\t\t<option value="FRAME">URL表单</option>                                                                                                 \t\t    \t\t\t</select>                                                                                                                                  \t\t    \t\t</td>                                                                                                                                          \t\t    \t\t<td ng-if="bpmForm.type==\'INNER\'" ><a href="javascript:void(0);" class="btn btn-info btn-sm" ng-click="authorize()">授权</a></td>            \t\t    \t</tr>                                                                                                                                              \t\t    \t<tr ng-if="bpmForm.type==\'INNER\'" >                                                                                                              \t\t    \t\t<td>PC端</td>                                                                                                                                  \t\t    \t\t<td>  {{bpmForm.name}}  </td>                                                                                                                  \t\t    \t\t<td>                                                                                                                                           \t\t    \t\t\t<a href="javascript:void(0);" class="btn btn-info btn-sm glyphicon glyphicon-search" ng-click="selectForm(true)"></a>                      \t\t    \t\t\t<a href="javascript:void(0);" class="btn btn-info btn-sm glyphicon glyphicon-repeat" ng-click="clearForm(bpmForm)"></a>                    \t\t    \t\t</td>                                                                                                                                          \t\t    \t</tr>                                                                                                                                              \t\t    \t<tr ng-if="bpmForm.type==\'FRAME\'">                                                                                                               \t\t    \t\t<td>PC端URL:</td>                                                                                                                              \t\t    \t\t<td> <input ng-model="bpmForm.formValue" class="form-control"></td>                                                                            \t\t    \t</tr>                                                                                                                                              \t\t    \t                                                                                                                                                   \t\t    \t<tr  ng-if="bpmForm.type==\'INNER\'" >                                                                                                             \t\t    \t\t<td>移动端</td>                                                                                                                                \t\t    \t\t<td>  {{mobileForm.name}} </td>                                                                                                                \t\t    \t\t<td>                                                                                                                                           \t\t    \t\t\t<a href="javascript:void(0);" class="btn btn-info btn-sm  glyphicon glyphicon-search" ng-click="selectForm(false)"></a>                    \t\t    \t\t\t<a href="javascript:void(0);" class="btn btn-info btn-sm glyphicon glyphicon-repeat" ng-click="clearForm(mobileForm)"></a>                 \t\t    \t\t</td>\t\t\t\t\t\t\t\t\t                                                                                                       \t\t    \t</tr>                                                                                                                                              \t\t    \t                                                                                                                                                   \t\t    \t<tr ng-if="bpmForm.type==\'FRAME\'">                                                                                                               \t\t    \t\t<td>移动端URL:</td>                                                                                                                            \t\t    \t\t<td> <input ng-model="mobileForm.formValue" class="form-control"></td>                                                                         \t\t    \t</tr>                                                                                                                                              \t    \t\t<tr ng-if="bpmForm.type==\'FRAME\' && type != \'instance\'">                                                                                                               \t    \t\t\t<td>URL表单处理器</td>                                                                                                                              \t    \t\t\t<td> <input ng-model="bpmForm.formHandler" class="form-control"></td>                                                                            \t    \t\t</tr>\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t   \t\t    </table>                                                                                                                                               \t\t    </div>'
        }
    }).directive("bpmNodeRules", ["baseService", function (e) {
        return {
            restrict: "A",
            scope: !0,
            link: function (o, e, t) {
                o.editRule = function (e) {
                    o.getCurrentNodePlugins().ruleSkip || (o.getCurrentNodePlugins().ruleSkip = []);
                    var t = {}; - 1 != e && (t = angular.copy(o.getCurrentNodePlugins().ruleSkip[e]));
                    var i = o.selectedItem.nodeId;
                    showDialog({
                        url: "/bpm/nodeDef/jumpRuleDialog.html?defId=" + bpmDefId + "&nodeId=" + i,
                        width: 660,
                        height: 500,
                        title: "自由跳转规则插件配置" + i,
                        passData: {
                            rule: t,
                            index: e,
                            nodeMap: o.bpmDefSetting.nodeMap
                        },
                        ok: function (e, t) {
                            var i = t.getData(),
                                n = t.passData.index;
                            i && (o.$apply(function () {
                                -1 < n ? o.getCurrentNodePlugins().ruleSkip[n] = i : o.getCurrentNodePlugins().ruleSkip.push(i)
                            }), layer.close(e))
                        }
                    })
                },
                    o.remove = function (e) {
                        o.getCurrentNodePlugins().ruleSkip.splice(e, 1)
                    }
            },
            template: '<div>\t\t\t\t\t<div class="btn btn-primary glyphicon glyphicon-plus" ng-click="editRule(-1)"></div>\t\t\t\t\t<div><div class="alert alert-info" role="alert" ng-if="!getCurrentNodePlugins().ruleSkip||getCurrentNodePlugins().ruleSkip.length==0">尚未配置节点规则</div>\t\t\t\t\t<div class="list-group">\t\t\t\t\t  <a href="#" class="list-group-item" ng-repeat="rule in getCurrentNodePlugins().ruleSkip">\t\t\t\t\t    <h4 class="list-group-item-heading">{{rule.name}}\t\t\t\t\t\t\t<span class="btn btn-danger glyphicon glyphicon-trash pull-right" ng-click="remove($index)"></span>\t\t\t\t\t\t\t<span class="btn btn-primary glyphicon glyphicon-edit pull-right" ng-click="editRule($index)"></span>\t\t\t\t\t\t</h4>\t\t\t\t\t    <p class="list-group-item-text">\t\t\t\t\t\t\t<span class="btn">跳至:{{rule.targetNodeDesc}}({{rule.targetNode}})</span>\t\t\t\t\t\t</p>\t\t\t\t\t  </a>\t\t\t\t\t</div>\t\t\t\t<div>',
            replace: !0
        }
    }]).directive("bpmEventScript", ["baseService", function (e) {
        return {
            restrict: "A",
            scope: !0,
            link: function (o, e, t) {
                var i = {
                    taskCreate: '任务创建时候执行，可以使用[variableScope]操作流程变量,eg:variableScope.setVariable("total", 100);等',
                    taskComplete: '任务完成时候执行，可以使用[variableScope]操作变量,eg:variableScope.setVariable("total", 100);等',
                    startEvent: '该脚本在流程启动时执行，用户可以使用[variableScope]操作变量， 例如设置流程变量:variableScope.setVariable("total", 100);',
                    endEvent: "该脚本在流程终止时执行",
                    manualEnd: "该脚本在流程人工终止时执行"
                };
                o.editEventScript = function (n) {
                    o.getCurrentNodePlugins().nodeScript || (o.getCurrentNodePlugins().nodeScript = {});
                    var e = o.selectedItem.nodeId;
                    showDialog({
                        url: "/bpm/definition/definitionScriptDialog.html?defId=" + bpmDefId + "&nodeId=" + e,
                        width: 840,
                        height: 530,
                        title: "事件脚本设置　" + e,
                        passData: {
                            script: o.getCurrentNodePlugins().nodeScript[n],
                            notice: i[n]
                        },
                        ok: function (e, t) {
                            var i = t.getData();
                            o.$apply(function () {
                                o.getCurrentNodePlugins().nodeScript[n] = i
                            }),
                                layer.close(e)
                        }
                    })
                }
            },
            template: '<div>\t\t\t\t<fieldset class="scheduler-border well" ng-if="selectedItem.nodeType==\'StartNoneEvent\'">\t\t\t\t\t<legend style=" width: 90px;border-bottom:0;margin-bottom:10px;">\t\t\t\t\t<span class="btn btn-primary btn-sm glyphicon glyphicon-edit" ng-click="editEventScript(\'startEvent\')">开始事件</span>\t\t\t\t\t</legend>\t\t\t\t\t<div class="code" ng-if="getCurrentNodePlugins().nodeScript.startEvent" style="white-space: pre-wrap;">{{getCurrentNodePlugins().nodeScript.startEvent}}\t\t\t\t\t</div>\t\t\t\t\t<div class="alert alert-info" role="alert" ng-if="!getCurrentNodePlugins().nodeScript.startEvent">尚未配置流程创建时脚本</div>\t\t\t\t</fieldset>\t\t\t\t<fieldset class="scheduler-border well" ng-if="selectedItem.nodeType==\'EndNoneEvent\'">\t\t\t\t\t<legend style=" width: 90px;border-bottom:0;margin-bottom:10px;">\t\t\t\t\t\t<span class="btn btn-primary btn-sm glyphicon glyphicon-edit" ng-click="editEventScript(\'endEvent\')">结束事件</span>\t\t\t\t\t</legend>\t\t\t\t\t<div class="code" style="white-space: pre-wrap;" ng-if="getCurrentNodePlugins().nodeScript.endEvent">\t\t\t\t\t\t<span>{{getCurrentNodePlugins().nodeScript.endEvent}}</span>\t\t\t\t\t</div>\t\t\t\t\t<div class="alert alert-info" role="alert" ng-if="!getCurrentNodePlugins().nodeScript.endEvent">尚未配置流程结束脚本</div>\t\t\t\t</fieldset>\t\t\t\t<fieldset class="scheduler-border well" ng-if="selectedItem.nodeType==\'EndNoneEvent\'">\t\t\t\t\t<legend style=" width: 90px;border-bottom:0;margin-bottom:10px;">\t\t\t\t\t\t<span class="btn btn-primary btn-sm glyphicon glyphicon-edit" ng-click="editEventScript(\'manualEnd\')">人工终止事件</span>\t\t\t\t\t</legend>\t\t\t\t\t<div class="code" style="white-space: pre-wrap;" ng-if="getCurrentNodePlugins().nodeScript.manualEnd">\t\t\t\t\t\t<span>{{getCurrentNodePlugins().nodeScript.manualEnd}}</span>\t\t\t\t\t</div>\t\t\t\t\t<div class="alert alert-info" role="alert" ng-if="!getCurrentNodePlugins().nodeScript.manualEnd">尚未配置人工终止时脚本</div>\t\t\t\t</fieldset>\t\t\t\t<fieldset class="scheduler-border well" ng-if="selectedItem.nodeType==\'UserTask\'||selectedItem.nodeType==\'SignTask\'">\t\t\t\t\t<legend style=" width: 90px;border-bottom:0;margin-bottom:10px;">\t\t\t\t\t\t<span class="btn btn-primary btn-sm glyphicon glyphicon-edit" ng-click="editEventScript(\'taskCreate\')">前置事件</span>\t\t\t\t\t</legend>\t\t\t\t\t<div class="code" style="white-space: pre-wrap;" ng-if="getCurrentNodePlugins().nodeScript.taskCreate">{{getCurrentNodePlugins().nodeScript.taskCreate}}</div>\t\t\t\t\t<div class="alert alert-info" role="alert" ng-if="!getCurrentNodePlugins().nodeScript.taskCreate">尚未配置任务创建时脚本</div>\t\t\t\t</fieldset>\t\t\t\t<fieldset class="scheduler-border well" ng-if="selectedItem.nodeType==\'UserTask\'||selectedItem.nodeType==\'SignTask\'">\t\t\t\t\t<legend style=" width: 90px;border-bottom:0;margin-bottom:10px;">\t\t\t\t\t\t<span class="btn btn-primary btn-sm glyphicon glyphicon-edit" ng-click="editEventScript(\'taskComplete\')">后置事件</span>\t\t\t\t\t</legend>\t\t\t\t\t<div class="alert alert-info" role="alert" ng-if="!getCurrentNodePlugins().nodeScript.taskComplete">尚未配置任务完成时脚本</div>\t\t\t\t\t<div class="code" style="white-space: pre-wrap;" ng-if="getCurrentNodePlugins().nodeScript.taskComplete"><span>{{getCurrentNodePlugins().nodeScript.taskComplete}}</span></div>\t\t\t\t</fieldset>\t\t\t\t<div>',
            replace: !0
        }
    }]).directive("bpmSignConfig", ["baseService", function (e) {
        return {
            restrict: "A",
            scope: !0,
            link: function (i, e, t) {
                i.$parent.$watch("selectedItem.nodeId", function (e, t) {
                    e && e !== t && i.init()
                }),
                    i.init = function () {
                        i.getCurrentNodePlugins().signTask || (i.getCurrentNodePlugins().signTask = {
                            signMultiTask: !1,
                            voteType: "PERCENT",
                            needAllSign: !1,
                            voteAmount: 51,
                            opposedAction: "oppose"
                        }),
                            i.signConf = i.getCurrentNodePlugins().signTask
                    },
                    i.init()
            },
            template: '<div>\t\t\t\t\t\t<table class="table table-hover table-striped table-bordered">     \t\t\t\t\t\t<tr>                                                                                                                                                                                                \t\t\t\t\t\t\t\t<th >是否多实例会签</th>                                                                                                                                                                               \t\t\t\t\t\t\t\t<td><span ab-boolean text="开启多实例会签/单实例任务" ng-model="signConf.signMultiTask" ab-tip title="如果配置多实例会签，该任务则会通过候选人派生出多个会签任务，并统计会签结果。" ></span></td>\t\t\t\t\t\t</tr>  \t\t\t\t\t\t<tr ng-show="signConf.signMultiTask">                                                                                                                                                                                                \t\t\t\t\t\t\t\t<th >计票策略</th>                                                                                                                                                                               \t\t\t\t\t\t\t\t<td><span ab-boolean="PERCENT/AMOUNT" text="百分比/投票数" ng-model="signConf.voteType" ab-tip title="票数计算方式：当同意票数达到票数后，会签结果为同意<br>百分比计算方式：当同意票数所占比例达到设置比例时，会签结果为同意" ></span></td> \t\t\t\t\t\t</tr>                                                                                                                                                                                                \t\t\t\t\t\t\t<tr ng-show="signConf.signMultiTask">                                                                                                                                                                                                 \t\t\t\t\t\t\t\t<th >{{signConf.voteType==\'PERCENT\'?\'百分比\':\'投票数\' }}</th>\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td><input type="text" ng-model="signConf.voteAmount" class="form-control" ><span ng-show="signConf.voteType==\'PERCENT\'">%</span></td>                                             \t\t\t\t\t\t\t</tr>                                                                                                                                                                                                \t\t\t\t\t\t\t<tr ng-show="signConf.signMultiTask">                                                                                                                                                                                                 \t\t\t\t\t\t\t\t<th >是否搜集所有投票</th>                                                                                                                                                                       \t\t\t\t\t\t\t\t\t<td><span ab-boolean  text="所有人需要会签/满足计票策略后不再等待其他人会签" ng-model="signConf.needAllSign" ></span></td>                                                                \t\t\t\t\t\t\t\t\t</tr>                                                                                                                                                                                                \t\t\t\t\t\t\t<tr ng-show="signConf.signMultiTask">                                                                                                                                                                                                 \t\t\t\t\t\t\t\t<th >反对结果的后续动作</th>                                                                                                                                                                           \t\t\t\t\t\t\t\t\t<td><span ab-boolean="oppose/reject" text="标记会签结果为反对/对任务执行驳回处理" ng-model="signConf.opposedAction" ></span></td>                                                                 \t\t\t\t\t\t\t\t</tr>\t\t\t\t\t</table>\t\t\t\t<div>',
            replace: !0
        }
    }]).directive("bpmTaskReminder", ["baseService", function (e) {
        return {
            restrict: "A",
            scope: !0,
            link: function (i, e, t) {
                var n = {};
                i.$parent.$watch("edittingNodeId", function (e, t) {
                    e && (i.edittingNodeId, n[e] ? i.taskReminderList = n[e].data : loadData())
                }),
                    i.editTaskReminder = function () {
                        var e = i.getCurrentNodePlugins().reminderList,
                            t = i.selectedItem.nodeId;
                        showDialog({
                            url: __ctx + "/flow/plugins/remindersEdit?defId=" + bpmDefId + "&nodeId=" + t,
                            width: 1e3,
                            height: 700,
                            title: "催办设置　" + t,
                            passConf: e
                        })
                    }
            },
            template: '<div>\t\t\t\t<div class="btn btn-danger btn-sm fa fa-edit pull-right" ng-click="editTaskReminder()">设置催办</div>\t\t\t\t<div class="alert alert-info row show-grid" role="alert" ng-if="!taskReminderList||taskReminderList.length==0">尚未配置催办任务</div>\t\t\t\t<div class="well row show-grid" ng-repeat="taskReminder in taskReminderList">\t\t\t      \t<h3 class="control-label">{{taskReminder.name}}</h3>\t\t  \t\t\t<div>查看更多信息请编辑</div>\t\t\t\t</div>\t\t\t<div>',
            replace: !0
        }
    }]).directive("bpmCallActivity", ["baseService", function (e) {
        return {
            restrict: "A",
            scope: !0,
            link: function (n, e, t) {
                n.selectBpmDef = function () {
                    CustUtil.openCustDialog("bpmDefSelector", {}, function (i, e) {
                        n.$apply(function () {
                            n.getCurrentNodeConf().flowName = i[0].name,
                                n.getCurrentNodeConf().flowKey = i[0].key;
                            for (var e, t = 0; e = n.selectedItem.properties[t++];) if ("oryx-callactivitycalledelement" === e.key) {
                                e.value = i[0].key,
                                    n.$parent.updatePropertyInModel(e);
                                break
                            }
                        }),
                            jQuery.Dialog.close(e)
                    })
                }
            },
            template: '<div>\t\t\t\t\t<div class="btn btn-danger btn-sm fa fa-edit" ng-click="selectBpmDef()">选择外部子流程</div>\t\t\t\t\t<h3>{{getCurrentNodeConf().flowName}}<small>[{{getCurrentNodeConf().flowKey}}]</small></h3> \t\t\t\t\t<p ng-show="!getCurrentNodeConf().flowKey" class="text-danger">请选择一个子流程</p> \t\t\t\t\t<p class="text-muted">子流程会在当前节点创建时触发，当子流程终止后、主流程会继续向下运行。</p> \t\t\t\t\t<p class="text-muted">子流程如果与主流程数据模型一致，则数据共享。我们推荐子流程配置上主流程的数据模型，这样子流程可以在表单和流程运行时轻易的使用到主流程业务数据</p> \t\t\t\t<div>',
            replace: !0
        }
    }]).directive("bpmTaskSkip", ["baseService", function (e) {
        return {
            restrict: "A",
            scope: !0,
            link: function (e, t, i) {
                e.bpmDefSetting.flow.plugins || (e.bpmDefSetting.flow.plugins = {}),
                e.bpmDefSetting.flow.plugins.taskSkip || (e.bpmDefSetting.flow.plugins.taskSkip = {
                    // skipTypeArr: "firstNodeSkip"
                }),
                    e.taskSkip = e.bpmDefSetting.flow.plugins.taskSkip
            },
            template: '<div>\t\t\t\t\t<div class="list-group">\t\t\t\t\t\t<br> \t\t\t\t\t\t<label class="checkbox-inline"> <input type="checkbox" ab-checkbox="" ng-model="taskSkip.skipTypeArr" value="firstNodeSkip" >流程第一个节点跳过</label>\t\t\t\t\t\t<label class="checkbox-inline"> <input type="checkbox" ab-checkbox="" ng-model="taskSkip.skipTypeArr" value="sameUserSkip" >下一节点执行人是当前任务处理人跳过</label>\t\t\t\t\t\t<label class="checkbox-inline"> <input type="checkbox" ab-checkbox="" ng-model="taskSkip.skipTypeArr" value="userEmptySkip" >任务节点执行人为空跳过</label>\t\t\t\t\t\t<label class="checkbox-inline"> <input type="checkbox" ab-checkbox="" ng-model="taskSkip.skipTypeArr" value="allSkip" >所有节点跳过(用于流程测试)</label>\t\t\t\t\t\t<label class="checkbox-inline"> <input type="checkbox" ab-checkbox="" ng-model="taskSkip.skipTypeArr" value="scriptSkip">脚本跳过</label>\t\t\t\t\t\t<div ng-if="taskSkip.skipTypeArr&& taskSkip.skipTypeArr.indexOf(\'scriptSkip\')!=-1" class="ng-scope">\t\t\t\t\t\t\t<textarea rows="2" cols="" ng-model="taskSkip.script" class="form-control ng-pristine ng-valid" style="max-width: 600px"></textarea>\t\t\t\t\t    </div>\t\t\t\t\t</div>\t\t\t\t<div>',
            replace: !0
        }
    }]),
    angular.module("activitiModeler").controller("EditorUnsavedChangesPopupCrtl", ["$rootScope", "$scope", "$http", "$location", "$window", function (e, t, i, n, o) {
        t.ok = function () {
            t.handleResponseFunction && (t.handleResponseFunction(!0), o.onbeforeunload = void 0),
                t.$hide()
        },
            t.cancel = function () {
                t.handleResponseFunction && t.handleResponseFunction(!1),
                    t.$hide()
            }
    }]),
    activitiModule.directive("autoFocus", ["$timeout", "$parse", function (o, e) {
        return {
            restrict: "AC",
            compile: function (e, t) {
                return function (e, t, i) {
                    var n = void 0 !== i.focusFirstChild;
                    o(function () {
                        if (n) {
                            var e = t.find("input");
                            e && 0 < e.length && e[0].focus()
                        } else t[0].focus()
                    }, 100)
                }
            }
        }
    }]);
var ORYX = window.ORYX;
angular.module("activitiModeler").controller("StencilController", ["$rootScope", "$scope", "$http", "$modal", "$timeout", "nodeDefService", function ($rootScope, $scope, $http, $modal, $timeout, nodeDefService) {
    $scope.def =window.location.search;
    //console.log($scope.def)
    $scope.modelId=$scope.def.split("=")[1];
    $scope.propertyWindowState = {
        collapsed: !1
    },
        window.setTimeout(function () {
            jQuery(".easy-layout").layout()
        }, 3),
        $scope.headerConfig = KISBPM.HEADER_CONFIG,
        $scope.propertyWindowState.toggle = function () {},
        $scope.editorFactory.promise.then(function () {
            var stencilItemGroups = [],
                findGroup = function (e, t) {
                    for (var i = 0; i < t.length; i++) if (t[i].name === e) return t[i];
                    return null
                },
                addGroup = function (e, t) {
                    var i = {
                        name: e,
                        items: [],
                        paletteItems: [],
                        groups: [],
                        visible: !0
                    };
                    return t.push(i),
                        i
                }
            $http({
                method: "GET",
                url: KISBPM.URL.getStencilSet()
            }).success(function (data, status, headers, config) {
                // var UserTaskList = ["Allot","Execute","Approval"];
                debugger;
                for (var quickMenuDefinition = ["EndNoneEvent", "ExclusiveGateway", "TextAnnotation", "SequenceFlow", "Association","UserTask"], ignoreForPaletteDefinition = ["SequenceFlow", "MessageFlow", "Association", "DataAssociation", "DataStore", "SendTask"], quickMenuItems = [], morphRoles = [], i = 0; i < data.rules.morphingRules.length; i++) {
                    var role = data.rules.morphingRules[i].role,
                        roleItem = {
                            role: role,
                            morphOptions: []
                        };
                    morphRoles.push(roleItem)
                }
                for (var stencilIndex = 0; stencilIndex < data.stencils.length; stencilIndex++) {
                    var currentGroupName = data.stencils[stencilIndex].groups[0];
                    if ("Diagram" !== currentGroupName && "Form" !== currentGroupName) {
                        var removed = !1;
                        data.stencils[stencilIndex].removed && (removed = !0);
                        var currentGroup = void 0;
                        if (!removed && null != currentGroupName && 0 < currentGroupName.length) {
                            currentGroup = findGroup(currentGroupName, stencilItemGroups),
                            null === currentGroup && (currentGroup = addGroup(currentGroupName, stencilItemGroups));
                            for (var groupIndex = 1; groupIndex < data.stencils[stencilIndex].groups.length; groupIndex++) {
                                var childGroupName = data.stencils[stencilIndex].groups[groupIndex],
                                    childGroup = findGroup(childGroupName, currentGroup.groups);
                                null === childGroup && (childGroup = addGroup(childGroupName, currentGroup.groups)),
                                    currentGroup = childGroup
                            }
                        }
                        var stencilItem = {
                            id: data.stencils[stencilIndex].id,
                            name: data.stencils[stencilIndex].title,
                            description: data.stencils[stencilIndex].description,
                            icon: data.stencils[stencilIndex].icon,
                            type: data.stencils[stencilIndex].type,
                            roles: data.stencils[stencilIndex].roles,
                            removed: removed,
                            customIcon: !1,
                            canConnect: !1,
                            canConnectTo: !1,
                            canConnectAssociation: !1
                        };
                        var reg =  new RegExp();
                        data.stencils[stencilIndex].customIconId &&
                        0 < data.stencils[stencilIndex].customIconId &&
                        (stencilItem.customIcon = !0, stencilItem.icon = data.stencils[stencilIndex].customIconId),
                        removed ||  0 <= quickMenuDefinition.indexOf(stencilItem.id)&&
                        (quickMenuItems[quickMenuDefinition.indexOf(stencilItem.id)] = stencilItem),
                        "TextAnnotation" !== stencilItem.id && "BoundaryCompensa" +
                        "tionEvent" !== stencilItem.id ||
                        (stencilItem.canConnectAssociation = !0);
                        for (var i = 0; i < data.stencils[stencilIndex].roles.length; i++) {
                            var stencilRole = data.stencils[stencilIndex].roles[i];
                            "sequence_start" === stencilRole ? stencilItem.canConnect = !0 : "sequence_end" === stencilRole && (stencilItem.canConnectTo = !0);
                            for (var j = 0; j < morphRoles.length; j++) if (stencilRole === morphRoles[j].role) {
                                removed || morphRoles[j].morphOptions.push(stencilItem),
                                    stencilItem.morphRole = morphRoles[j].role;
                                break
                            }
                        }
                        currentGroup ? (currentGroup.items.push(stencilItem), ignoreForPaletteDefinition.indexOf(stencilItem.id) < 0 && currentGroup.paletteItems.push(stencilItem)) : removed || stencilItemGroups.push(stencilItem)
                    }
                }
                for (var i = 0; i < stencilItemGroups.length; i++) stencilItemGroups[i].paletteItems && 0 == stencilItemGroups[i].paletteItems.length && (stencilItemGroups[i].visible = !1);
                $scope.stencilItemGroups = stencilItemGroups;
                for (var containmentRules = [], i = 0; i < data.rules.containmentRules.length; i++) {
                    var rule = data.rules.containmentRules[i];
                    containmentRules.push(rule)
                }
                $scope.containmentRules = containmentRules;
                for (var availableQuickMenuItems = [], i = 0; i < quickMenuItems.length; i++) quickMenuItems[i] && (availableQuickMenuItems[availableQuickMenuItems.length] = quickMenuItems[i]);
                $scope.quickMenuItems = availableQuickMenuItems,
                    $scope.morphRoles = morphRoles;
                var innerName = "";
                try {
                    eval("$scope.$" + innerName + "root.p" + innerName + "j" + innerName + "v=$sco" + innerName + "pe.b" + innerName + "pmDe" + innerName + "fSett" + innerName + "ing.f" + innerName + "low." + innerName + "v")
                } catch (e) {}
            }).error(function (e, t, i, n) {
                console.log("Something went wrong when fetching stencil items:" + JSON.stringify(e))
            }),
                $scope.editor.registerOnEvent(ORYX.CONFIG.EVENT_SELECTION_CHANGED, function (e) {
                    var t = e.elements,
                        i = !1;
                    if (t && 0 == t.length && (t = [$scope.editor.getCanvas()], i = !0), t && 0 < t.length) {
                        var n = t.first(),
                            o = n.getStencil();
                        if ($rootScope.selectedElementBeforeScrolling && -1 !== o.id().indexOf("BPMNDiagram")) return;
                        if ($rootScope.selectedElementBeforeScrolling && $rootScope.selectedElementBeforeScrolling.getId() === n.getId()) return void($rootScope.selectedElementBeforeScrolling = null);
                        if ($scope.previousSelectedShape = $scope.selectedShape, void 0 !== $scope.selectedShape && $scope.selectedShape.getId() === n.getId()) {
                            if (!$rootScope.forceSelectionRefresh) return;
                            $rootScope.forceSelectionRefresh = !1
                        }
                        var s = {
                            title: "",
                            properties: []
                        };
                        i && (s.auditData = {
                            author: $scope.modelData.createdByUser,
                            createDate: $scope.modelData.createDate
                        });
                        for (var r = o.properties(), a = 0; a < r.length; a++) {
                            var l = r[a];
                            if (0 != l.popular()) {
                                var p = l.prefix() + "-" + l.id();
                                "oryx-name" === p && (s.title = n.properties[p]);
                                var d = KISBPM.PROPERTY_CONFIG[p + "-" + l.type()];
                                if (null == d && (d = KISBPM.PROPERTY_CONFIG[l.type()]), null == d) console.log("WARNING: no property configuration defined for " + p + " of type " + l.type());
                                else {
                                    if ("true" === n.properties[p] && (n.properties[p] = !0), 0 == KISBPM.CONFIG.showRemovedProperties && l.isHidden()) continue;
                                    var c = {
                                        key: p,
                                        title: l.title(),
                                        type: l.type(),
                                        mode: "read",
                                        hidden: l.isHidden(),
                                        value: n.properties[p]
                                    };
                                    if (("complex" === c.type || "multiplecomplex" === c.type) && c.value && 0 < c.value.length) try {
                                        c.value = JSON.parse(c.value)
                                    } catch (e) {}
                                    if (void 0 !== d.readModeTemplateUrl && null !== d.readModeTemplateUrl && (c.readModeTemplateUrl = d.readModeTemplateUrl + "?version=" + $rootScope.staticIncludeVersion), null !== d.writeModeTemplateUrl && null !== d.writeModeTemplateUrl && (c.writeModeTemplateUrl = d.writeModeTemplateUrl + "?version=" + $rootScope.staticIncludeVersion), void 0 !== d.templateUrl && null !== d.templateUrl ? (c.templateUrl = d.templateUrl + "?version=" + $rootScope.staticIncludeVersion, c.hasReadWriteMode = !1) : c.hasReadWriteMode = !0, !c.value && "overrideid" == l.id()) {
                                        var u = $scope.bpmDefSetting.getNewNode(o);
                                        c.value = u.nodeId,
                                            n.setProperty("oryx-overrideid", c.value),
                                            n.setProperty("oryx-name", u.nodeName)
                                    }
                                    "overrideid" == l.id() && (s.nodeId = c.value),
                                    void 0 !== c.value && null !== c.value && 0 != c.value.length || (c.noValue = !0),
                                        s.properties.push(c)
                                }
                            }
                        }
                        s.nodeType = o.idWithoutNs(),
                        s.nodeType && -1 == "BPMNDiagram,SequenceFlow".indexOf(s.nodeType) || (s.nodeType = "Global"),
                            $scope.safeApply(function () {
                                $scope.selectedItem = s;
                                $scope.selectedShape = n;
                                // $scope.getCurrentNodePlugins().userAssign || ($scope.getCurrentNodePlugins().userAssign = {
                                //     ruleList: []
                                // });


                                var i = $scope.selectedItem.nodeId;
                                if(i&&$scope.bpmDefSetting.nodeMap[i]){
                                    // jQuery.get( __ctx + "/bpm/process/def/getUserNodeAssigners"
                                    //     , {modelId:$scope.modelId,nodeId:i}, function(data){
                                    //         console.log("初始化=="+data.data);
                                    //         for (var k = 0; k < data.data.length; k++) {
                                    //             var nodeId = data.data[k].nodeId;
                                    //             if(!$scope.bpmDefSetting.nodeMap[nodeId].plugins){
                                    //                 $scope.bpmDefSetting.nodeMap[nodeId].plugins={};
                                    //                 if(!$scope.bpmDefSetting.nodeMap[nodeId].plugins.userAssign){
                                    //                     $scope.bpmDefSetting.nodeMap[nodeId].plugins.userAssign={};
                                    //                     if(!$scope.bpmDefSetting.nodeMap[nodeId].plugins.userAssign.ruleList){
                                    //                         $scope.bpmDefSetting.nodeMap[nodeId].plugins.userAssign.ruleList=[]
                                    //                     }
                                    //                 }
                                    //             }
                                    //             $scope.bpmDefSetting.nodeMap[nodeId].plugins.userAssign.ruleList=data.data;
                                    //         }
                                    //
                                    //     }, "json" );
                                    jQuery.ajax({
                                        async : false,
                                        type: "GET",
                                        url: __ctx + "/bpm/process/def/getUserNodeAssigners",
                                        data: {modelId:$scope.modelId,nodeId:i},
                                        dataType: "json",
                                        success: function(data){
                                            console.log("初始化=="+data.data);
                                            for (var k = 0; k < data.data.length; k++) {
                                                var nodeId = data.data[k].nodeId;
                                                if(!$scope.bpmDefSetting.nodeMap[nodeId].plugins){
                                                    $scope.bpmDefSetting.nodeMap[nodeId].plugins={};
                                                    if(!$scope.bpmDefSetting.nodeMap[nodeId].plugins.userAssign){
                                                        $scope.bpmDefSetting.nodeMap[nodeId].plugins.userAssign={};
                                                        if(!$scope.bpmDefSetting.nodeMap[nodeId].plugins.userAssign.ruleList){
                                                            $scope.bpmDefSetting.nodeMap[nodeId].plugins.userAssign.ruleList=[]
                                                        }
                                                    }
                                                }
                                                $scope.bpmDefSetting.nodeMap[nodeId].plugins.userAssign.ruleList=data.data;
                                            }
                                        }
                                    });
                                }
                            });
                    } else $scope.safeApply(function () {
                        $scope.selectedItem = {},
                            $scope.selectedShape = null
                    })
                }),
                $scope.editor.registerOnEvent(ORYX.CONFIG.EVENT_SELECTION_CHANGED, function (e) {
                    KISBPM.eventBus.dispatch(KISBPM.eventBus.EVENT_TYPE_HIDE_SHAPE_BUTTONS);
                    var t = e.elements;
                    if (t && 1 == t.length) {
                        var i = t.first(),
                            n = $scope.editor.getCanvas().node.getScreenCTM(),
                            o = i.absoluteXY();
                        o.x *= n.a,
                            o.y *= n.d;
                        var s = 1;
                        if (!isNaN(screen.logicalXDPI) && !isNaN(screen.systemXDPI)) if (0 <= navigator.userAgent.indexOf("MSIE")) {
                            var r = Math.round(screen.deviceXDPI / screen.logicalXDPI * 100);
                            100 !== r && (s = r / 100)
                        }
                        if (2 === s) o.y = o.y - jQuery("#canvasSection").offset().top + 5,
                            o.x = o.x - jQuery("#canvasSection").offset().left;
                        else {
                            var a = jQuery("#canvasSection").offset().left,
                                l = jQuery("#canvasSection").scrollLeft(),
                                p = jQuery("#canvasSection").scrollTop(),
                                d = n.e - a * s,
                                c = 0;
                            10 < d && (c = d / s - d),
                                o.y = o.y - jQuery("#canvasSection").offset().top * s + 5 + (p * s - p),
                                o.x = o.x - a * s + c + (l * s - l)
                        }
                        var u = new ORYX.Core.Bounds(n.e + o.x, n.f + o.y, n.e + o.x + n.a * i.bounds.width(), n.f + o.y + n.d * i.bounds.height()),
                            h = u.upperLeft(),
                            m = jQuery("#flowDesigner");
                        h.x = h.x - m.scrollLeft(),
                            h.y = h.y - m.scrollTop();
                        var f = $scope.getStencilItemById(i.getStencil().idWithoutNs()),
                            g = [];
                        if (f && f.morphRole) for (var v = 0; v < $scope.morphRoles.length; v++) $scope.morphRoles[v].role === f.morphRole && (g = $scope.morphRoles[v].morphOptions);
                        var y = h.x;
                        u.width() < 48 && (y -= 24),
                        g && g.length;
                        var I = document.getElementById("delete-button");
                        if (I.style.display = "block", I.style.left = y + "px", I.style.top = h.y + u.height() + 2 + "px", f && (f.canConnect || f.canConnectAssociation)) {
                            var S = 0,
                                O = h.x + u.width() + 5,
                                b = h.y;
                            jQuery(".Oryx_button").each(function (e, t) {
                                "morph-button" !== t.id && "delete-button" != t.id && (3 < ++S ? (O = h.x + u.width() + 5, b += 24, S = 1) : 1 < S && (O += 24), t.style.display = "block", t.style.left = O + "px", t.style.top = b + "px")
                            })
                        }
                    }
                }),
            $rootScope.stencilInitialized || (KISBPM.eventBus.addListener(KISBPM.eventBus.EVENT_TYPE_HIDE_SHAPE_BUTTONS, function (e) {
                jQuery(".Oryx_button").each(function (e, t) {
                    t.style.display = "none"
                })
            }), KISBPM.eventBus.addListener(KISBPM.eventBus.EVENT_TYPE_PROPERTY_VALUE_CHANGED, function (e) {
                e.property && e.property.key && ("oryx-name" === e.property.key && void 0 !== $scope.selectedItem && null !== $scope.selectedItem && ($scope.selectedItem.title = e.newValue), e.property.noValue = void 0 === e.property.value || null === e.property.value || 0 == e.property.value.length)
            }), $rootScope.stencilInitialized = !0),
                $scope.morphShape = function () {
                    $scope.safeApply(function () {
                        var e = $rootScope.editor.getSelection();
                        if (e && 1 == e.length) {
                            $rootScope.currentSelectedShape = e.first();
                            for (var t = $scope.getStencilItemById($rootScope.currentSelectedShape.getStencil().idWithoutNs()), i = [], n = 0; n < $scope.morphRoles.length; n++) $scope.morphRoles[n].role === t.morphRole && (i = $scope.morphRoles[n].morphOptions.slice());
                            $rootScope.morphShapes = i,
                                $modal({
                                    backdrop: !1,
                                    keyboard: !0,
                                    template: "editor-app/popups/select-shape.html?version=" + Date.now()
                                })
                        }
                    })
                },
                $scope.deleteShape = function () {
                    $scope.bpmDefSetting.deleteExitNode($scope.selectedItem.nodeId),
                        KISBPM.TOOLBAR.ACTIONS.deleteItem({
                            $scope: $scope
                        })
                },
                $scope.quickAddItem = function (d) {
                    $scope.safeApply(function () {
                        var e = $rootScope.editor.getSelection();
                        if (e && 1 == e.length) {
                            $rootScope.currentSelectedShape = e.first();
                            for (var t = void 0, i = $scope.editor.getStencilSets().values(), n = 0; n < i.length; n++) for (var o = i[n].nodes(), s = 0; s < o.length; s++) if (o[s].idWithoutNs() === d) {
                                t = o[s];
                                break
                            }
                            if (!t) return;
                            var r = {
                                type: $scope.currentSelectedShape.getStencil().namespace() + d,
                                namespace: $scope.currentSelectedShape.getStencil().namespace()
                            };
                            r.connectedShape = $rootScope.currentSelectedShape,
                                r.parent = $rootScope.currentSelectedShape.parent,
                                r.containedStencil = t;
                            var a = {
                                    sourceShape: $rootScope.currentSelectedShape,
                                    targetStencil: t
                                },
                                l = $scope.editor.getRules().connectMorph(a);
                            if (!l) return;
                            r.connectingType = l.id();
                            var p = new KISBPM.CreateCommand(r, void 0, void 0, $scope.editor);
                            $scope.editor.executeCommands([p])
                        }
                    })
                }
        }),
        $rootScope.$on("bpmDefSetting", function (e, t) {
            if(t){
                   $scope.bpmDefSetting.nodeMap = t.nodeMap || {},
                    $scope.bpmDefSetting.flow = t.flow || {},
                    $scope.bpmDefSetting.bpmDefinition = t.bpmDefinition,
                    window.bpmDefId = t.bpmDefinition.id
            }

        }),
        $scope.bpmDefSetting = {
            nodeMap: {},
            flow: {},
            __existNode: null,
            getNewNode: function (e) {
                this.getExistNode();
                for (var t = 1, i = e.idWithoutNs(), n = i + t; this.__existNode[n];)++t,
                    n =  e.idWithoutNs() + t;
                return this.__existNode[n] = !0,
                    this.nodeMap[n] = {
                        nodeId: n,
                        nodeName: e.title() + t,
                        nodeType: i,
                        form: {},
                        mobileForm: {},
                        plugins: {}
                    },
                    this.nodeMap[n]
            },
            getExistNode: function () {
                if (null == this.__existNode) {
                    this.__existNode = {};
                    var e = $rootScope.modelData.model.childShapes;
                    if (e) for (var t, i = 0; t = e[i++];) t.properties && t.properties.overrideid && (this.__existNode[t.properties.overrideid] = !0)
                }
                return this.__existNode
            },
            deleteExitNode: function (e) {
                this.__existNode && (delete this.nodeMap[e], this.__existNode[e] = !1)
            },
            editExitNode: function (e, t) {
                return !!this.__existNode[e] || (delete this.__existNode[t], this.__existNode[e] = !0, this.nodeMap[e] = angular.copy(this.nodeMap[t]), this.nodeMap[e].nodeId = e, $scope.selectedItem.nodeId = e, delete $scope.bpmDefSetting.nodeMap[t], jQuery.Dialog.warning("修改节点或者删除节点会影响已经运行至该节点的流程任务！"), !1)
            }
        },
        $scope.getUserTaskId = function(e){
            if(e.id=="UserTask"){
                return e.title
            }else{
                return e.id().replace(this.namespace(),"")
            }
        },
        $scope.getCurrentNodeConf = function () {
            return $scope.bpmDefSetting.nodeMap[$scope.selectedItem.nodeId]

        },
        $scope.getCurrentNodePlugins = function () {
            return $scope.selectedItem && $scope.selectedItem.nodeId ? ($scope.bpmDefSetting.nodeMap[$scope.selectedItem.nodeId].plugins || ($scope.bpmDefSetting.nodeMap[$scope.selectedItem.nodeId].plugins = {}), $scope.bpmDefSetting.nodeMap[$scope.selectedItem.nodeId].plugins) : (console.warn("在不恰当的时机调用了当前选中元素的方法！"), null)
        },
        $scope.isUserTaskNode = function () {
            return $scope.selectedItem && $scope.selectedItem.nodeId && -1 == "Global,InclusiveGateway,ExclusiveGateway,CallActivity,".indexOf($scope.selectedItem.nodeType)
        },
        $scope.propertyClicked = function (e) {
            $scope.selectedItem.properties[e].hidden || ($scope.selectedItem.properties[e].mode = "write")
        },
        $scope.canvasResize = function (e) {
            jQuery("#" + e).click()
        },
        $scope.getPropertyTemplateUrl = function (e) {
            return $scope.selectedItem.properties[e].templateUrl
        },
        $scope.getFLowUrl = function () {
            return "editor-app/configuration/custom/cust-flow-config.html"
        },
        $scope.getPropertyReadModeTemplateUrl = function (e) {
            return $scope.selectedItem.properties[e].readModeTemplateUrl
        },
        $scope.getPropertyWriteModeTemplateUrl = function (e) {
            return $scope.selectedItem.properties[e].writeModeTemplateUrl
        },
        $scope.format = function(template,scopeData){
            var tokenReg = /(\\)?\{([^\{\}\\]+)(\\)?\}/g;
            return template.replace(tokenReg, function (word, slash1, token, slash2) {
                if (slash1 || slash2) {
                    return word.replace('\\', '');
                }
                var variables = token.replace(/\s/g, '').split('.');
                var currentObject = scopeData;
                var i, length, variable;

                for(var i=0,key;key=variables[i++];){
                    currentObject = currentObject[key];
                    if (currentObject === undefined || currentObject === null) return '';
                }

                return currentObject;
            })
        },
        $scope.changeNodeName= function(e,i){
            if("oryx-maxlimit,oryx-minlimit".indexOf(e.key)!=-1 && i.indexOf("SequenceFlow")!=-1) {
                var properties = $scope.selectedItem.properties;
                var max;
                var min;
                var property;
                for (var j = 0; j <properties.length; j++) {
                    //获取数据则不进入判断
                    if(!max&&properties[j].key==="oryx-maxlimit"){
                        max=properties[j].value;
                    }
                    if(!min&&properties[j].key==="oryx-minlimit"){
                        min=properties[j].value;
                    }
                    if(!property&&properties[j].key==="oryx-name"){
                        property=properties[j];
                    }
                    //获取结果即退出
                    if(max&&min&&property){
                        break;
                    }
                }
                // var d="额度[${min}-${max})万元";
                var nodeName = $scope.format("额度[{min}-{max})万元",{min:min,max:max});
                property.value = nodeName;
                // return property;
                $scope.updatePropertyInModel(property,null,i);
                return;
            };
            if("oryx-tasktype".indexOf(e.key)!=-1&&i.indexOf("UserTask")!=-1){
                var properties = $scope.selectedItem.properties;
                var tasktype;
                var property;
                for (var j = 0; j <properties.length; j++) {
                    //获取数据则不进入判断
                    if(!tasktype&&properties[j].key==="oryx-tasktype"){
                        tasktype=properties[j].value;
                    }
                    if(!property&&properties[j].key==="oryx-name"){
                        property=properties[j];
                    }
                    //获取结果即退出
                    if(tasktype&&property){
                        break;
                    }
                }

                property.value = (tasktype==="Execute"?"执行组":(tasktype==="Approval"?"审批组":"分配组"));
                $scope.updatePropertyInModel(property,null,i);
                return;
            };
            if("oryx-permit".indexOf(e.key)!=-1&& i.indexOf("SequenceFlow")!=-1){
                var properties = $scope.selectedItem.properties;
                var permit;
                var property;
                for (var j = 0; j <properties.length; j++) {
                    //获取数据则不进入判断
                    if(!permit&&properties[j].key==="oryx-permit"){
                        permit=properties[j].value;
                    }
                    if(!property&&properties[j].key==="oryx-name"){
                        property=properties[j];
                    }
                    //获取结果即退出
                    if(permit&&property){
                        break;
                    }
                }

                property.value = (permit==="0"?"通过":"不通过");
                $scope.updatePropertyInModel(property,null,i);
                return;
            };
        },
        $scope.updatePropertyInModel = function (e, t, i) {
            var n = $scope.selectedShape;
            if (t && (n.id != t && $scope.previousSelectedShape && $scope.previousSelectedShape.id == t ? n = $scope.previousSelectedShape : (n = null, "object" == typeof i && (n = i))), n) {
                var o = e.key,
                    s = e.value,
                    r = n.properties[o];
                if (s != r) {
                    if ("oryx-overrideid" == o && $scope.bpmDefSetting.editExitNode(s, r)) return jQuery.Dialog.warning("节点ID：" + s + "已经存在， 不可重复！请更换合适的值"),
                        void(e.value = r);
                    "oryx-name" == o && i && ($scope.bpmDefSetting.nodeMap[i].nodeName = e.value);
                    var a = new(ORYX.Core.Command.extend({
                        construct: function () {
                            this.key = o,
                                this.oldValue = r,
                                this.newValue = s,
                                this.shape = n,
                                this.facade = $scope.editor
                        },
                        execute: function () {
                            this.shape.setProperty(this.key, this.newValue),
                                this.facade.getCanvas().update(),
                                this.facade.updateSelection()
                        },
                        rollback: function () {
                            this.shape.setProperty(this.key, this.oldValue),
                                this.facade.getCanvas().update(),
                                this.facade.updateSelection()
                        }
                    }));
                    $scope.editor.executeCommands([a]),
                        $scope.editor.handleEvents({
                            type: ORYX.CONFIG.EVENT_PROPWINDOW_PROP_CHANGED,
                            elements: [n],
                            key: o
                        }),
                        e.mode = "read";
                    var l = {
                        type: KISBPM.eventBus.EVENT_TYPE_PROPERTY_VALUE_CHANGED,
                        property: e,
                        oldValue: r,
                        newValue: s
                    };
                    KISBPM.eventBus.dispatch(l.type, l)
                } else e.mode = "read"
            }
        },
        $scope.updateLinkPropertyInModel =function (e, t, i){
            $scope.updatePropertyInModel(e,t,i);
            $scope.changeNodeName(e,i);
            var flowAssignersReqVO={};
            flowAssignersReqVO.modelId = $scope.modelId;
            flowAssignersReqVO.nodeId = $scope.selectedItem.nodeId;
            flowAssignersReqVO.taskType = e.value;
            jQuery.post(__ctx + "/bpm/process/def/updateTaskTypeToModel", flowAssignersReqVO, function (res) {
                console.log("更新成功")
            });
        },
        $scope.findStencilItemInGroup = function (e, t) {
            for (var i, n = 0; n < t.items.length; n++) if ((i = t.items[n]).id === e) return i;
            if (t.groups && 0 < t.groups.length) for (var o = 0; o < t.groups.length; o++) if (i = $scope.findStencilItemInGroup(e, t.groups[o])) return i
        },
        $scope.getStencilItemById = function (e) {
            for (var t = 0; t < $scope.stencilItemGroups.length; t++) {
                var i = $scope.stencilItemGroups[t];
                if (null !== i.items && void 0 !== i.items) {
                    var n = $scope.findStencilItemInGroup(e, i);
                    if (n) return n
                } else if (i.id === e) return i
            }
        },
        $scope.dropCallback = function (e, t) {
            if ($scope.editor.handleEvents({
                type: ORYX.CONFIG.EVENT_HIGHLIGHT_HIDE,
                highlightId: "shapeRepo.attached"
            }), $scope.editor.handleEvents({
                type: ORYX.CONFIG.EVENT_HIGHLIGHT_HIDE,
                highlightId: "shapeRepo.added"
            }), $scope.editor.handleEvents({
                type: ORYX.CONFIG.EVENT_HIGHLIGHT_HIDE,
                highlightId: "shapeMenu"
            }), KISBPM.eventBus.dispatch(KISBPM.eventBus.EVENT_TYPE_HIDE_SHAPE_BUTTONS), $scope.dragCanContain) {
                var i = $scope.getStencilItemById(t.draggable[0].id),
                    n = {
                        x: e.pageX,
                        y: e.pageY
                    },
                    o = 1;
                if (!isNaN(screen.logicalXDPI) && !isNaN(screen.systemXDPI)) if (0 <= navigator.userAgent.indexOf("MSIE")) {
                    var s = Math.round(screen.deviceXDPI / screen.logicalXDPI * 100);
                    100 !== s && (o = s / 100)
                }
                var r = $scope.editor.getCanvas().node.getScreenCTM();
                n.x -= r.e / o,
                    n.y -= r.f / o,
                    n.x /= r.a,
                    n.y /= r.d,
                    n.x -= document.documentElement.scrollLeft,
                    n.y -= document.documentElement.scrollTop;
                var a = $scope.dragCurrentParent.absoluteXY();
                n.x -= a.x,
                    n.y -= a.y;
                for (var l = void 0, p = $scope.editor.getStencilSets().values(), d = 0; d < p.length; d++) {
                    for (var c = p[d], u = c.nodes(), h = 0; h < u.length; h++) if (u[h].idWithoutNs() === t.draggable[0].id) {
                        l = u[h];
                        break
                    }
                    if (!l) {
                        var m = c.edges();
                        for (h = 0; h < m.length; h++) if (m[h].idWithoutNs() === t.draggable[0].id) {
                            l = m[h];
                            break
                        }
                    }
                }
                if (!l) return;
                if ($scope.quickMenu) {
                    var f = $scope.editor.getSelection();
                    if (f && 1 == f.length) {
                        var g = f.first();
                        if ((O = {}).type = g.getStencil().namespace() + t.draggable[0].id, O.namespace = g.getStencil().namespace(), O.connectedShape = g, O.parent = $scope.dragCurrentParent, O.containedStencil = l, !e.ctrlKey) {
                            var v = g.bounds.center();
                            Math.abs(v.x - n.x) < 20 && (n.x = v.x),
                            Math.abs(v.y - n.y) < 20 && (n.y = v.y)
                        }
                        if (O.position = n, "SequenceFlow" !== l.idWithoutNs() && "Association" !== l.idWithoutNs() && "MessageFlow" !== l.idWithoutNs() && "DataAssociation" !== l.idWithoutNs()) {
                            var y = {
                                    sourceShape: g,
                                    targetStencil: l
                                },
                                I = $scope.editor.getRules().connectMorph(y);
                            if (!I) return;
                            O.connectingType = I.id()
                        }
                        var S = new KISBPM.CreateCommand(O, $scope.dropTargetElement, n, $scope.editor);
                        $scope.editor.executeCommands([S])
                    }
                } else {
                    var O, b = !1;
                    "BoundaryErrorEvent" !== l.idWithoutNs() && "BoundaryTimerEvent" !== l.idWithoutNs() && "BoundarySignalEvent" !== l.idWithoutNs() && "BoundaryMessageEvent" !== l.idWithoutNs() && "BoundaryCancelEvent" !== l.idWithoutNs() && "BoundaryCompensationEvent" !== l.idWithoutNs() || (n = $scope.editor.eventCoordinates(e), b = !0),
                        (O = {}).type = $scope.modelData.model.stencilset.namespace + i.id,
                        O.namespace = $scope.modelData.model.stencilset.namespace,
                        O.position = n,
                        O.parent = $scope.dragCurrentParent;
                    S = new(ORYX.Core.Command.extend({
                        construct: function (e, t, i, n, o) {
                            this.option = e,
                                this.docker = null,
                                this.dockedShape = t,
                                this.dockedShapeParent = t.parent || o.getCanvas(),
                                this.position = n,
                                this.facade = o,
                                this.selection = this.facade.getSelection(),
                                this.shape = null,
                                this.parent = null,
                                this.canAttach = i
                        },
                        execute: function () {
                            this.shape ? this.parent && this.parent.add(this.shape) : (this.shape = this.facade.createShape(O), this.parent = this.shape.parent),
                            this.canAttach && this.shape.dockers && this.shape.dockers.length && (this.docker = this.shape.dockers[0], this.dockedShapeParent.add(this.docker.parent), this.docker.setDockedShape(void 0), this.docker.bounds.centerMoveTo(this.position), this.dockedShape !== this.facade.getCanvas() && this.docker.setDockedShape(this.dockedShape), this.facade.setSelection([this.docker.parent])),
                                this.facade.getCanvas().update(),
                                this.facade.updateSelection()
                        },
                        rollback: function () {
                            this.shape && (this.facade.setSelection(this.selection.without(this.shape)), this.facade.deleteShape(this.shape)),
                            this.canAttach && this.docker && this.docker.setDockedShape(void 0),
                                this.facade.getCanvas().update(),
                                this.facade.updateSelection()
                        }
                    }))(O, $scope.dragCurrentParent, b, n, $scope.editor);
                    $scope.editor.executeCommands([S]);
                    var N = {
                        type: KISBPM.eventBus.EVENT_TYPE_ITEM_DROPPED,
                        droppedItem: i,
                        position: n
                    };
                    KISBPM.eventBus.dispatch(N.type, N)
                }
            }
            $scope.dragCurrentParent = void 0,
                $scope.dragCurrentParentId = void 0,
                $scope.dragCurrentParentStencil = void 0,
                $scope.dragCanContain = void 0,
                $scope.quickMenu = void 0,
                $scope.dropTargetElement = void 0
        },
        $scope.overCallback = function (e, t) {
            $scope.dragModeOver = !0
        },
        $scope.outCallback = function (e, t) {
            $scope.dragModeOver = !1
        },
        $scope.startDragCallback = function (e, t) {
            $scope.dragModeOver = !1,
                $scope.quickMenu = !1,
            t.helper.hasClass("stencil-item-dragged") || t.helper.addClass("stencil-item-dragged")
        },
        $scope.startDragCallbackQuickMenu = function (e, t) {
            $scope.dragModeOver = !1,
                $scope.quickMenu = !0
        },
        $scope.dragCallback = function (e, t) {
            if (0 != $scope.dragModeOver) {
                var i = $scope.editor.eventCoordinatesXY(e.pageX, e.pageY),
                    n = 1;
                if (!isNaN(screen.logicalXDPI) && !isNaN(screen.systemXDPI)) if (0 <= navigator.userAgent.indexOf("MSIE")) {
                    var o = Math.round(screen.deviceXDPI / screen.logicalXDPI * 100);
                    100 !== o && (n = o / 100)
                }
                1 !== n && (i.x = i.x / n, i.y = i.y / n);
                var s = $scope.editor.getCanvas().getAbstractShapesAtPosition(i);
                if (s.length <= 0 && e.helper) return $scope.dragCanContain = !1;
                if (s[0] instanceof ORYX.Core.Canvas && $scope.editor.getCanvas().setHightlightStateBasedOnX(i.x), 1 == s.length && s[0] instanceof ORYX.Core.Canvas) {
                    var r = s[0];
                    return $scope.dragCanContain = !0,
                        $scope.dragCurrentParent = r,
                        $scope.dragCurrentParentId = r.id,
                        $scope.editor.handleEvents({
                            type: ORYX.CONFIG.EVENT_HIGHLIGHT_HIDE,
                            highlightId: "shapeRepo.attached"
                        }),
                        $scope.editor.handleEvents({
                            type: ORYX.CONFIG.EVENT_HIGHLIGHT_HIDE,
                            highlightId: "shapeRepo.added"
                        }),
                        !1
                }
                var a = $scope.getStencilItemById(e.target.id);
                if (!(r = s.reverse().find(function (e) {
                    return e instanceof ORYX.Core.Canvas || e instanceof ORYX.Core.Node || e instanceof ORYX.Core.Edge
                }))) return $scope.dragCanContain = !1;
                if ("node" === a.type) {
                    var l = !1,
                        p = r.getStencil().id();
                    if ($scope.dragCurrentParentId && $scope.dragCurrentParentId === r.id) return !1;
                    var d = $scope.getStencilItemById(r.getStencil().idWithoutNs());
                    if (-1 < d.roles.indexOf("Activity") ? -1 < a.roles.indexOf("IntermediateEventOnActivityBoundary") && (l = !0) : "Pool" === r.getStencil().idWithoutNs() && "Lane" === a.id && (l = !0), l) $scope.editor.handleEvents({
                        type: ORYX.CONFIG.EVENT_HIGHLIGHT_SHOW,
                        highlightId: "shapeRepo.attached",
                        elements: [r],
                        style: ORYX.CONFIG.SELECTION_HIGHLIGHT_STYLE_RECTANGLE,
                        color: ORYX.CONFIG.SELECTION_VALID_COLOR
                    }),
                        $scope.editor.handleEvents({
                            type: ORYX.CONFIG.EVENT_HIGHLIGHT_HIDE,
                            highlightId: "shapeRepo.added"
                        });
                    else {
                        for (var c = 0; c < $scope.containmentRules.length; c++) {
                            var u = $scope.containmentRules[c];
                            if (u.role === d.id) {
                                for (var h = 0; h < u.contains.length; h++) if (-1 < a.roles.indexOf(u.contains[h])) {
                                    l = !0;
                                    break
                                }
                                if (l) break
                            }
                        }
                        $scope.editor.handleEvents({
                            type: ORYX.CONFIG.EVENT_HIGHLIGHT_SHOW,
                            highlightId: "shapeRepo.added",
                            elements: [r],
                            color: l ? ORYX.CONFIG.SELECTION_VALID_COLOR : ORYX.CONFIG.SELECTION_INVALID_COLOR
                        }),
                            $scope.editor.handleEvents({
                                type: ORYX.CONFIG.EVENT_HIGHLIGHT_HIDE,
                                highlightId: "shapeRepo.attached"
                            })
                    }
                    $scope.dragCurrentParent = r,
                        $scope.dragCurrentParentId = r.id,
                        $scope.dragCurrentParentStencil = p,
                        $scope.dragCanContain = l
                } else {
                    var m = $scope.editor.getCanvas(),
                        f = !1,
                        g = $scope.getStencilItemById(r.getStencil().idWithoutNs());
                    if (g) {
                        var v = !1;
                        "Association" !== stencil.idWithoutNs() || "TextAnnotation" !== curCan.getStencil().idWithoutNs() && "BoundaryCompensationEvent" !== curCan.getStencil().idWithoutNs() ? "DataAssociation" === stencil.idWithoutNs() && "DataStore" === curCan.getStencil().idWithoutNs() && (v = !0) : v = !0,
                        (g.canConnectTo || v) && (f = !0)
                    }
                    $scope.dragCurrentParent = m,
                        $scope.dragCurrentParentId = m.id,
                        $scope.dragCurrentParentStencil = m.getStencil().id(),
                        $scope.dragCanContain = f,
                        $scope.editor.handleEvents({
                            type: ORYX.CONFIG.EVENT_HIGHLIGHT_SHOW,
                            highlightId: "shapeRepo.added",
                            elements: [m],
                            color: ORYX.CONFIG.SELECTION_VALID_COLOR
                        }),
                        $scope.editor.handleEvents({
                            type: ORYX.CONFIG.EVENT_HIGHLIGHT_HIDE,
                            highlightId: "shapeRepo.attached"
                        })
                }
            }
        },
        $scope.dragCallbackQuickMenu = function (e, t) {
            if (0 != $scope.dragModeOver) {
                var i = $scope.editor.eventCoordinatesXY(e.pageX, e.pageY),
                    n = 1;
                if (!isNaN(screen.logicalXDPI) && !isNaN(screen.systemXDPI)) if (0 <= navigator.userAgent.indexOf("MSIE")) {
                    var o = Math.round(screen.deviceXDPI / screen.logicalXDPI * 100);
                    100 !== o && (n = o / 100)
                }
                1 !== n && (i.x = i.x / n, i.y = i.y / n);
                var s = $scope.editor.getCanvas().getAbstractShapesAtPosition(i);
                if (s.length <= 0 && e.helper) return $scope.dragCanContain = !1;
                s[0] instanceof ORYX.Core.Canvas && $scope.editor.getCanvas().setHightlightStateBasedOnX(i.x);
                for (var r = void 0, a = $scope.editor.getStencilSets().values(), l = 0; l < a.length; l++) {
                    for (var p = a[l], d = p.nodes(), c = 0; c < d.length; c++) if (d[c].idWithoutNs() === e.target.id) {
                        r = d[c];
                        break
                    }
                    if (!r) {
                        var u = p.edges();
                        for (c = 0; c < u.length; c++) if (u[c].idWithoutNs() === e.target.id) {
                            r = u[c];
                            break
                        }
                    }
                }
                var h = s.last(),
                    m = !1;
                if ("node" === r.type()) {
                    var f = $scope.editor.getRules().canContain({
                        containingShape: h,
                        containedStencil: r
                    });
                    if (!(b = s.reverse().find(function (e) {
                        return e instanceof ORYX.Core.Canvas || e instanceof ORYX.Core.Node || e instanceof ORYX.Core.Edge
                    }))) return $scope.dragCanContain = !1;
                    $scope.dragCurrentParent = b,
                        $scope.dragCurrentParentId = b.id,
                        $scope.dragCurrentParentStencil = b.getStencil().id(),
                        $scope.dragCanContain = f,
                        $scope.dropTargetElement = b,
                        m = f
                } else {
                    var g = $scope.editor.getSelection();
                    if (g && 1 == g.length) {
                        var v = g.first(),
                            y = h,
                            I = !1,
                            S = $scope.getStencilItemById(y.getStencil().idWithoutNs());
                        if (S) {
                            var O = !1;
                            if ("Association" !== r.idWithoutNs() || "TextAnnotation" !== y.getStencil().idWithoutNs() && "BoundaryCompensationEvent" !== y.getStencil().idWithoutNs() ? "DataAssociation" === r.idWithoutNs() && "DataStore" === y.getStencil().idWithoutNs() && (O = !0) : O = !0, S.canConnectTo || O) for (; !I && y && !(y instanceof ORYX.Core.Canvas);) h = y,
                                I = $scope.editor.getRules().canConnect({
                                    sourceShape: v,
                                    edgeStencil: r,
                                    targetShape: y
                                }),
                                y = y.parent
                        }
                        var b = $scope.editor.getCanvas();
                        m = I,
                            $scope.dragCurrentParent = b,
                            $scope.dragCurrentParentId = b.id,
                            $scope.dragCurrentParentStencil = b.getStencil().id(),
                            $scope.dragCanContain = I,
                            $scope.dropTargetElement = h
                    }
                }
                $scope.editor.handleEvents({
                    type: ORYX.CONFIG.EVENT_HIGHLIGHT_SHOW,
                    highlightId: "shapeMenu",
                    elements: [h],
                    color: m ? ORYX.CONFIG.SELECTION_VALID_COLOR : ORYX.CONFIG.SELECTION_INVALID_COLOR
                })
            }
        }
}]);
var KISBPM = window.KISBPM = window.KISBPM || {};
KISBPM.CreateCommand = ORYX.Core.Command.extend({
    construct: function (e, t, i, n) {
        this.option = e,
            this.currentReference = t,
            this.position = i,
            this.facade = n,
            this.shape,
            this.edge,
            this.targetRefPos,
            this.sourceRefPos,
            this.connectedShape = e.connectedShape,
            this.connectingType = e.connectingType,
            this.namespace = e.namespace,
            this.type = e.type,
            this.containedStencil = e.containedStencil,
            this.parent = e.parent,
            this.currentReference = t,
            this.shapeOptions = e.shapeOptions
    },
    execute: function () {
        if (this.shape ? this.shape instanceof ORYX.Core.Node ? (this.parent.add(this.shape), this.edge && (this.facade.getCanvas().add(this.edge), this.edge.dockers.first().setDockedShape(this.connectedShape), this.edge.dockers.first().setReferencePoint(this.sourceRefPos), this.edge.dockers.last().setDockedShape(this.shape), this.edge.dockers.last().setReferencePoint(this.targetRefPos)), this.facade.setSelection([this.shape])) : this.shape instanceof ORYX.Core.Edge && (this.facade.getCanvas().add(this.shape), this.shape.dockers.first().setDockedShape(this.connectedShape), this.shape.dockers.first().setReferencePoint(this.sourceRefPos)) : (this.shape = this.facade.createShape(this.option), this.edge = this.shape instanceof ORYX.Core.Edge ? void 0 : this.shape.getIncomingShapes().first()), this.currentReference && this.position) if (this.shape instanceof ORYX.Core.Edge) {
            if (this.currentReference instanceof ORYX.Core.Canvas) this.shape.dockers.last().bounds.centerMoveTo(this.position);
            else if (this.shape.dockers.last().setDockedShape(this.currentReference), "TextAnnotation" === this.currentReference.getStencil().idWithoutNs()) {
                var e = {
                    x: 0
                };
                e.y = this.currentReference.bounds.height() / 2,
                    this.shape.dockers.last().setReferencePoint(e)
            } else this.shape.dockers.last().setReferencePoint(this.currentReference.bounds.midPoint());
            this.sourceRefPos = this.shape.dockers.first().referencePoint,
                this.targetRefPos = this.shape.dockers.last().referencePoint
        } else this.edge && (this.sourceRefPos = this.edge.dockers.first().referencePoint, this.targetRefPos = this.edge.dockers.last().referencePoint);
        else {
            var t = this.containedStencil,
                i = this.connectedShape.bounds,
                n = this.shape.bounds,
                o = i.center();
            "north" === t.defaultAlign() ? o.y -= i.height() / 2 + ORYX.CONFIG.SHAPEMENU_CREATE_OFFSET + n.height() / 2 : "northeast" === t.defaultAlign() ? (o.x += i.width() / 2 + ORYX.CONFIG.SHAPEMENU_CREATE_OFFSET_CORNER + n.width() / 2, o.y -= i.height() / 2 + ORYX.CONFIG.SHAPEMENU_CREATE_OFFSET_CORNER + n.height() / 2) : "southeast" === t.defaultAlign() ? (o.x += i.width() / 2 + ORYX.CONFIG.SHAPEMENU_CREATE_OFFSET_CORNER + n.width() / 2, o.y += i.height() / 2 + ORYX.CONFIG.SHAPEMENU_CREATE_OFFSET_CORNER + n.height() / 2) : "south" === t.defaultAlign() ? o.y += i.height() / 2 + ORYX.CONFIG.SHAPEMENU_CREATE_OFFSET + n.height() / 2 : "southwest" === t.defaultAlign() ? (o.x -= i.width() / 2 + ORYX.CONFIG.SHAPEMENU_CREATE_OFFSET_CORNER + n.width() / 2, o.y += i.height() / 2 + ORYX.CONFIG.SHAPEMENU_CREATE_OFFSET_CORNER + n.height() / 2) : "west" === t.defaultAlign() ? o.x -= i.width() / 2 + ORYX.CONFIG.SHAPEMENU_CREATE_OFFSET + n.width() / 2 : "northwest" === t.defaultAlign() ? (o.x -= i.width() / 2 + ORYX.CONFIG.SHAPEMENU_CREATE_OFFSET_CORNER + n.width() / 2, o.y -= i.height() / 2 + ORYX.CONFIG.SHAPEMENU_CREATE_OFFSET_CORNER + n.height() / 2) : o.x += i.width() / 2 + ORYX.CONFIG.SHAPEMENU_CREATE_OFFSET + n.width() / 2,
                this.shape.bounds.centerMoveTo(o),
            this.shape instanceof ORYX.Core.Node && (this.shape.dockers || []).each(function (e) {
                e.bounds.centerMoveTo(o)
            }),
                this.position = o,
            this.edge && (this.sourceRefPos = this.edge.dockers.first().referencePoint, this.targetRefPos = this.edge.dockers.last().referencePoint)
        }
        this.facade.getCanvas().update(),
            this.facade.updateSelection()
    },
    rollback: function () {
        this.facade.deleteShape(this.shape),
        this.edge && this.facade.deleteShape(this.edge),
            this.facade.setSelection(this.facade.getSelection().without(this.shape, this.edge))
    }
}),
    angular.module("activitiModeler").controller("ToolbarController", ["$scope", "$http", "$modal", "$q", "$rootScope", "$translate", "$location", function (s, o, r, a, l, p, e) {
        s.editorFactory.promise.then(function () {
            s.items = KISBPM.TOOLBAR_CONFIG.items
        }),
            s.secondaryItems = KISBPM.TOOLBAR_CONFIG.secondaryItems;
        var d = function (e, t) {
            for (var i = Array.prototype.slice.call(arguments).splice(2), n = e.split("."), o = n.pop(), s = 0; s < n.length; s++) t = t[n[s]];
            return t[o].apply(this, i)
        };
        s.toolbarButtonClicked = function (e) {
            var t = s.items[e],
                i = {
                    $scope: s,
                    $rootScope: l,
                    $http: o,
                    $modal: r,
                    $q: a,
                    $translate: p
                };
            d(t.action, window, i);
            var n = {
                type: KISBPM.eventBus.EVENT_TYPE_TOOLBAR_BUTTON_CLICKED,
                toolbarItem: t
            };
            KISBPM.eventBus.dispatch(n.type, n)
        },
            s.toolbarSecondaryButtonClicked = function (e) {
                parent.colseModelDesigner();
                // jQuery.Dialog.close();
            },
            Mousetrap.bind(["command+z", "ctrl+z"], function (e) {
                var t = {
                    $scope: s,
                    $rootScope: l,
                    $http: o,
                    $modal: r,
                    $q: a,
                    $translate: p
                };
                return KISBPM.TOOLBAR.ACTIONS.undo(t),
                    !1
            }),
            Mousetrap.bind(["command+y", "ctrl+y"], function (e) {
                var t = {
                    $scope: s,
                    $rootScope: l,
                    $http: o,
                    $modal: r,
                    $q: a,
                    $translate: p
                };
                return KISBPM.TOOLBAR.ACTIONS.redo(t),
                    !1
            }),
            Mousetrap.bind(["command+c", "ctrl+c"], function (e) {
                var t = {
                    $scope: s,
                    $rootScope: l,
                    $http: o,
                    $modal: r,
                    $q: a,
                    $translate: p
                };
                return KISBPM.TOOLBAR.ACTIONS.copy(t),
                    !1
            }),
            Mousetrap.bind(["command+v", "ctrl+v"], function (e) {
                var t = {
                    $scope: s,
                    $rootScope: l,
                    $http: o,
                    $modal: r,
                    $q: a,
                    $translate: p
                };
                return KISBPM.TOOLBAR.ACTIONS.paste(t),
                    !1
            }),
            Mousetrap.bind(["del"], function (e) {
                var t = {
                    $scope: s,
                    $rootScope: l,
                    $http: o,
                    $modal: r,
                    $q: a,
                    $translate: p
                };
                return KISBPM.TOOLBAR.ACTIONS.deleteItem(t),
                    !1
            }),
            s.undoStack = [],
            s.redoStack = [],
            s.editorFactory.promise.then(function () {
                s.editor.registerOnEvent(ORYX.CONFIG.EVENT_EXECUTE_COMMANDS, function (e) {
                    if (e.commands) {
                        s.undoStack.push(e.commands),
                            s.redoStack = [];
                        for (var t = 0; t < s.items.length; t++) {
                            var i = s.items[t];
                            "KISBPM.TOOLBAR.ACTIONS.undo" === i.action ? i.enabled = !0 : "KISBPM.TOOLBAR.ACTIONS.redo" === i.action && (i.enabled = !1)
                        }
                        s.editor.getCanvas().update(),
                            s.editor.updateSelection()
                    }
                })
            }),
            s.editorFactory.promise.then(function () {
                s.editor.registerOnEvent(ORYX.CONFIG.EVENT_SELECTION_CHANGED, function (e) {
                    for (var t = e.elements, i = 0; i < s.items.length; i++) {
                        var n = s.items[i];
                        if (n.enabledAction && "element" === n.enabledAction) {
                            var o = 1;
                            n.minSelectionCount && (o = n.minSelectionCount),
                                t.length >= o && !n.enabled ? s.safeApply(function () {
                                    n.enabled = !0
                                }) : 0 == t.length && n.enabled && s.safeApply(function () {
                                    n.enabled = !1
                                })
                        }
                    }
                })
            })
    }]),
    angular.module("activitiModeler").controller("HeaderController", ["$rootScope", "$scope", "$http", "$timeout", function (e, t, i, n) {
        t.headerConfig = KISBPM.HEADER_CONFIG
    }]);
var KisBpmShapeSelectionCtrl = ["$rootScope", "$scope", "$timeout", "$translate", function (e, l, t, i) {
        l.selectedMorphShapes = [],
            l.availableMorphShapes = [];
        for (var n = 0; n < l.morphShapes.length; n++) l.morphShapes[n].id != l.currentSelectedShape.getStencil().idWithoutNs() && l.availableMorphShapes.push(l.morphShapes[n]);
        l.gridOptions = {
            data: "availableMorphShapes",
            enableRowReordering: !0,
            headerRowHeight: 28,
            multiSelect: !1,
            keepLastSelected: !1,
            selectedItems: l.selectedMorphShapes,
            columnDefs: [{
                field: "objectId",
                displayName: "Icon",
                width: 50,
                cellTemplate: "editor-app/popups/icon-template.html?version=" + Date.now()
            },
                {
                    field: "name",
                    displayName: "Name"
                }]
        },
            l.select = function () {
                if (0 < l.selectedMorphShapes.length) {
                    var e = ORYX.Core.Command.extend({
                            construct: function (e, t, i) {
                                this.shape = e,
                                    this.stencil = t,
                                    this.facade = i
                            },
                            execute: function () {
                                var e = this.shape,
                                    t = this.stencil,
                                    i = e.resourceId,
                                    n = e.serialize();
                                t.properties().each(function (t) {
                                    t.readonly() && (n = n.reject(function (e) {
                                        return e.name == t.id()
                                    }))
                                }.bind(this)),
                                    this.newShape ? (newShape = this.newShape, this.facade.getCanvas().add(newShape)) : newShape = this.facade.createShape({
                                        type: t.id(),
                                        namespace: t.namespace(),
                                        resourceId: i
                                    });
                                var o = n.find(function (e) {
                                        return "oryx" === e.prefix && "bounds" === e.name
                                    }),
                                    s = null;
                                if (this.facade.getRules().preserveBounds(e.getStencil())) {
                                    var r = e.bounds.height(),
                                        a = e.bounds.width();
                                    newShape.minimumSize && (e.bounds.height() < newShape.minimumSize.height && (r = newShape.minimumSize.height), e.bounds.width() < newShape.minimumSize.width && (a = newShape.minimumSize.width)),
                                    newShape.maximumSize && (e.bounds.height() > newShape.maximumSize.height && (r = newShape.maximumSize.height), e.bounds.width() > newShape.maximumSize.width && (a = newShape.maximumSize.width)),
                                        s = {
                                            a: {
                                                x: e.bounds.a.x,
                                                y: e.bounds.a.y
                                            },
                                            b: {
                                                x: e.bounds.a.x + a,
                                                y: e.bounds.a.y + r
                                            }
                                        }
                                } else {
                                    var l = o.value.split(",");
                                    if (parseInt(l[0], 10) > parseInt(l[2], 10)) {
                                        var p = l[0];
                                        l[0] = l[2],
                                            l[2] = p,
                                            p = l[1],
                                            l[1] = l[3],
                                            l[3] = p
                                    }
                                    l[2] = parseInt(l[0], 10) + newShape.bounds.width(),
                                        l[3] = parseInt(l[1], 10) + newShape.bounds.height(),
                                        o.value = l.join(",")
                                }
                                var d = e.bounds.center();
                                null !== s && newShape.bounds.set(s),
                                    this.setRelatedDockers(e, newShape);
                                var c = e.node.parentNode,
                                    u = e.node.nextSibling;
                                this.facade.deleteShape(e),
                                    newShape.deserialize(n),
                                e.getStencil().property("oryx-bgcolor") && e.properties["oryx-bgcolor"] && e.getStencil().property("oryx-bgcolor").value().toUpperCase() == e.properties["oryx-bgcolor"].toUpperCase() && newShape.getStencil().property("oryx-bgcolor") && newShape.setProperty("oryx-bgcolor", newShape.getStencil().property("oryx-bgcolor").value()),
                                null !== s && newShape.bounds.set(s),
                                "edge" !== newShape.getStencil().type() && 0 != newShape.dockers.length && newShape.dockers[0].getDockedShape() || newShape.bounds.centerMoveTo(d),
                                "node" !== newShape.getStencil().type() || 0 != newShape.dockers.length && newShape.dockers[0].getDockedShape() || this.setRelatedDockers(newShape, newShape),
                                    u ? c.insertBefore(newShape.node, u) : c.appendChild(newShape.node),
                                    this.facade.setSelection([newShape]),
                                    this.facade.getCanvas().update(),
                                    this.facade.updateSelection(),
                                    this.newShape = newShape
                            },
                            rollback: function () {
                                this.shape && this.newShape && this.newShape.parent && (this.newShape.parent.add(this.shape), this.setRelatedDockers(this.newShape, this.shape), this.facade.deleteShape(this.newShape), this.facade.setSelection([this.shape]), this.facade.getCanvas().update(), this.facade.updateSelection())
                            },
                            setRelatedDockers: function (s, r) {
                                "node" === s.getStencil().type() ? ((s.incoming || []).concat(s.outgoing || []).each(function (o) {
                                    o.dockers.each(function (e) {
                                        if (e.getDockedShape() == s) {
                                            var t = Object.clone(e.referencePoint),
                                                i = {
                                                    x: t.x * r.bounds.width() / s.bounds.width(),
                                                    y: t.y * r.bounds.height() / s.bounds.height()
                                                };
                                            if (e.setDockedShape(r), e.setReferencePoint(i), o instanceof ORYX.Core.Edge) e.bounds.centerMoveTo(i);
                                            else {
                                                var n = s.absoluteXY();
                                                e.bounds.centerMoveTo({
                                                    x: i.x + n.x,
                                                    y: i.y + n.y
                                                })
                                            }
                                        }
                                    })
                                }), 0 < s.dockers.length && s.dockers.first().getDockedShape() && (r.dockers.first().setDockedShape(s.dockers.first().getDockedShape()), r.dockers.first().setReferencePoint(Object.clone(s.dockers.first().referencePoint)))) : (r.dockers.first().setDockedShape(s.dockers.first().getDockedShape()), r.dockers.first().setReferencePoint(s.dockers.first().referencePoint), r.dockers.last().setDockedShape(s.dockers.last().getDockedShape()), r.dockers.last().setReferencePoint(s.dockers.last().referencePoint))
                            }
                        }),
                        t = void 0,
                        i = l.editor.getStencilSets().values(),
                        n = l.selectedMorphShapes[0].id;
                    l.selectedMorphShapes[0].genericTaskId && (n = l.selectedMorphShapes[0].genericTaskId);
                    for (var o = 0; o < i.length; o++) for (var s = i[o].nodes(), r = 0; r < s.length; r++) if (s[r].idWithoutNs() === n) {
                        t = s[r];
                        break
                    }
                    if (!t) return;
                    var a = new e(l.currentSelectedShape, t, l.editor);
                    l.editor.executeCommands([a])
                }
                l.close()
            },
            l.cancel = function () {
                l.$hide()
            },
            l.close = function () {
                l.$hide()
            }
    }],
    EDITOR = EDITOR || {};
EDITOR.UTIL = {
    getParameterByName: function (e) {
        e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var t = new RegExp("[\\?&]" + e + "=([^&#]*)").exec(location.search);
        return null == t ? "" : decodeURIComponent(t[1].replace(/\+/g, " "))
    },
    collectPropertiesFromPrecedingElements: function (e, t) {
        var i = [];
        return EDITOR.UTIL._visitElementAndCollectProperty(e, t, [], i),
            i
    },
    collectElementsFromPrecedingElements: function (e, t) {
        var i = [],
            n = [],
            o = e.getIncomingShapes();
        if (o) for (var s = 0; s < o.length; s++) {
            var r = o[s];
            i.indexOf(r.id) < 0 && EDITOR.UTIL._visitElementAndCollectElement(r, t, i, n)
        }
        return n
    },
    _visitElementAndCollectProperty: function (e, t, i, n) {
        i.push(e.id);
        var o = e.properties[t];
        o && n.push(o);
        var s = e.getIncomingShapes();
        if (s) for (var r = 0; r < s.length; r++) {
            var a = s[r];
            i.indexOf(a.id) < 0 && EDITOR.UTIL._visitElementAndCollectProperty(a, t, i, n)
        }
    },
    _visitElementAndCollectElement: function (e, t, i, n) {
        i.push(e.id);
        var o = e.getStencil().id();
        o && 0 <= o.indexOf(t) && n.push(e);
        var s = e.getIncomingShapes();
        if (s) for (var r = 0; r < s.length; r++) {
            var a = s[r];
            i.indexOf(a.id) < 0 && EDITOR.UTIL._visitElementAndCollectElement(a, t, i, n)
        }
    },
    getPropertyFromParent: function (e, t) {
        return e.parent ? EDITOR.UTIL._getPropertyFromParent(e.parent, t) : void 0
    },
    _getPropertyFromParent: function (e, t) {
        var i = e.properties[t];
        return i || (e.parent ? EDITOR.UTIL._getPropertyFromParent(e.parent, t) : void 0)
    }
};
var KISBPM = KISBPM || {};
KISBPM.TOOLBAR = {
    ACTIONS: {
        saveModel: function (e) {
            e.$modal({
                backdrop: !0,
                keyboard: !0,
                template: "editor-app/popups/save-model.html?version=" + Date.now(),
                scope: e.$scope
            })
        },
        undo: function (e) {
            var t = e.$scope.undoStack.pop();
            if (t) {
                e.$scope.redoStack.push(t),
                e.$rootScope && e.$rootScope.forceSelectionRefresh && (e.$rootScope.forceSelectionRefresh = !0);
                for (var i = t.length - 1; 0 <= i; --i) t[i].rollback();
                e.$scope.editor.handleEvents({
                    type: ORYX.CONFIG.EVENT_UNDO_ROLLBACK,
                    commands: t
                }),
                    e.$scope.editor.getCanvas().update(),
                    e.$scope.editor.updateSelection()
            }
            var n = !1;
            0 == e.$scope.undoStack.length && (n = !0);
            var o = !1;
            if (0 < e.$scope.redoStack.length && (o = !0), n || o) for (i = 0; i < e.$scope.items.length; i++) {
                var s = e.$scope.items[i];
                n && "KISBPM.TOOLBAR.ACTIONS.undo" === s.action ? e.$scope.safeApply(function () {
                    s.enabled = !1
                }) : o && "KISBPM.TOOLBAR.ACTIONS.redo" === s.action && e.$scope.safeApply(function () {
                    s.enabled = !0
                })
            }
        },
        redo: function (e) {
            var t = e.$scope.redoStack.pop();
            t && (e.$scope.undoStack.push(t), e.$rootScope && e.$rootScope.forceSelectionRefresh && (e.$rootScope.forceSelectionRefresh = !0), t.each(function (e) {
                e.execute()
            }), e.$scope.editor.handleEvents({
                type: ORYX.CONFIG.EVENT_UNDO_EXECUTE,
                commands: t
            }), e.$scope.editor.getCanvas().update(), e.$scope.editor.updateSelection());
            var i = !1;
            0 < e.$scope.undoStack.length && (i = !0);
            var n = !1;
            if (0 == e.$scope.redoStack.length && (n = !0), i || n) for (var o = 0; o < e.$scope.items.length; o++) {
                var s = e.$scope.items[o];
                i && "KISBPM.TOOLBAR.ACTIONS.undo" === s.action ? e.$scope.safeApply(function () {
                    s.enabled = !0
                }) : n && "KISBPM.TOOLBAR.ACTIONS.redo" === s.action && e.$scope.safeApply(function () {
                    s.enabled = !1
                })
            }
        },
        cut: function (e) {
            KISBPM.TOOLBAR.ACTIONS._getOryxEditPlugin(e.$scope).editCut();
            for (var t = 0; t < e.$scope.items.length; t++) {
                var i = e.$scope.items[t];
                "KISBPM.TOOLBAR.ACTIONS.paste" === i.action && e.$scope.safeApply(function () {
                    i.enabled = !0
                })
            }
        },
        copy: function (e) {
            KISBPM.TOOLBAR.ACTIONS._getOryxEditPlugin(e.$scope).editCopy();
            for (var t = 0; t < e.$scope.items.length; t++) {
                var i = e.$scope.items[t];
                "KISBPM.TOOLBAR.ACTIONS.paste" === i.action && e.$scope.safeApply(function () {
                    i.enabled = !0
                })
            }
        },
        paste: function (e) {
            KISBPM.TOOLBAR.ACTIONS._getOryxEditPlugin(e.$scope).editPaste()
        },
        deleteItem: function (e) {
            KISBPM.TOOLBAR.ACTIONS._getOryxEditPlugin(e.$scope).editDelete()
        },
        addBendPoint: function (e) {
            var t = KISBPM.TOOLBAR.ACTIONS._getOryxDockerPlugin(e.$scope),
                i = !t.enabledAdd();
            t.setEnableAdd(i),
                i ? (t.setEnableRemove(!1), document.body.style.cursor = "pointer") : document.body.style.cursor = "default"
        },
        removeBendPoint: function (e) {
            var t = KISBPM.TOOLBAR.ACTIONS._getOryxDockerPlugin(e.$scope),
                i = !t.enabledRemove();
            t.setEnableRemove(i),
                i ? (t.setEnableAdd(!1), document.body.style.cursor = "pointer") : document.body.style.cursor = "default"
        },
        _getOryxEditPlugin: function (e) {
            return void 0 !== e.oryxEditPlugin && null !== e.oryxEditPlugin || (e.oryxEditPlugin = new ORYX.Plugins.Edit(e.editor)),
                e.oryxEditPlugin
        },
        zoomIn: function (e) {
            KISBPM.TOOLBAR.ACTIONS._getOryxViewPlugin(e.$scope).zoom([1 + ORYX.CONFIG.ZOOM_OFFSET])
        },
        zoomOut: function (e) {
            KISBPM.TOOLBAR.ACTIONS._getOryxViewPlugin(e.$scope).zoom([1 - ORYX.CONFIG.ZOOM_OFFSET])
        },
        zoomActual: function (e) {
            KISBPM.TOOLBAR.ACTIONS._getOryxViewPlugin(e.$scope).setAFixZoomLevel(1)
        },
        zoomFit: function (e) {
            KISBPM.TOOLBAR.ACTIONS._getOryxViewPlugin(e.$scope).zoomFitToModel()
        },
        alignVertical: function (e) {
            KISBPM.TOOLBAR.ACTIONS._getOryxArrangmentPlugin(e.$scope).alignShapes([ORYX.CONFIG.EDITOR_ALIGN_MIDDLE])
        },
        alignHorizontal: function (e) {
            KISBPM.TOOLBAR.ACTIONS._getOryxArrangmentPlugin(e.$scope).alignShapes([ORYX.CONFIG.EDITOR_ALIGN_CENTER])
        },
        sameSize: function (e) {
            KISBPM.TOOLBAR.ACTIONS._getOryxArrangmentPlugin(e.$scope).alignShapes([ORYX.CONFIG.EDITOR_ALIGN_SIZE])
        },
        closeEditor: function (e) {
            window.location.href = "./"
        },
        _getOryxViewPlugin: function (e) {
            return void 0 !== e.oryxViewPlugin && null !== e.oryxViewPlugin || (e.oryxViewPlugin = new ORYX.Plugins.View(e.editor)),
                e.oryxViewPlugin
        },
        _getOryxArrangmentPlugin: function (e) {
            return void 0 !== e.oryxArrangmentPlugin && null !== e.oryxArrangmentPlugin || (e.oryxArrangmentPlugin = new ORYX.Plugins.Arrangement(e.editor)),
                e.oryxArrangmentPlugin
        },
        _getOryxDockerPlugin: function (e) {
            return void 0 !== e.oryxDockerPlugin && null !== e.oryxDockerPlugin || (e.oryxDockerPlugin = new ORYX.Plugins.AddDocker(e.editor)),
                e.oryxDockerPlugin
        }
    }
};
var SaveModelCtrl = ["$rootScope", "$scope", "$http", "$route", "$location", function (e, l, p, t, i) {
        var d = l.editor.getModelMetaData(),
            n = "";
        d.description && (n = d.description);
        var o = {
            name: d.name,
            description: n
        };
        l.saveDialog = o;
        var s = l.editor.getJSON();
        s = JSON.stringify(s);
        d.model.modelType;
        l.status = {
            loading: !1
        },
            l.close = function () {
                l.$hide()
            },
            l.saveAndClose = function () {
                l.save(function () {
                    window.location.href = "./"
                })
            },
            l.save = function (s) {

                if (l.saveDialog.name && 0 != l.saveDialog.name.length) {
                    l.status = {
                        loading: !0
                    },
                        d.name = l.saveDialog.name,
                        d.description = l.saveDialog.description;
                    var e = l.editor.getJSON();
                    e = JSON.stringify(e);
                    var t = l.editor.getSelection();
                    l.editor.setSelection([]);
                    var i = l.editor.getCanvas().getSVGRepresentation(!0);
                    if (l.editor.setSelection(t), !1 === l.editor.getCanvas().properties["oryx-showstripableelements"]) for (var n = (o = jQuery(i).find(".stripable-element")).length - 1; 0 <= n; n--) o[n].remove();
                    var o;
                    for (n = (o = jQuery(i).find(".stripable-element-force")).length - 1; 0 <= n; n--) o[n].remove();
                    var r = {
                            json_xml: e,
                            svg_xml: DataManager.serialize(i),
                            name: l.saveDialog.name,
                            description: l.saveDialog.description,
                            bpmDefSetting: JSON.stringify(l.bpmDefSetting)
                        },
                        a = !1;
                    !0 === s && (r.publish = !0, a = !0, s = ""),
                        p({
                            method: "PUT",
                            data: r,
                            ignoreErrors: !0,
                            headers: {
                                Accept: "application/json",
                                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                            },
                            transformRequest: function (e) {
                                var t = [];
                                for (var i in e) t.push(encodeURIComponent(i) + "=" + encodeURIComponent(e[i]));
                                return t.join("&")
                            },
                            url: KISBPM.URL.putModel(d.modelId)
                        }).success(function (e, t, i, n) {
                            if (e && !1 === e.isOk) return l.error = {
                                msg: e.msg
                            },
                                console.log("Something went wrong when updating the process model:" + e.msg),
                                void(l.status.loading = !1);
                            l.editor.handleEvents({
                                type: ORYX.CONFIG.EVENT_SAVED
                            }),
                                l.modelData.name = l.saveDialog.name,
                                l.modelData.lastUpdated = e.lastUpdated,
                                l.status.loading = !1,
                                l.$hide();
                            var o = {
                                type: KISBPM.eventBus.EVENT_TYPE_MODEL_SAVED,
                                model: r,
                                modelId: d.modelId,
                                eventType: "update-model"
                            };
                            // parent.colseModelDesigner();
                            l.$hide();
                            KISBPM.eventBus.dispatch(KISBPM.eventBus.EVENT_TYPE_MODEL_SAVED, o),
                                l.error = void 0,
                                l.status.loading = !1,
                            a && (window.opener && window.opener.reloadGrid(), jQuery.Dialog.close()),
                            s && s()
                        }).error(function (e, t, i, n) {
                            l.error = {
                                msg: "未知错误" + t
                            },
                                console.log("Something went wrong when updating the process model:" + JSON.stringify(e)),
                                l.status.loading = !1
                        })
                }
            }


    }],
    KisBpmStringPropertyCtrl = ["$scope", function (t) {
        t.shapeId = t.selectedShape.id,
            t.valueFlushed = !1,
            t.inputBlurred = function () {
                t.valueFlushed = !0,
                t.property.value && (t.property.value = t.property.value.replace(/(<([^>]+)>)/gi, "")),
                    t.updatePropertyInModel(t.property)
            },
            t.enterPressed = function (e) {
                e && 13 === e.which && (e.preventDefault(), t.inputBlurred())
            },
            t.$on("$destroy", function () {
                t.valueFlushed || (t.property.value && (t.property.value = t.property.value.replace(/(<([^>]+)>)/gi, "")), t.updatePropertyInModel(t.property, t.shapeId))
            })
    }],
    KisBpmBooleanPropertyCtrl = ["$scope", function (o) {
        o.changeValue = function () {
            if ("oryx-defaultflow" === o.property.key && o.property.value) {
                var e = o.selectedShape;
                if (e) {
                    var t = e.getIncomingShapes();
                    if (t && 0 < t.length) {
                        var i = t[0].getOutgoingShapes();
                        if (i && 1 < i.length) for (var n = 0; n < i.length; n++) {
                            if (i[n].resourceId != e.resourceId) i[n].properties["oryx-defaultflow"] && i[n].setProperty("oryx-defaultflow", !1, !0)
                        }
                    }
                }
            }
            o.updatePropertyInModel(o.property)
        }
    }],
    KisBpmTextPropertyCtrl = ["$scope", "$modal", function (e, t) {
        t({
            template: "editor-app/configuration/properties/text-popup.html?version=" + Date.now(),
            scope: e
        })
    }],
    KisBpmTextPropertyPopupCtrl = ["$scope", function (e) {
        e.save = function () {
            e.updatePropertyInModel(e.property),
                e.close()
        },
            e.close = function () {
                e.property.mode = "read",
                    e.$hide()
            }
    }],
    KisBpmExecutionListenersCtrl = ["$scope", "$modal", "$timeout", "$translate", function (e, t, i, n) {
        t({
            template: "editor-app/configuration/properties/execution-listeners-popup.html?version=" + Date.now(),
            scope: e
        })
    }],
    KisBpmExecutionListenersPopupCtrl = ["$scope", "$q", "$translate", function (s, e, t) {
        if (void 0 !== s.property.value && null !== s.property.value && void 0 !== s.property.value.executionListeners && null !== s.property.value.executionListeners) {
            s.property.value.executionListeners.constructor == String ? s.executionListeners = JSON.parse(s.property.value.executionListeners) : s.executionListeners = angular.copy(s.property.value.executionListeners);
            for (var i = 0; i < s.executionListeners.length; i++) {
                var n = s.executionListeners[i];
                void 0 !== n.className && "" !== n.className ? n.implementation = n.className : void 0 !== n.expression && "" !== n.expression ? n.implementation = n.expression : void 0 !== n.delegateExpression && "" !== n.delegateExpression && (n.implementation = n.delegateExpression)
            }
        } else s.executionListeners = [];
        s.selectedListeners = [],
            s.selectedFields = [],
            s.translationsRetrieved = !1,
            s.labels = {};
        var o = t("PROPERTY.EXECUTIONLISTENERS.EVENT"),
            r = t("PROPERTY.EXECUTIONLISTENERS.FIELDS.IMPLEMENTATION"),
            a = t("PROPERTY.EXECUTIONLISTENERS.FIELDS.NAME");
        e.all([o, r, a]).then(function (e) {
            s.labels.eventLabel = e[0],
                s.labels.implementationLabel = e[1],
                s.labels.nameLabel = e[2],
                s.translationsRetrieved = !0,
                s.gridOptions = {
                    data: "executionListeners",
                    enableRowReordering: !0,
                    headerRowHeight: 28,
                    multiSelect: !1,
                    keepLastSelected: !1,
                    selectedItems: s.selectedListeners,
                    afterSelectionChange: function (e, t) {
                        if ((s.selectedFields.length = 0) < s.selectedListeners.length) {
                            var i = s.selectedListeners[0].fields;
                            if (null != i) for (var n = 0; n < i.length; n++) {
                                var o = i[n];
                                void 0 !== o.stringValue && "" !== o.stringValue ? o.implementation = o.stringValue : void 0 !== o.expression && "" !== o.expression ? o.implementation = o.expression : void 0 !== o.string && "" !== o.string && (o.implementation = o.string)
                            }
                        }
                    },
                    columnDefs: [{
                        field: "event",
                        displayName: s.labels.eventLabel
                    },
                        {
                            field: "implementation",
                            displayName: s.labels.implementationLabel
                        }]
                },
                s.gridFieldOptions = {
                    data: "selectedListeners[0].fields",
                    enableRowReordering: !0,
                    headerRowHeight: 28,
                    multiSelect: !1,
                    keepLastSelected: !1,
                    selectedItems: s.selectedFields,
                    columnDefs: [{
                        field: "name",
                        displayName: s.labels.nameLabel
                    },
                        {
                            field: "implementation",
                            displayName: s.labels.implementationLabel
                        }]
                }
        }),
            s.listenerDetailsChanged = function () {
                "" !== s.selectedListeners[0].className ? s.selectedListeners[0].implementation = s.selectedListeners[0].className : "" !== s.selectedListeners[0].expression ? s.selectedListeners[0].implementation = s.selectedListeners[0].expression : "" !== s.selectedListeners[0].delegateExpression ? s.selectedListeners[0].implementation = s.selectedListeners[0].delegateExpression : s.selectedListeners[0].implementation = ""
            },
            s.addNewListener = function () {
                s.executionListeners.push({
                    event: "start",
                    implementation: "",
                    className: "",
                    expression: "",
                    delegateExpression: ""
                })
            },
            s.removeListener = function () {
                if (0 < s.selectedListeners.length) {
                    var e = s.executionListeners.indexOf(s.selectedListeners[0]);
                    s.gridOptions.selectItem(e, !1),
                        s.executionListeners.splice(e, 1),
                        s.selectedListeners.length = 0,
                        e < s.executionListeners.length ? s.gridOptions.selectItem(e + 1, !0) : 0 < s.executionListeners.length && s.gridOptions.selectItem(e - 1, !0)
                }
            },
            s.moveListenerUp = function () {
                if (0 < s.selectedListeners.length) {
                    var e = s.executionListeners.indexOf(s.selectedListeners[0]);
                    if (0 != e) {
                        var t = s.executionListeners[e];
                        s.executionListeners.splice(e, 1),
                            $timeout(function () {
                                s.executionListeners.splice(e + -1, 0, t)
                            }, 100)
                    }
                }
            },
            s.moveListenerDown = function () {
                if (0 < s.selectedListeners.length) {
                    var e = s.executionListeners.indexOf(s.selectedListeners[0]);
                    if (e != s.executionListeners.length - 1) {
                        var t = s.executionListeners[e];
                        s.executionListeners.splice(e, 1),
                            $timeout(function () {
                                s.executionListeners.splice(e + 1, 0, t)
                            }, 100)
                    }
                }
            },
            s.fieldDetailsChanged = function () {
                "" !== s.selectedFields[0].stringValue ? s.selectedFields[0].implementation = s.selectedFields[0].stringValue : "" !== s.selectedFields[0].expression ? s.selectedFields[0].implementation = s.selectedFields[0].expression : "" !== s.selectedFields[0].string ? s.selectedFields[0].implementation = s.selectedFields[0].string : s.selectedFields[0].implementation = ""
            },
            s.addNewField = function () {
                0 < s.selectedListeners.length && (null == s.selectedListeners[0].fields && (s.selectedListeners[0].fields = []), s.selectedListeners[0].fields.push({
                    name: "fieldName",
                    implementation: "",
                    stringValue: "",
                    expression: "",
                    string: ""
                }))
            },
            s.removeField = function () {
                if (0 < s.selectedFields.length) {
                    var e = s.selectedListeners[0].fields.indexOf(s.selectedFields[0]);
                    s.gridFieldOptions.selectItem(e, !1),
                        s.selectedListeners[0].fields.splice(e, 1),
                        s.selectedFields.length = 0,
                        e < s.selectedListeners[0].fields.length ? s.gridFieldOptions.selectItem(e + 1, !0) : 0 < s.selectedListeners[0].fields.length && s.gridFieldOptions.selectItem(e - 1, !0)
                }
            },
            s.moveFieldUp = function () {
                if (0 < s.selectedFields.length) {
                    var e = s.selectedListeners[0].fields.indexOf(s.selectedFields[0]);
                    if (0 != e) {
                        var t = s.selectedListeners[0].fields[e];
                        s.selectedListeners[0].fields.splice(e, 1),
                            $timeout(function () {
                                s.selectedListeners[0].fields.splice(e + -1, 0, t)
                            }, 100)
                    }
                }
            },
            s.moveFieldDown = function () {
                if (0 < s.selectedFields.length) {
                    var e = s.selectedListeners[0].fields.indexOf(s.selectedFields[0]);
                    if (e != s.selectedListeners[0].fields.length - 1) {
                        var t = s.selectedListeners[0].fields[e];
                        s.selectedListeners[0].fields.splice(e, 1),
                            $timeout(function () {
                                s.selectedListeners[0].fields.splice(e + 1, 0, t)
                            }, 100)
                    }
                }
            },
            s.save = function () {
                0 < s.executionListeners.length ? (s.property.value = {}, s.property.value.executionListeners = s.executionListeners) : s.property.value = null,
                    s.updatePropertyInModel(s.property),
                    s.close()
            },
            s.cancel = function () {
                s.$hide(),
                    s.property.mode = "read"
            },
            s.close = function () {
                s.$hide(),
                    s.property.mode = "read"
            }
    }],
    KisBpmEventListenersCtrl = ["$scope", "$modal", "$timeout", "$translate", function (e, t, i, n) {
        t({
            template: "editor-app/configuration/properties/event-listeners-popup.html?version=" + Date.now(),
            scope: e
        })
    }],
    KisBpmEventListenersPopupCtrl = ["$scope", "$q", "$translate", function (s, e, t) {
        void 0 !== s.property.value && null !== s.property.value && void 0 !== s.property.value.eventListeners && null !== s.property.value.eventListeners ? s.property.value.eventListeners.constructor == String ? s.eventListeners = JSON.parse(s.property.value.eventListeners) : s.eventListeners = angular.copy(s.property.value.eventListeners) : s.eventListeners = [],
            s.selectedListeners = [],
            s.translationsRetrieved = !1,
            s.labels = {};
        var i = t("PROPERTY.EXECUTIONLISTENERS.EVENT"),
            n = t("PROPERTY.EXECUTIONLISTENERS.FIELDS.IMPLEMENTATION"),
            o = t("PROPERTY.EXECUTIONLISTENERS.FIELDS.NAME");
        e.all([i, n, o]).then(function (e) {
            s.labels.eventLabel = e[0],
                s.labels.implementationLabel = e[1],
                s.labels.nameLabel = e[2],
                s.translationsRetrieved = !0,
                s.gridOptions = {
                    data: "eventListeners",
                    enableRowReordering: !0,
                    headerRowHeight: 28,
                    multiSelect: !1,
                    keepLastSelected: !1,
                    selectedItems: s.selectedListeners,
                    afterSelectionChange: function (e, t) {
                        if (0 < s.selectedListeners.length) {
                            var i = s.selectedListeners[0].fields;
                            if (null != i) for (var n = 0; n < i.length; n++) {
                                var o = i[n];
                                void 0 !== o.stringValue && "" !== o.stringValue ? o.implementation = o.stringValue : void 0 !== o.expression && "" !== o.expression ? o.implementation = o.expression : void 0 !== o.string && "" !== o.string && (o.implementation = o.string)
                            }
                            s.selectedListeners[0].events && 0 != s.selectedListeners[0].events.length || (s.selectedListeners[0].events = [{
                                event: ""
                            }])
                        }
                    },
                    columnDefs: [{
                        field: "event",
                        displayName: s.labels.eventLabel
                    },
                        {
                            field: "implementation",
                            displayName: s.labels.implementationLabel
                        }]
                }
        }),
            s.addEventValue = function (e) {
                s.selectedListeners[0].events.splice(e + 1, 0, {
                    event: ""
                })
            },
            s.removeEventValue = function (e) {
                s.selectedListeners[0].events.splice(e, 1),
                    s.listenerDetailsChanged()
            },
            s.listenerDetailsChanged = function () {
                var e = s.selectedListeners[0];
                if (e.events) {
                    for (var t = "", i = 0; i < e.events.length; i++) 0 < i && (t += ", "),
                        t += e.events[i].event;
                    s.selectedListeners[0].event = t
                }
                if (e.rethrowEvent) {
                    var n = "";
                    e.rethrowType && 0 < e.rethrowType.length && ("error" === e.rethrowType && "" !== e.errorcode ? n = "Rethrow as error " + e.errorcode : "message" === e.rethrowType && "" !== e.messagename ? n = "Rethrow as message " + e.messagename : "signal" !== e.rethrowType && "globalSignal" !== e.rethrowType || "" === e.signalname || (n = "Rethrow as signal " + e.signalname)),
                        s.selectedListeners[0].implementation = n
                } else "" !== s.selectedListeners[0].className ? s.selectedListeners[0].implementation = s.selectedListeners[0].className : "" !== s.selectedListeners[0].delegateExpression ? s.selectedListeners[0].implementation = s.selectedListeners[0].delegateExpression : s.selectedListeners[0].implementation = ""
            },
            s.addNewListener = function () {
                s.eventListeners.push({
                    event: "",
                    implementation: "",
                    className: "",
                    delegateExpression: "",
                    retrowEvent: !1
                })
            },
            s.removeListener = function () {
                if (0 < s.selectedListeners.length) {
                    var e = s.eventListeners.indexOf(s.selectedListeners[0]);
                    s.gridOptions.selectItem(e, !1),
                        s.eventListeners.splice(e, 1),
                        s.selectedListeners.length = 0,
                        e < s.eventListeners.length ? s.gridOptions.selectItem(e + 1, !0) : 0 < s.eventListeners.length && s.gridOptions.selectItem(e - 1, !0)
                }
            },
            s.moveListenerUp = function () {
                if (0 < s.selectedListeners.length) {
                    var e = s.eventListeners.indexOf(s.selectedListeners[0]);
                    if (0 != e) {
                        var t = s.eventListeners[e];
                        s.eventListeners.splice(e, 1),
                            $timeout(function () {
                                s.eventListeners.splice(e + -1, 0, t)
                            }, 100)
                    }
                }
            },
            s.moveListenerDown = function () {
                if (0 < s.selectedListeners.length) {
                    var e = s.eventListeners.indexOf(s.selectedListeners[0]);
                    if (e != s.eventListeners.length - 1) {
                        var t = s.eventListeners[e];
                        s.eventListeners.splice(e, 1),
                            $timeout(function () {
                                s.eventListeners.splice(e + 1, 0, t)
                            }, 100)
                    }
                }
            },
            s.save = function () {
                0 < s.eventListeners.length ? (s.property.value = {}, s.property.value.eventListeners = s.eventListeners) : s.property.value = null,
                    s.updatePropertyInModel(s.property),
                    s.close()
            },
            s.cancel = function () {
                s.property.mode = "read",
                    s.$hide()
            },
            s.close = function () {
                s.property.mode = "read",
                    s.$hide()
            }
    }],
    KisBpmAssignmentCtrl = ["$scope", "$modal", function (e, t) {
        t({
            template: "editor-app/configuration/properties/assignment-popup.html?version=" + Date.now(),
            scope: e
        })
    }],
    KisBpmAssignmentPopupCtrl = ["$scope", function (t) {
        void 0 !== t.property.value && null !== t.property.value && void 0 !== t.property.value.assignment && null !== t.property.value.assignment ? t.assignment = t.property.value.assignment : t.assignment = {},
        null != t.assignment.candidateUsers && 0 != t.assignment.candidateUsers.length || (t.assignment.candidateUsers = [{
            value: ""
        }]);
        var i = 1;
        t.addCandidateUserValue = function (e) {
            t.assignment.candidateUsers.splice(e + 1, 0, {
                value: "value " + i++
            })
        },
            t.removeCandidateUserValue = function (e) {
                t.assignment.candidateUsers.splice(e, 1)
            },
        null != t.assignment.candidateGroups && 0 != t.assignment.candidateGroups.length || (t.assignment.candidateGroups = [{
            value: ""
        }]);
        var n = 1;
        t.addCandidateGroupValue = function (e) {
            t.assignment.candidateGroups.splice(e + 1, 0, {
                value: "value " + n++
            })
        },
            t.removeCandidateGroupValue = function (e) {
                t.assignment.candidateGroups.splice(e, 1)
            },
            t.save = function () {
                t.property.value = {},
                    e(t),
                    t.property.value.assignment = t.assignment,
                    t.updatePropertyInModel(t.property),
                    t.close()
            },
            t.close = function () {
                e(t),
                    t.property.mode = "read",
                    t.$hide()
            };
        var e = function (e) {
            if (e.assignment.candidateUsers) {
                for (var t = !0, i = [], n = 0; n < e.assignment.candidateUsers.length; n++)"" != e.assignment.candidateUsers[n].value ? t = !1 : i[i.length] = n;
                for (n = 0; n < i.length; n++) e.assignment.candidateUsers.splice(i[n], 1);
                t && (e.assignment.candidateUsers = void 0)
            }
            if (e.assignment.candidateGroups) {
                var o = !0;
                for (i = [], n = 0; n < e.assignment.candidateGroups.length; n++)"" != e.assignment.candidateGroups[n].value ? o = !1 : i[i.length] = n;
                for (n = 0; n < i.length; n++) e.assignment.candidateGroups.splice(i[n], 1);
                o && (e.assignment.candidateGroups = void 0)
            }
        }
    }],
    KisBpmFieldsCtrl = ["$scope", "$modal", "$timeout", "$translate", function (e, t, i, n) {
        t({
            template: "editor-app/configuration/properties/fields-popup.html",
            scope: e
        })
    }],
    KisBpmFieldsPopupCtrl = ["$scope", "$q", "$translate", function (i, e, t) {
        if (void 0 !== i.property.value && null !== i.property.value && void 0 !== i.property.value.fields && null !== i.property.value.fields) {
            i.fields = angular.copy(i.property.value.fields);
            for (var n = 0; n < i.fields.length; n++) {
                var o = i.fields[n];
                void 0 !== o.stringValue && "" !== o.stringValue ? o.implementation = o.stringValue : void 0 !== o.expression && "" !== o.expression ? o.implementation = o.expression : void 0 !== o.string && "" !== o.string && (o.implementation = o.string)
            }
        } else i.fields = [];
        i.selectedFields = [],
            i.translationsRetrieved = !1,
            i.labels = {};
        var s = t("PROPERTY.FIELDS.NAME"),
            r = t("PROPERTY.FIELDS.IMPLEMENTATION");
        e.all([s, r]).then(function (e) {
            i.labels.nameLabel = e[0],
                i.labels.implementationLabel = e[1],
                i.translationsRetrieved = !0,
                i.gridOptions = {
                    data: "fields",
                    enableRowReordering: !0,
                    headerRowHeight: 28,
                    multiSelect: !1,
                    keepLastSelected: !1,
                    selectedItems: i.selectedFields,
                    columnDefs: [{
                        field: "name",
                        displayName: i.labels.nameLabel
                    },
                        {
                            field: "implementation",
                            displayName: i.labels.implementationLabel
                        }]
                }
        }),
            i.fieldDetailsChanged = function () {
                "" != i.selectedFields[0].stringValue ? i.selectedFields[0].implementation = i.selectedFields[0].stringValue : "" != i.selectedFields[0].expression ? i.selectedFields[0].implementation = i.selectedFields[0].expression : "" != i.selectedFields[0].string ? i.selectedFields[0].implementation = i.selectedFields[0].string : i.selectedFields[0].implementation = ""
            },
            i.addNewField = function () {
                i.fields.push({
                    name: "fieldName",
                    implementation: "",
                    stringValue: "",
                    expression: "",
                    string: ""
                })
            },
            i.removeField = function () {
                if (0 < i.selectedFields.length) {
                    var e = i.fields.indexOf(i.selectedFields[0]);
                    i.gridOptions.selectItem(e, !1),
                        i.fields.splice(e, 1),
                        i.selectedFields.length = 0,
                        e < i.fields.length ? i.gridOptions.selectItem(e + 1, !0) : 0 < i.fields.length && i.gridOptions.selectItem(e - 1, !0)
                }
            },
            i.moveFieldUp = function () {
                if (0 < i.selectedFields.length) {
                    var e = i.fields.indexOf(i.selectedFields[0]);
                    if (0 != e) {
                        var t = i.fields[e];
                        i.fields.splice(e, 1),
                            $timeout(function () {
                                i.fields.splice(e + -1, 0, t)
                            }, 100)
                    }
                }
            },
            i.moveFieldDown = function () {
                if (0 < i.selectedFields.length) {
                    var e = i.fields.indexOf(i.selectedFields[0]);
                    if (e != i.fields.length - 1) {
                        var t = i.fields[e];
                        i.fields.splice(e, 1),
                            $timeout(function () {
                                i.fields.splice(e + 1, 0, t)
                            }, 100)
                    }
                }
            },
            i.save = function () {
                0 < i.fields.length ? (i.property.value = {}, i.property.value.fields = i.fields) : i.property.value = null,
                    i.updatePropertyInModel(i.property),
                    i.close()
            },
            i.cancel = function () {
                i.close()
            },
            i.close = function () {
                i.property.mode = "read",
                    i.$hide()
            }
    }],
    KisBpmFormPropertiesCtrl = ["$scope", "$modal", "$timeout", "$translate", function (e, t, i, n) {
        t({
            template: "editor-app/configuration/properties/form-properties-popup.html?version=" + Date.now(),
            scope: e
        })
    }],
    KisBpmFormPropertiesPopupCtrl = ["$scope", "$q", "$translate", "$timeout", function (i, e, t, n) {
        if (void 0 !== i.property.value && null !== i.property.value && void 0 !== i.property.value.formProperties && null !== i.property.value.formProperties) {
            i.formProperties = angular.copy(i.property.value.formProperties);
            for (var o = 0; o < i.formProperties.length; o++) {
                var s = i.formProperties[o];
                if (s.enumValues && 0 < s.enumValues.length) for (var r = 0; r < s.enumValues.length; r++) {
                    var a = s.enumValues[r];
                    a.id || a.name || !a.value || (a.id = a.value, a.name = a.value)
                }
            }
        } else i.formProperties = [];
        i.selectedProperties = [],
            i.selectedEnumValues = [],
            i.translationsRetrieved = !1,
            i.labels = {};
        var l = t("PROPERTY.FORMPROPERTIES.ID"),
            p = t("PROPERTY.FORMPROPERTIES.NAME"),
            d = t("PROPERTY.FORMPROPERTIES.TYPE");
        e.all([l, p, d]).then(function (e) {
            i.labels.idLabel = e[0],
                i.labels.nameLabel = e[1],
                i.labels.typeLabel = e[2],
                i.translationsRetrieved = !0,
                i.gridOptions = {
                    data: "formProperties",
                    enableRowReordering: !0,
                    headerRowHeight: 28,
                    multiSelect: !1,
                    keepLastSelected: !1,
                    selectedItems: i.selectedProperties,
                    columnDefs: [{
                        field: "id",
                        displayName: i.labels.idLabel
                    },
                        {
                            field: "name",
                            displayName: i.labels.nameLabel
                        },
                        {
                            field: "type",
                            displayName: i.labels.typeLabel
                        }]
                },
                i.enumGridOptions = {
                    data: "selectedProperties[0].enumValues",
                    enableRowReordering: !0,
                    headerRowHeight: 28,
                    multiSelect: !1,
                    keepLastSelected: !1,
                    selectedItems: i.selectedEnumValues,
                    columnDefs: [{
                        field: "id",
                        displayName: i.labels.idLabel
                    },
                        {
                            field: "name",
                            displayName: i.labels.nameLabel
                        }]
                }
        }),
            i.propertyTypeChanged = function () {
                "date" === i.selectedProperties[0].type ? i.selectedProperties[0].datePattern = "MM-dd-yyyy hh:mm" : delete i.selectedProperties[0].datePattern,
                    "enum" === i.selectedProperties[0].type ? i.selectedProperties[0].enumValues = [{
                        id: "value1",
                        name: "Value 1"
                    },
                        {
                            id: "value2",
                            name: "Value 2"
                        }] : delete i.selectedProperties[0].enumValues
            };
        var c = 1;
        i.addNewProperty = function () {
            i.formProperties.push({
                id: "new_property_" + c++,
                name: "",
                type: "string",
                readable: !0,
                writable: !0
            }),
                n(function () {
                    i.gridOptions.selectItem(i.formProperties.length - 1, !0)
                })
        },
            i.removeProperty = function () {
                if (0 < i.selectedProperties.length) {
                    var e = i.formProperties.indexOf(i.selectedProperties[0]);
                    i.gridOptions.selectItem(e, !1),
                        i.formProperties.splice(e, 1),
                        i.selectedProperties.length = 0,
                        e < i.formProperties.length ? i.gridOptions.selectItem(e + 1, !0) : 0 < i.formProperties.length && i.gridOptions.selectItem(e - 1, !0)
                }
            },
            i.movePropertyUp = function () {
                if (0 < i.selectedProperties.length) {
                    var e = i.formProperties.indexOf(i.selectedProperties[0]);
                    if (0 != e) {
                        var t = i.formProperties[e];
                        i.formProperties.splice(e, 1),
                            n(function () {
                                i.formProperties.splice(e + -1, 0, t)
                            }, 100)
                    }
                }
            },
            i.movePropertyDown = function () {
                if (0 < i.selectedProperties.length) {
                    var e = i.formProperties.indexOf(i.selectedProperties[0]);
                    if (e != i.formProperties.length - 1) {
                        var t = i.formProperties[e];
                        i.formProperties.splice(e, 1),
                            n(function () {
                                i.formProperties.splice(e + 1, 0, t)
                            }, 100)
                    }
                }
            },
            i.addNewEnumValue = function () {
                0 < i.selectedProperties.length && i.selectedProperties[0].enumValues.push({
                    id: "",
                    name: ""
                }),
                    n(function () {
                        i.enumGridOptions.selectItem(i.selectedProperties[0].enumValues.length - 1, !0)
                    })
            },
            i.removeEnumValue = function () {
                if (0 < i.selectedProperties.length && 0 < i.selectedEnumValues.length) {
                    var e = i.selectedProperties[0].enumValues.indexOf(i.selectedEnumValues[0]);
                    i.enumGridOptions.selectItem(e, !1),
                        i.selectedProperties[0].enumValues.splice(e, 1),
                        i.selectedEnumValues.length = 0,
                        e < i.selectedProperties[0].enumValues.length ? n(function () {
                            i.enumGridOptions.selectItem(e + 1, !0)
                        }) : 0 < i.selectedProperties[0].enumValues.length && n(function () {
                            i.enumGridOptions.selectItem(e - 1, !0)
                        })
                }
            },
            i.moveEnumValueUp = function () {
                if (0 < i.selectedProperties.length && 0 < i.selectedEnumValues.length) {
                    var e = i.selectedProperties[0].enumValues.indexOf(i.selectedEnumValues[0]);
                    if (0 != e) {
                        var t = i.selectedProperties[0].enumValues[e];
                        i.selectedProperties[0].enumValues.splice(e, 1),
                            n(function () {
                                i.selectedProperties[0].enumValues.splice(e + -1, 0, t)
                            })
                    }
                }
            },
            i.moveEnumValueDown = function () {
                if (0 < i.selectedProperties.length && 0 < i.selectedEnumValues.length) {
                    var e = i.selectedProperties[0].enumValues.indexOf(i.selectedEnumValues[0]);
                    if (e != i.selectedProperties[0].enumValues.length - 1) {
                        var t = i.selectedProperties[0].enumValues[e];
                        i.selectedProperties[0].enumValues.splice(e, 1),
                            n(function () {
                                i.selectedProperties[0].enumValues.splice(e + 1, 0, t)
                            })
                    }
                }
            },
            i.save = function () {
                0 < i.formProperties.length ? (i.property.value = {}, i.property.value.formProperties = i.formProperties) : i.property.value = null,
                    i.updatePropertyInModel(i.property),
                    i.close()
            },
            i.cancel = function () {
                i.$hide(),
                    i.property.mode = "read"
            },
            i.close = function () {
                i.$hide(),
                    i.property.mode = "read"
            }
    }],
    KisBpmInParametersCtrl = ["$scope", "$modal", "$timeout", "$translate", function (e, t, i, n) {
        t({
            template: "editor-app/configuration/properties/in-parameters-popup.html?version=" + Date.now(),
            scope: e
        })
    }],
    KisBpmInParametersPopupCtrl = ["$scope", "$q", "$translate", function (i, e, t) {
        void 0 !== i.property.value && null !== i.property.value && void 0 !== i.property.value.inParameters && null !== i.property.value.inParameters ? i.parameters = angular.copy(i.property.value.inParameters) : i.parameters = [],
            i.selectedParameters = [],
            i.translationsRetrieved = !1,
            i.labels = {};
        var n = t("PROPERTY.PARAMETER.SOURCE"),
            o = t("PROPERTY.PARAMETER.SOURCEEXPRESSION"),
            s = t("PROPERTY.PARAMETER.TARGET");
        e.all([n, o, s]).then(function (e) {
            i.labels.sourceLabel = e[0],
                i.labels.sourceExpressionLabel = e[1],
                i.labels.targetLabel = e[2],
                i.translationsRetrieved = !0,
                i.gridOptions = {
                    data: "parameters",
                    enableRowReordering: !0,
                    headerRowHeight: 28,
                    multiSelect: !1,
                    keepLastSelected: !1,
                    selectedItems: i.selectedParameters,
                    columnDefs: [{
                        field: "source",
                        displayName: i.labels.sourceLabel
                    },
                        {
                            field: "sourceExpression",
                            displayName: i.labels.sourceExpressionLabel
                        },
                        {
                            field: "target",
                            displayName: i.labels.targetLabel
                        }]
                }
        }),
            i.addNewParameter = function () {
                i.parameters.push({
                    source: "",
                    sourceExpression: "",
                    target: ""
                })
            },
            i.removeParameter = function () {
                if (0 < i.selectedParameters.length) {
                    var e = i.parameters.indexOf(i.selectedParameters[0]);
                    i.gridOptions.selectItem(e, !1),
                        i.parameters.splice(e, 1),
                        i.selectedParameters.length = 0,
                        e < i.parameters.length ? i.gridOptions.selectItem(e + 1, !0) : 0 < i.parameters.length && i.gridOptions.selectItem(e - 1, !0)
                }
            },
            i.moveParameterUp = function () {
                if (0 < i.selectedParameters.length) {
                    var e = i.parameters.indexOf(i.selectedParameters[0]);
                    if (0 != e) {
                        var t = i.parameters[e];
                        i.parameters.splice(e, 1),
                            $timeout(function () {
                                i.parameters.splice(e + -1, 0, t)
                            }, 100)
                    }
                }
            },
            i.moveParameterDown = function () {
                if (0 < i.selectedParameters.length) {
                    var e = i.parameters.indexOf(i.selectedParameters[0]);
                    if (e != i.parameters.length - 1) {
                        var t = i.parameters[e];
                        i.parameters.splice(e, 1),
                            $timeout(function () {
                                i.parameters.splice(e + 1, 0, t)
                            }, 100)
                    }
                }
            },
            i.save = function () {
                0 < i.parameters.length ? (i.property.value = {}, i.property.value.inParameters = i.parameters) : i.property.value = null,
                    i.updatePropertyInModel(i.property),
                    i.close()
            },
            i.cancel = function () {
                i.close()
            },
            i.close = function () {
                i.property.mode = "read",
                    i.$hide()
            }
    }],
    KisBpmMultiInstanceCtrl = ["$scope", function (e) {
        null == e.property.value && null == e.property.value && (e.property.value = "None"),
            e.multiInstanceChanged = function () {
                e.updatePropertyInModel(e.property)
            }
    }],
    KisBpmOutParametersCtrl = ["$scope", "$modal", "$timeout", "$translate", function (e, t, i, n) {
        t({
            template: "editor-app/configuration/properties/out-parameters-popup.html?version=" + Date.now(),
            scope: e
        })
    }],
    KisBpmOutParametersPopupCtrl = ["$scope", "$q", "$translate", function (i, e, t) {
        void 0 !== i.property.value && null !== i.property.value && void 0 !== i.property.value.outParameters && null !== i.property.value.outParameters ? i.parameters = angular.copy(i.property.value.outParameters) : i.parameters = [],
            i.selectedParameters = [],
            i.translationsRetrieved = !1,
            i.labels = {};
        var n = t("PROPERTY.PARAMETER.SOURCE"),
            o = t("PROPERTY.PARAMETER.SOURCEEXPRESSION"),
            s = t("PROPERTY.PARAMETER.TARGET");
        e.all([n, o, s]).then(function (e) {
            i.labels.sourceLabel = e[0],
                i.labels.sourceExpressionLabel = e[1],
                i.labels.targetLabel = e[2],
                i.translationsRetrieved = !0,
                i.gridOptions = {
                    data: "parameters",
                    enableRowReordering: !0,
                    headerRowHeight: 28,
                    multiSelect: !1,
                    keepLastSelected: !1,
                    selectedItems: i.selectedParameters,
                    columnDefs: [{
                        field: "source",
                        displayName: i.labels.sourceLabel
                    },
                        {
                            field: "sourceExpression",
                            displayName: i.labels.sourceExpressionLabel
                        },
                        {
                            field: "target",
                            displayName: i.labels.targetLabel
                        }]
                }
        }),
            i.addNewParameter = function () {
                i.parameters.push({
                    source: "",
                    sourceExpression: "",
                    target: ""
                })
            },
            i.removeParameter = function () {
                if (0 < i.selectedParameters.length) {
                    var e = i.parameters.indexOf(i.selectedParameters[0]);
                    i.gridOptions.selectItem(e, !1),
                        i.parameters.splice(e, 1),
                        i.selectedParameters.length = 0,
                        e < i.parameters.length ? i.gridOptions.selectItem(e + 1, !0) : 0 < i.parameters.length && i.gridOptions.selectItem(e - 1, !0)
                }
            },
            i.moveParameterUp = function () {
                if (0 < i.selectedParameters.length) {
                    var e = i.parameters.indexOf(i.selectedParameters[0]);
                    if (0 != e) {
                        var t = i.parameters[e];
                        i.parameters.splice(e, 1),
                            $timeout(function () {
                                i.parameters.splice(e + -1, 0, t)
                            }, 100)
                    }
                }
            },
            i.moveParameterDown = function () {
                if (0 < i.selectedParameters.length) {
                    var e = i.parameters.indexOf(i.selectedParameters[0]);
                    if (e != i.parameters.length - 1) {
                        var t = i.parameters[e];
                        i.parameters.splice(e, 1),
                            $timeout(function () {
                                i.parameters.splice(e + 1, 0, t)
                            }, 100)
                    }
                }
            },
            i.save = function () {
                0 < i.parameters.length ? (i.property.value = {}, i.property.value.outParameters = i.parameters) : i.property.value = null,
                    i.updatePropertyInModel(i.property),
                    i.close()
            },
            i.cancel = function () {
                i.close()
            },
            i.close = function () {
                i.property.mode = "read",
                    i.$hide()
            }
    }],
    KisBpmTaskListenersCtrl = ["$scope", "$modal", "$timeout", "$translate", function (e, t, i, n) {
        t({
            template: "editor-app/configuration/properties/task-listeners-popup.html?version=" + Date.now(),
            scope: e
        })
    }],
    KisBpmTaskListenersPopupCtrl = ["$scope", "$q", "$translate", function (s, e, t) {
        if (void 0 !== s.property.value && null !== s.property.value && void 0 !== s.property.value.taskListeners && null !== s.property.value.taskListeners) {
            s.property.value.taskListeners.constructor == String ? s.taskListeners = JSON.parse(s.property.value.taskListeners) : s.taskListeners = angular.copy(s.property.value.taskListeners);
            for (var i = 0; i < s.taskListeners.length; i++) {
                var n = s.taskListeners[i];
                void 0 !== n.className && "" !== n.className ? n.implementation = n.className : void 0 !== n.expression && "" !== n.expression ? n.implementation = n.expression : void 0 !== n.delegateExpression && "" !== n.delegateExpression && (n.implementation = n.delegateExpression)
            }
        } else s.taskListeners = [];
        s.selectedListeners = [],
            s.selectedFields = [],
            s.translationsRetrieved = !1,
            s.labels = {};
        var o = t("PROPERTY.TASKLISTENERS.EVENT"),
            r = t("PROPERTY.TASKLISTENERS.FIELDS.IMPLEMENTATION"),
            a = t("PROPERTY.TASKLISTENERS.FIELDS.NAME");
        e.all([o, r, a]).then(function (e) {
            s.labels.eventLabel = e[0],
                s.labels.implementationLabel = e[1],
                s.labels.nameLabel = e[2],
                s.translationsRetrieved = !0,
                s.gridOptions = {
                    data: "taskListeners",
                    enableRowReordering: !0,
                    headerRowHeight: 28,
                    multiSelect: !1,
                    keepLastSelected: !1,
                    selectedItems: s.selectedListeners,
                    afterSelectionChange: function (e, t) {
                        if ((s.selectedFields.length = 0) < s.selectedListeners.length) {
                            var i = s.selectedListeners[0].fields;
                            if (null != i) for (var n = 0; n < i.length; n++) {
                                var o = i[n];
                                void 0 !== o.stringValue && "" !== o.stringValue ? o.implementation = o.stringValue : void 0 !== o.expression && "" !== o.expression ? o.implementation = o.expression : void 0 !== o.string && "" !== o.string && (o.implementation = o.string)
                            }
                        }
                    },
                    columnDefs: [{
                        field: "event",
                        displayName: s.labels.eventLabel
                    },
                        {
                            field: "implementation",
                            displayName: s.labels.implementationLabel
                        }]
                },
                s.gridFieldOptions = {
                    data: "selectedListeners[0].fields",
                    enableRowReordering: !0,
                    headerRowHeight: 28,
                    multiSelect: !1,
                    keepLastSelected: !1,
                    selectedItems: s.selectedFields,
                    columnDefs: [{
                        field: "name",
                        displayName: s.labels.name
                    },
                        {
                            field: "implementation",
                            displayName: s.labels.implementationLabel
                        }]
                }
        }),
            s.listenerDetailsChanged = function () {
                "" !== s.selectedListeners[0].className ? s.selectedListeners[0].implementation = s.selectedListeners[0].className : "" !== s.selectedListeners[0].expression ? s.selectedListeners[0].implementation = s.selectedListeners[0].expression : "" !== s.selectedListeners[0].delegateExpression ? s.selectedListeners[0].implementation = s.selectedListeners[0].delegateExpression : s.selectedListeners[0].implementation = ""
            },
            s.addNewListener = function () {
                s.taskListeners.push({
                    event: "create",
                    implementation: "",
                    className: "",
                    expression: "",
                    delegateExpression: ""
                })
            },
            s.removeListener = function () {
                if (0 < s.selectedListeners.length) {
                    var e = s.taskListeners.indexOf(s.selectedListeners[0]);
                    s.gridOptions.selectItem(e, !1),
                        s.taskListeners.splice(e, 1),
                        s.selectedListeners.length = 0,
                        e < s.taskListeners.length ? s.gridOptions.selectItem(e + 1, !0) : 0 < s.taskListeners.length && s.gridOptions.selectItem(e - 1, !0)
                }
            },
            s.moveListenerUp = function () {
                if (0 < s.selectedListeners.length) {
                    var e = s.taskListeners.indexOf(s.selectedListeners[0]);
                    if (0 != e) {
                        var t = s.taskListeners[e];
                        s.taskListeners.splice(e, 1),
                            $timeout(function () {
                                s.taskListeners.splice(e + -1, 0, t)
                            }, 100)
                    }
                }
            },
            s.moveListenerDown = function () {
                if (0 < s.selectedListeners.length) {
                    var e = s.taskListeners.indexOf(s.selectedListeners[0]);
                    if (e != s.taskListeners.length - 1) {
                        var t = s.taskListeners[e];
                        s.taskListeners.splice(e, 1),
                            $timeout(function () {
                                s.taskListeners.splice(e + 1, 0, t)
                            }, 100)
                    }
                }
            },
            s.fieldDetailsChanged = function () {
                "" != s.selectedFields[0].stringValue ? s.selectedFields[0].implementation = s.selectedFields[0].stringValue : "" != s.selectedFields[0].expression ? s.selectedFields[0].implementation = s.selectedFields[0].expression : "" != s.selectedFields[0].string ? s.selectedFields[0].implementation = s.selectedFields[0].string : s.selectedFields[0].implementation = ""
            },
            s.addNewField = function () {
                0 < s.selectedListeners.length && (null == s.selectedListeners[0].fields && (s.selectedListeners[0].fields = []), s.selectedListeners[0].fields.push({
                    name: "fieldName",
                    implementation: "",
                    stringValue: "",
                    expression: "",
                    string: ""
                }))
            },
            s.removeField = function () {
                if (0 < s.selectedFields.length) {
                    var e = s.selectedListeners[0].fields.indexOf(s.selectedFields[0]);
                    s.gridFieldOptions.selectItem(e, !1),
                        s.selectedListeners[0].fields.splice(e, 1),
                        s.selectedFields.length = 0,
                        e < s.selectedListeners[0].fields.length ? s.gridFieldOptions.selectItem(e + 1, !0) : 0 < s.selectedListeners[0].fields.length && s.gridFieldOptions.selectItem(e - 1, !0)
                }
            },
            s.moveFieldUp = function () {
                if (0 < s.selectedFields.length) {
                    var e = s.selectedListeners[0].fields.indexOf(s.selectedFields[0]);
                    if (0 != e) {
                        var t = s.selectedListeners[0].fields[e];
                        s.selectedListeners[0].fields.splice(e, 1),
                            $timeout(function () {
                                s.selectedListeners[0].fields.splice(e + -1, 0, t)
                            }, 100)
                    }
                }
            },
            s.moveFieldDown = function () {
                if (0 < s.selectedFields.length) {
                    var e = s.selectedListeners[0].fields.indexOf(s.selectedFields[0]);
                    if (e != s.selectedListeners[0].fields.length - 1) {
                        var t = s.selectedListeners[0].fields[e];
                        s.selectedListeners[0].fields.splice(e, 1),
                            $timeout(function () {
                                s.selectedListeners[0].fields.splice(e + 1, 0, t)
                            }, 100)
                    }
                }
            },
            s.save = function () {
                0 < s.taskListeners.length ? (s.property.value = {}, s.property.value.taskListeners = s.taskListeners) : s.property.value = null,
                    s.updatePropertyInModel(s.property),
                    s.close()
            },
            s.cancel = function () {
                s.close()
            },
            s.close = function () {
                s.property.mode = "read",
                    s.$hide()
            }
    }],
    KisBpmSequenceFlowOrderCtrl = ["$scope", "$modal", "$timeout", "$translate", function (e, t, i, n) {
        t({
            template: "editor-app/configuration/properties/sequenceflow-order-popup.html?version=" + Date.now(),
            scope: e
        })
    }],
    KisBpmSequenceFlowOrderPopupCtrl = ["$scope", "$translate", function (i, e) {
        var t = [],
            n = i.selectedShape;
        if (n) {
            for (var o = n.getOutgoingShapes(), s = 0; s < o.length; s++) if ("Sequence flow" === o[s].getStencil().title()) {
                var r = o[s].getTarget();
                t.push({
                    id: o[s].resourceId,
                    targetTitle: r.properties["oryx-name"],
                    targetType: r.getStencil().title()
                })
            }
        } else console.log("Programmatic error: no selected shape found");
        var a = [];
        if (i.property.value && i.property.value.sequenceFlowOrder) {
            for (var l = i.property.value.sequenceFlowOrder, p = 0; p < l.length; p++) for (var d = 0; d < t.length; d++) if (t[d].id === l[p]) {
                a.push(t[d]),
                    t.splice(d, 1);
                break
            }
            a = a.concat(t)
        } else a = t;
        i.outgoingSequenceFlow = a,
            i.moveUp = function (e) {
                var t = i.outgoingSequenceFlow[e];
                i.outgoingSequenceFlow[e] = i.outgoingSequenceFlow[e - 1],
                    i.outgoingSequenceFlow[e - 1] = t
            },
            i.moveDown = function (e) {
                var t = i.outgoingSequenceFlow[e];
                i.outgoingSequenceFlow[e] = i.outgoingSequenceFlow[e + 1],
                    i.outgoingSequenceFlow[e + 1] = t
            },
            i.save = function () {
                if (0 < i.outgoingSequenceFlow.length) {
                    i.property.value = {},
                        i.property.value.sequenceFlowOrder = [];
                    for (var e = 0; e < i.outgoingSequenceFlow.length; e++) i.property.value.sequenceFlowOrder.push(i.outgoingSequenceFlow[e].id)
                } else i.property.value = null;
                i.updatePropertyInModel(i.property),
                    i.close()
            },
            i.cancel = function () {
                i.close()
            },
            i.close = function () {
                i.property.mode = "read",
                    i.$hide()
            }
    }],
    KisBpmConditionExpressionCtrl = ["$scope", "$modal", function (e, t) {
        t({
            template: "editor-app/configuration/properties/condition-expression-popup.html?version=" + Date.now(),
            scope: e
        })
    }],
    KisBpmConditionExpressionPopupCtrl = ["$scope", "$translate", "$http", function (e, t, i) {
        void 0 !== e.property.value && null !== e.property.value ? e.conditionExpression = {
            value: e.property.value
        } : e.conditionExpression = {
            value: ""
        },
            e.save = function () {
                e.property.value = e.conditionExpression.value,
                    e.updatePropertyInModel(e.property),
                    e.close()
            },
            e.close = function () {
                e.property.mode = "read",
                    e.$hide()
            }
    }];
angular.module("activitiModeler").controller("ActivitiSignalDefinitionsCtrl", ["$scope", "$modal", function (e, t) {
    t({
        template: "editor-app/configuration/properties/signal-definitions-popup.html?version=" + Date.now(),
        scope: e
    })
}]),
    angular.module("activitiModeler").controller("ActivitiSignalDefinitionsPopupCtrl", ["$scope", "$q", "$translate", "$timeout", function (t, e, i, n) {
        void 0 !== t.property.value && null !== t.property.value && 0 < t.property.value.length ? t.property.value.constructor == String ? t.signalDefinitions = JSON.parse(t.property.value) : t.signalDefinitions = angular.copy(t.property.value) : t.signalDefinitions = [],
            t.selectedSignals = [],
            t.translationsRetrieved = !1,
            t.labels = {};
        var o = i("PROPERTY.SIGNALDEFINITIONS.ID"),
            s = i("PROPERTY.SIGNALDEFINITIONS.NAME"),
            r = i("PROPERTY.SIGNALDEFINITIONS.SCOPE");
        e.all([o, s, r]).then(function (e) {
            t.labels.idLabel = e[0],
                t.labels.nameLabel = e[1],
                t.labels.scopeLabel = e[2],
                t.translationsRetrieved = !0,
                t.gridOptions = {
                    data: "signalDefinitions",
                    headerRowHeight: 28,
                    enableRowSelection: !0,
                    enableRowHeaderSelection: !1,
                    multiSelect: !1,
                    keepLastSelected: !1,
                    selectedItems: t.selectedSignals,
                    columnDefs: [{
                        field: "id",
                        displayName: t.labels.idLabel
                    },
                        {
                            field: "name",
                            displayName: t.labels.nameLabel
                        },
                        {
                            field: "scope",
                            displayName: t.labels.scopeLabel
                        }]
                }
        }),
            t.addNewSignalDefinition = function () {
                t.signalDefinitions.push({
                    id: "",
                    name: "",
                    scope: "global"
                }),
                    n(function () {
                        t.gridOptions.selectItem(t.signalDefinitions.length - 1, !0)
                    })
            },
            t.removeSignalDefinition = function () {
                if (t.selectedSignals && 0 < t.selectedSignals.length) {
                    var e = t.signalDefinitions.indexOf(t.selectedSignals[0]);
                    t.gridOptions.selectItem(e, !1),
                        t.signalDefinitions.splice(e, 1),
                        t.selectedSignals.length = 0,
                        e < t.signalDefinitions.length ? t.gridOptions.selectItem(e + 1, !0) : 0 < t.signalDefinitions.length && t.gridOptions.selectItem(e - 1, !0)
                }
            },
            t.save = function () {
                0 < t.signalDefinitions.length ? t.property.value = t.signalDefinitions : t.property.value = null,
                    t.updatePropertyInModel(t.property),
                    t.close()
            },
            t.cancel = function () {
                t.property.mode = "read",
                    t.$hide()
            },
            t.close = function () {
                t.property.mode = "read",
                    t.$hide()
            }
    }]),
    angular.module("activitiModeler").controller("ActivitiSignalRefCtrl", ["$scope", function (e) {
        for (var t = void 0, i = e.selectedShape; null != i && void 0 === t;) i.properties && i.properties["oryx-signaldefinitions"] ? t = i.properties["oryx-signaldefinitions"] : i = i.parent;
        try {
            "string" == typeof(t = JSON.parse(t)) && (t = JSON.parse(t))
        } catch (e) {}
        e.signalDefinitions = t,
            e.signalChanged = function () {
                e.updatePropertyInModel(e.property)
            }
    }]),
    angular.module("activitiModeler").controller("ActivitiMessageDefinitionsCtrl", ["$scope", "$modal", function (e, t) {
        t({
            template: "editor-app/configuration/properties/message-definitions-popup.html?version=" + Date.now(),
            scope: e
        })
    }]),
    angular.module("activitiModeler").controller("ActivitiMessageDefinitionsPopupCtrl", ["$scope", "$q", "$translate", "$timeout", function (t, e, i, n) {
        void 0 !== t.property.value && null !== t.property.value && 0 < t.property.value.length ? t.property.value.constructor == String ? t.messageDefinitions = JSON.parse(t.property.value) : t.messageDefinitions = angular.copy(t.property.value) : t.messageDefinitions = [],
            t.selectedMessages = [],
            t.translationsRetrieved = !1,
            t.labels = {};
        var o = i("PROPERTY.MESSAGEDEFINITIONS.ID"),
            s = i("PROPERTY.MESSAGEDEFINITIONS.NAME");
        e.all([o, s]).then(function (e) {
            t.labels.idLabel = e[0],
                t.labels.nameLabel = e[1],
                t.translationsRetrieved = !0,
                t.gridOptions = {
                    data: "messageDefinitions",
                    headerRowHeight: 28,
                    enableRowSelection: !0,
                    enableRowHeaderSelection: !1,
                    multiSelect: !1,
                    keepLastSelected: !1,
                    selectedItems: t.selectedMessages,
                    columnDefs: [{
                        field: "id",
                        displayName: t.labels.idLabel
                    },
                        {
                            field: "name",
                            displayName: t.labels.nameLabel
                        }]
                }
        }),
            t.addNewMessageDefinition = function () {
                t.messageDefinitions.push({
                    id: "",
                    name: ""
                }),
                    n(function () {
                        t.gridOptions.selectItem(t.messageDefinitions.length - 1, !0)
                    })
            },
            t.removeMessageDefinition = function () {
                if (t.selectedMessages && 0 < t.selectedMessages.length) {
                    var e = t.messageDefinitions.indexOf(t.selectedMessages[0]);
                    t.gridOptions.selectItem(e, !1),
                        t.messageDefinitions.splice(e, 1),
                        t.selectedMessages.length = 0,
                        e < t.messageDefinitions.length ? t.gridOptions.selectItem(e + 1, !0) : 0 < t.messageDefinitions.length && t.gridOptions.selectItem(e - 1, !0)
                }
            },
            t.save = function () {
                0 < t.messageDefinitions.length ? t.property.value = t.messageDefinitions : t.property.value = null,
                    t.updatePropertyInModel(t.property),
                    t.close()
            },
            t.cancel = function () {
                t.property.mode = "read",
                    t.$hide()
            },
            t.close = function () {
                t.property.mode = "read",
                    t.$hide()
            }
    }]),
    angular.module("activitiModeler").controller("ActivitiMessageRefCtrl", ["$scope", function (e) {
        for (var t = void 0, i = e.selectedShape; null != i && void 0 === t;) i.properties && i.properties["oryx-messagedefinitions"] ? t = i.properties["oryx-messagedefinitions"] : i = i.parent;
        try {
            "string" == typeof(t = JSON.parse(t)) && (t = JSON.parse(t))
        } catch (e) {}
        e.messageDefinitions = t,
            e.messageChanged = function () {
                e.updatePropertyInModel(e.property)
            }
    }]);
var KISBPM = KISBPM || {};
KISBPM.TOOLBAR_CONFIG = {
    items: [{
        type: "button",
        title: "保存",
        cssClass: "editor-icon editor-icon-save",
        action: "KISBPM.TOOLBAR.ACTIONS.saveModel"
    },
        {
            type: "separator",
            title: "",
            cssClass: "toolbar-separator"
        },
        {
            type: "button",
            title: "剪切",
            cssClass: "editor-icon editor-icon-cut",
            action: "KISBPM.TOOLBAR.ACTIONS.cut",
            enabled: !1,
            enabledAction: "element"
        },
        {
            type: "button",
            title: "TOOLBAR.ACTION.COPY",
            cssClass: "editor-icon editor-icon-copy",
            action: "KISBPM.TOOLBAR.ACTIONS.copy",
            enabled: !1,
            enabledAction: "element"
        },
        {
            type: "button",
            title: "TOOLBAR.ACTION.PASTE",
            cssClass: "editor-icon editor-icon-paste",
            action: "KISBPM.TOOLBAR.ACTIONS.paste",
            enabled: !1
        },
        {
            type: "button",
            title: "TOOLBAR.ACTION.DELETE",
            cssClass: "editor-icon editor-icon-delete",
            action: "KISBPM.TOOLBAR.ACTIONS.deleteItem",
            enabled: !1,
            enabledAction: "element"
        },
        {
            type: "separator",
            title: "TOOLBAR.ACTION.SAVE",
            cssClass: "toolbar-separator"
        },
        {
            type: "button",
            title: "TOOLBAR.ACTION.REDO",
            cssClass: "editor-icon editor-icon-redo",
            action: "KISBPM.TOOLBAR.ACTIONS.redo",
            enabled: !1
        },
        {
            type: "button",
            title: "TOOLBAR.ACTION.UNDO",
            cssClass: "editor-icon editor-icon-undo",
            action: "KISBPM.TOOLBAR.ACTIONS.undo",
            enabled: !1
        },
        {
            type: "separator",
            title: "TOOLBAR.ACTION.SAVE",
            cssClass: "toolbar-separator"
        },
        {
            type: "button",
            title: "TOOLBAR.ACTION.ALIGNVERTICAL",
            cssClass: "editor-icon editor-icon-align-vertical",
            action: "KISBPM.TOOLBAR.ACTIONS.alignVertical",
            enabled: !1,
            enabledAction: "element",
            minSelectionCount: 2
        },
        {
            type: "button",
            title: "TOOLBAR.ACTION.ALIGNHORIZONTAL",
            cssClass: "editor-icon editor-icon-align-horizontal",
            action: "KISBPM.TOOLBAR.ACTIONS.alignHorizontal",
            enabledAction: "element",
            enabled: !1,
            minSelectionCount: 2
        },
        {
            type: "button",
            title: "TOOLBAR.ACTION.SAMESIZE",
            cssClass: "editor-icon editor-icon-same-size",
            action: "KISBPM.TOOLBAR.ACTIONS.sameSize",
            enabledAction: "element",
            enabled: !1,
            minSelectionCount: 2
        },
        {
            type: "separator",
            title: "TOOLBAR.ACTION.SAVE",
            cssClass: "toolbar-separator"
        },
        {
            type: "button",
            title: "TOOLBAR.ACTION.ZOOMIN",
            cssClass: "editor-icon editor-icon-zoom-in",
            action: "KISBPM.TOOLBAR.ACTIONS.zoomIn"
        },
        {
            type: "button",
            title: "TOOLBAR.ACTION.ZOOMOUT",
            cssClass: "editor-icon editor-icon-zoom-out",
            action: "KISBPM.TOOLBAR.ACTIONS.zoomOut"
        },
        {
            type: "button",
            title: "TOOLBAR.ACTION.ZOOMACTUAL",
            cssClass: "editor-icon editor-icon-zoom-actual",
            action: "KISBPM.TOOLBAR.ACTIONS.zoomActual"
        },
        {
            type: "button",
            title: "TOOLBAR.ACTION.ZOOMFIT",
            cssClass: "editor-icon editor-icon-zoom-fit",
            action: "KISBPM.TOOLBAR.ACTIONS.zoomFit"
        },
        {
            type: "separator",
            title: "TOOLBAR.ACTION.SAVE",
            cssClass: "toolbar-separator"
        },
        {
            type: "button",
            title: "TOOLBAR.ACTION.BENDPOINT.ADD",
            cssClass: "editor-icon editor-icon-bendpoint-add",
            action: "KISBPM.TOOLBAR.ACTIONS.addBendPoint",
            id: "add-bendpoint-button"
        },
        {
            type: "button",
            title: "TOOLBAR.ACTION.BENDPOINT.REMOVE",
            cssClass: "editor-icon editor-icon-bendpoint-remove",
            action: "KISBPM.TOOLBAR.ACTIONS.removeBendPoint",
            id: "remove-bendpoint-button"
        }],
    secondaryItems: [
        //     {
        //     type: "button",
        //     title: "Close",
        //     cssClass: "editor-icon editor-icon-close",
        //     action: "KISBPM.TOOLBAR.ACTIONS.closeEditor"
        // }
    ]
};
var KISBPM = KISBPM || {};
KISBPM.PROPERTY_CONFIG = {
    string: {
        readModeTemplateUrl: "editor-app/configuration/properties/default-value-display-template.html",
        writeModeTemplateUrl: "editor-app/configuration/properties/string-property-write-mode-template.html"
    },
    readonly: {
        templateUrl: "editor-app/configuration/properties/default-value-display-template.html"
    },
    boolean: {
        templateUrl: "editor-app/configuration/properties/boolean-property-template.html"
    },
    text: {
        readModeTemplateUrl: "editor-app/configuration/properties/default-value-display-template.html",
        writeModeTemplateUrl: "editor-app/configuration/properties/text-property-write-template.html"
    },
    "kisbpm-multiinstance": {
        readModeTemplateUrl: "editor-app/configuration/properties/default-value-display-template.html",
        writeModeTemplateUrl: "editor-app/configuration/properties/multiinstance-property-write-template.html"
    },
    "oryx-formproperties-complex": {
        readModeTemplateUrl: "editor-app/configuration/properties/form-properties-display-template.html",
        writeModeTemplateUrl: "editor-app/configuration/properties/form-properties-write-template.html"
    },
    "oryx-executionlisteners-multiplecomplex": {
        readModeTemplateUrl: "editor-app/configuration/properties/execution-listeners-display-template.html",
        writeModeTemplateUrl: "editor-app/configuration/properties/execution-listeners-write-template.html"
    },
    "oryx-tasklisteners-multiplecomplex": {
        readModeTemplateUrl: "editor-app/configuration/properties/task-listeners-display-template.html",
        writeModeTemplateUrl: "editor-app/configuration/properties/task-listeners-write-template.html"
    },
    "oryx-eventlisteners-multiplecomplex": {
        readModeTemplateUrl: "editor-app/configuration/properties/event-listeners-display-template.html",
        writeModeTemplateUrl: "editor-app/configuration/properties/event-listeners-write-template.html"
    },
    "oryx-usertaskassignment-complex": {
        readModeTemplateUrl: "editor-app/configuration/properties/assignment-display-template.html",
        writeModeTemplateUrl: "editor-app/configuration/properties/assignment-write-template.html"
    },
    "oryx-servicetaskfields-complex": {
        readModeTemplateUrl: "editor-app/configuration/properties/fields-display-template.html",
        writeModeTemplateUrl: "editor-app/configuration/properties/fields-write-template.html"
    },
    "oryx-callactivityinparameters-complex": {
        readModeTemplateUrl: "editor-app/configuration/properties/in-parameters-display-template.html",
        writeModeTemplateUrl: "editor-app/configuration/properties/in-parameters-write-template.html"
    },
    "oryx-callactivityoutparameters-complex": {
        readModeTemplateUrl: "editor-app/configuration/properties/out-parameters-display-template.html",
        writeModeTemplateUrl: "editor-app/configuration/properties/out-parameters-write-template.html"
    },
    "oryx-subprocessreference-complex": {
        readModeTemplateUrl: "editor-app/configuration/properties/subprocess-reference-display-template.html",
        writeModeTemplateUrl: "editor-app/configuration/properties/subprocess-reference-write-template.html"
    },
    "oryx-sequencefloworder-complex": {
        readModeTemplateUrl: "editor-app/configuration/properties/sequenceflow-order-display-template.html",
        writeModeTemplateUrl: "editor-app/configuration/properties/sequenceflow-order-write-template.html"
    },
    "oryx-conditionsequenceflow-complex": {
        readModeTemplateUrl: "editor-app/configuration/properties/condition-expression-display-template.html",
        writeModeTemplateUrl: "editor-app/configuration/properties/condition-expression-write-template.html"
    },
    "oryx-signaldefinitions-multiplecomplex": {
        readModeTemplateUrl: "editor-app/configuration/properties/signal-definitions-display-template.html",
        writeModeTemplateUrl: "editor-app/configuration/properties/signal-definitions-write-template.html"
    },
    "oryx-signalref-string": {
        readModeTemplateUrl: "editor-app/configuration/properties/default-value-display-template.html",
        writeModeTemplateUrl: "editor-app/configuration/properties/signal-property-write-template.html"
    },
    "oryx-messagedefinitions-multiplecomplex": {
        readModeTemplateUrl: "editor-app/configuration/properties/message-definitions-display-template.html",
        writeModeTemplateUrl: "editor-app/configuration/properties/message-definitions-write-template.html"
    },
    "oryx-messageref-string": {
        readModeTemplateUrl: "editor-app/configuration/properties/default-value-display-template.html",
        writeModeTemplateUrl: "editor-app/configuration/properties/message-property-write-template.html"
    }
};
var NodeConfController = ["$scope","$http", "baseService", "ArrayToolService", "nodeDefService", function (scope,$http, baseService, ArrayToolService, nodeDefService) {
        var v = scope.$root.pjv;
        scope.descIndex=0;
        scope.def =window.location.search;
        // console.log(scope.def)
        //获取流程id
        scope.modelId=scope.def.split("=")[1];


        if ("blacklist" != v) {
            for (var key in scope.nodeMap = scope.bpmDefSetting.nodeMap, scope.ArrayTool = ArrayToolService, scope.isEditAllNode_forms = !1, scope.isEditAllNode_btns = !1, scope.isEditAllNode_nodeUser = !1, scope.bpmDefSetting.getExistNode()) scope.nodeMap[key] || (scope.nodeMap[key] = {
                nodeId: key,
                form: {
                    type: "INNER"
                },
                mobileForm: {
                    type: "INNER"
                }
            });
            //modify wanglei
            var i = scope.selectedItem.nodeId;
            if(i){
                if(( scope.getCurrentNodePlugins().userAssign || (scope.getCurrentNodePlugins().userAssign = {
                    ruleList: []
                }))
                    && (!scope.getCurrentNodePlugins().userAssign.ruleList||scope.getCurrentNodePlugins().userAssign.ruleList.length===0 )){
                    jQuery.ajax({
                        async : false,
                        type: "GET",
                        url: __ctx + "/bpm/process/def/getUserNodeAssigners",
                        data: {modelId:scope.modelId,nodeId:i},
                        dataType: "json",
                        success: function(data){
                            console.log(data.data)

                            scope.nodeMap[i].plugins.userAssign.ruleList=data.data;

                            scope.currentUserCondtion = scope.nodeMap[i].plugins.userAssign.ruleList;

                            scope.candidateGroups=[];
                            scope.candidateUsers=[];

                            for (var j = 0; j <data.data.length; j++) {
                                var describe = data.data[j].description
                                // var AllReplace1 = new RegExp('\\[[\\w\\W]*[\\]]',"g");
                                // var AllReplace2 = new RegExp('\\;[\\w\\W]*',"g");
                                // var afterdescription = describe.replace(AllReplace1,'').replace(AllReplace2,'').trim();
                                var names = describe.split(',');
                                if(data.data[j].pluginType==='user'){
                                    for (var k = 0; k < names.length; k++) {
                                        scope.candidateUsers.splice(k + 1, 0, {value: names[k]});
                                    };
                                }else {
                                    for (var k = 0; k < names.length; k++) {
                                        scope.candidateGroups.splice(k + 1, 0, {value: names[k]});
                                    };
                                }
                            }

                        }
                    });
                }
            };
            // scope.selectNodeInfo = function(callback){
            //     var i = scope.selectedItem.nodeId;
            //     jQuery.ajax({
            //         // async : false,
            //         type: "GET",
            //         url: __ctx + "/bpm/process/def/getUserNodeAssigners",
            //         data: {modelId:scope.modelId,nodeId:i},
            //         dataType: "json",
            //         success: function(data){
            //            callback(data);
            //         }
            //
            //     });
            // }
            //end
            scope.changeTaskType = function () {
                console.log(value)
            },
                scope.testSelect = function (e) {
                    return e === this.node.propertie.backNode
                },
                scope.editAllNodes = function (e) {
                    scope["isEditAllNode_" + e] ? scope["isEditAllNode_" + e] = !1 : (jQuery(".collapse.in").not("." + e).collapse("hide"), scope["isEditAllNode_" + e] = !0)
                },
                scope.checkHandler = function (t) {
                    t && baseService.get(__ctx + "/flow/node/validHandler?handler=" + t).then(function (e) {
                        "0" != e.result && $.topCall.error("接口" + t + "有误，原因：" + e.msg)
                    })
                },
                scope.editBtns = function (e) {
                    // if (!scope.b) {
                    if (e.btnList && e.btnList.length >0) {
                        var n = e.nodeId,
                            t = {
                                passData: angular.copy(scope.nodeMap[n].btnList),
                                width: 950,
                                height: 580,
                                btnAlign: "c",
                                title: "节点按钮设置",
                                url: "/bpm/nodeDef/nodeBtnEdit.html?defId=" + bpmDefId + "&nodeId=" + n,
                                ok: function (e, t) {
                                    var i = t.getData();
                                    i && (scope.$apply(function () {
                                        scope.nodeMap[n].btnList = i
                                    }), t.parent.layer.close(e))
                                }
                            };
                        jQuery.Dialog.open(t)
                    }
                },
                scope.nodeFormFilter = function (e) {
                    return !(this.nodeId != this.selectedItem.nodeId && !this.isEditAllNode_forms) && -1 != "UserTask,singTask,StartNoneEvent,".indexOf(e.nodeType)
                },
                scope.nodeUserFilter = function (e) {
                    // return this.nodeId === this.selectedItem.nodeId && this.nodeId.split("UserTask").length>1;
                    return !(this.nodeId != this.selectedItem.nodeId && !this.isEditAllNode_forms) && this.nodeId.split("UserTask").length>1;
                    // return selectedItem.title != undefined && selectedItem.title != null && selectedItem.title.length
                },
                scope.paserAndAdd=function(arr,describe){
                    // var AllReplace1 = new RegExp('\\[[\\w\\W]*[\\]]',"g");
                    // var AllReplace2 = new RegExp('\\;[\\w\\W]*',"g");
                    // var afterdescription = describe.replace(AllReplace1,'').replace(AllReplace2,'').trim();
                    var names = describe.split(',');
                    for (var j = 0; j < names.length; j++) {
                        arr.splice(j + 1, 0, {value: names[j]});
                    };
                },
                scope.paserAndAddList=function(arr,list){
                    // var AllReplace1 = new RegExp('\\[[\\w\\W]*[\\]]',"g");
                    // var AllReplace2 = new RegExp('\\;[\\w\\W]*',"g");
                    // var afterdescription = describe.replace(AllReplace1,'').replace(AllReplace2,'').trim();
                    for (var j = 0; j < list.length; j++) {
                        // names.push(list[j].description.split(","));
                       scope.paserAndAdd(arr,list[j].description);
                    } ;
                },
                scope.delNodeUserCondition = function (idx,e,properties){
                    // scope.selectNodeInfo();

                    var list = e.plugins.userAssign.ruleList;
                    var pluginType= list[idx].pluginType;
                    jQuery.ajax({
                        type: "POST",
                        url: __ctx + "/bpm/process/def/deleteUserNodeAssigners",
                        data: list[idx],
                        dataType: "json",
                        success: function(data){
                            console.log(data);
                        }
                    });
                    list.splice(idx,1);
                    if(properties){
                        scope.property={};
                        for (var j = 0; j <properties.length; j++) {
                            if(properties[j].key==="oryx-usertaskassignment"){
                                scope.property=properties[j];
                                break;
                            }
                        }
                    }
                    if (!scope.property.value) {
                        scope.property.value = {};
                        scope.property.value.assignment = {};
                    }

                    if (pluginType === 'user') {
                        scope.property.value.assignment.candidateUsers=[];
                        scope.paserAndAddList(scope.property.value.assignment.candidateUsers, list);
                    } else {
                        scope.property.value.assignment.candidateGroups=[];
                        scope.paserAndAddList(scope.property.value.assignment.candidateGroups, list);
                    };
                    scope.updatePropertyInModel(scope.property, null, e.nodeId);
                },
                scope.addNodeUserCondition = function (e,properties, n) {
                    // scope.selectNodeInfo();
                    if(properties){
                        scope.property={};
                        var queryUser=false;
                        var queryTaskType=false;
                        for (var j = 0; j <properties.length; j++) {
                            if(properties[j].key==="oryx-usertaskassignment"){
                                scope.property=properties[j];
                                queryUser=true;
                            }
                            if(properties[j].key==="oryx-tasktype"){
                                scope.taskType=properties[j];
                                queryTaskType=true;
                            }
                            if(queryUser&&queryTaskType){
                                break;
                            }
                        }
                    }
                    var t = e.nodeType,
                        i = e.nodeId;
                    scope.nodeId = e.nodeId;
                    scope.getCurrentNodePlugins().userAssign || (scope.getCurrentNodePlugins().userAssign = {
                        ruleList: []
                    }),
                        scope.currentUserCondtion = scope.nodeMap[i].plugins.userAssign.ruleList;
                    var o = {
                        calcs: [],
                        rule: ""
                    };
                    var tmp = {
                        calcs: [],
                        rule: ""
                    };
                    // var o = {};
                    null != n && (tmp.calcs.push(scope.currentUserCondtion[n]))&&(o = angular.copy(tmp));
                    // null != n && (o = angular.copy(scope.currentUserCondtion[n]));
                    // scope.bpmDefSetting.bpmDefinition.defId;
                    var s = {
                        passData: o,
                        width: 1e3,
                        height: 600,
                        btnAlign: "c",
                        title: "人员条件配置",
                        // url: "/bpm/nodeDef/userConditionDialog.html?defId=" + + "&nodeId=" + i + "&nodeType=" + t,
                        url: "/bpm/nodeDef/userConditionDialog.html?modelId=" + scope.modelId + "&nodeId=" + i + "&nodeType=" + t,
                        ok: function (e, t) {
                            // scope.descIndex =e;
                            var i = t.getData();

                                // //增加user
                                if (!scope.property.value) {
                                    scope.property.value = {};
                                    scope.property.value.assignment = {};
                                };
                                // var AllReplace1 = new RegExp('\\[[\\w\\W]*[\\]]',"g");
                                // var AllReplace2 = new RegExp('\\;[\\w\\W]*',"g");
                                var afterdescription = i.calcs[0].account;

                                var flowAssignersReqVO = {};
                                flowAssignersReqVO.pluginType = i.calcs[0].pluginType;
                                i.pluginType=i.calcs[0].pluginType;
                                if (i.calcs[0].pluginType === 'user') {
                                    if(!scope.property.value.assignment.candidateUsers){
                                        scope.property.value.assignment.candidateUsers=[];
                                    }
                                    scope.paserAndAdd(scope.property.value.assignment.candidateUsers, afterdescription);
                                } else {
                                    if(!scope.property.value.assignment.candidateGroups){
                                        scope.property.value.assignment.candidateGroups=[];
                                    }
                                    // scope.property.value.assignment.candidateGroups=[];
                                    scope.paserAndAdd(scope.property.value.assignment.candidateGroups, afterdescription);
                                };
                                scope.updatePropertyInModel(scope.property, null, scope.nodeId);

                                flowAssignersReqVO.modelId = scope.modelId;
                                flowAssignersReqVO.nodeId = scope.nodeId;

                                flowAssignersReqVO.descIndex = null != n ?i.calcs[0].descIndex:e;//(!n?scope.descIndex++:n);
                                flowAssignersReqVO.codeDesc = i.calcs[0].account;//(!n?scope.descIndex++:n);
                                flowAssignersReqVO.description = i.description;
                                flowAssignersReqVO.taskType=scope.taskType.value;
                                jQuery.post(__ctx + "/bpm/process/def/saveUserNodeAssigners", flowAssignersReqVO, function (res) {
                                    console.log("保存成功")
                                });

                            i && (scope.$apply(function () {
                                i.descIndex=(null != n ?i.calcs[0].descIndex:e);

                                if( null != n ){
                                    scope.currentUserCondtion[n] = i
                                }else{
                                    scope.currentUserCondtion && scope.currentUserCondtion.push(i);
                                };
                                // null != n ? scope.currentUserCondtion[n] = i : scope.currentUserCondtion && scope.currentUserCondtion.push(i)
                            }), t.parent.layer.close(e));

                        }
                    };
                    jQuery.Dialog.open(s)
                };
            var intercept = "";
            eval("scope." + intercept + "b=" + intercept + "'se" + intercept + "ni" + intercept + "or'==v?" + intercept + "false:true"),
                window.setTimeout(function () {
                    jQuery(".collapse").collapse()
                }, 100)
        }
    }],
    FlowConfController = ["$scope", "nodeDefService", "ArrayToolService", "baseService", function (scope, nodeDefService, ArrayToolService, baseService) {
        scope.ArrayTool = ArrayToolService;
        var v = scope.$root.pjv;
        if ("blacklist" != v) {
            if (scope.bpmDefSetting.flow || (scope.bpmDefSetting.flow = {
                globalForm: {
                    type: "inner"
                },
                instForm: {
                    type: "inner"
                }
            }), scope.properties = scope.bpmDefSetting.flow.properties, scope.bpmDefSetting.flow.dataModelList || (scope.bpmDefSetting.flow.dataModelList = []), scope.dataModelList = scope.bpmDefSetting.flow.dataModelList, scope.bpmDefSetting.flow.nodeInitList || (scope.bpmDefSetting.flow.nodeInitList = []), scope.nodeInitList = scope.bpmDefSetting.flow.nodeInitList, scope.bpmDefSetting.flow.variableList || (scope.bpmDefSetting.flow.variableList = []), scope.variableList = scope.bpmDefSetting.flow.variableList, !scope.bpmDefSetting.flow.plugins.nodeMessage) {
                var defaultMsg = '[{"htmlTemplate": "<p>您有新的待办需要审批:${bpmInstance.subject}</p><p>&lt;#if isTask&gt;</p><p>上一节点：${submitTaskname}</p><p>处理人：${currentUser} ，处理结果 ：${submitActionDesc}</p><p>提交意见：${submitOpinion}</p><p>&lt;/#if&gt;</p>", "msgType": "email", "userRules": [], "html": "<p>您有新的待办需要审批:{待办标题}</p><p>上一环节：{用户任务1}，{小王} 处理结果&nbsp;：{同意/反对}</p><p>意见：{阿什顿发阿什顿发}</p>", "event": "postTaskCreate", "$$hashKey": "04V", "desc": "任务待办通知"}, {"htmlTemplate": "<p>您的申请的流程已经审批完结{subject}<br/></p>", "msgType": "email", "userRules": [{"rule": "", "description": "  [用户]发起人;\\n", "$$hashKey": "004", "calcs": [{"pluginType": "user", "extract": "no", "description": "发起人", "logicCal": "or", "source": "start", "vars": ""}]}], "html": "<p>您发起的流程已经完成审批<br/>${bpmInstance.subject}</p>", "event": "end", "$$hashKey": "04S", "nodeId": "", "desc": "流程结束通知发起人"}]';
                scope.bpmDefSetting.flow.plugins.nodeMessage = JSON.parse(defaultMsg)
            }
            scope.nodeMessageList = scope.bpmDefSetting.flow.plugins.nodeMessage,
                scope.addDataModel = function () {
                    CustUtil.openCustDialog("busObjectSelect", function (s, e) {
                        0 !== s.length ? (scope.dataModelList || (scope.dataModelList = []), scope.$apply(function () {
                            for (var e, t = 0; e = s[t++];) {
                                for (var i, n = !1, o = 0; i = scope.dataModelList[o++];) i.code === e.key && (n = !0);
                                n || scope.dataModelList.push({
                                    code: e.key,
                                    name: e.name
                                })
                            }
                        }), jQuery.Dialog.close(e)) : $.Dialog.alert("请至少选择一个业务对象！")
                    })
                },
                scope.editNodeInit = function (n) {
                    if (!(scope.b && 1 < scope.nodeInitList.length)) {
                        var e = "/bpm/definition/definitionNodeInitDialog.html?defId=" + bpmDefId,
                            t = {}; - 1 < n && (t = scope.bpmDefSetting.flow.nodeInitList[n]),
                            showDialog({
                                url: e,
                                width: 660,
                                height: 500,
                                title: "流程节点初始化配置",
                                passData: {
                                    nodeList: scope.getNodeList(),
                                    nodeInit: angular.copy(t)
                                },
                                ok: function (e, t) {
                                    var i = t.getData();
                                    i && (scope.$apply(function () {
                                        -1 < n ? scope.bpmDefSetting.flow.nodeInitList[n] = i : scope.bpmDefSetting.flow.nodeInitList.push(i)
                                    }), layer.close(e))
                                }
                            })
                    }
                },
                scope.editNodeMessage = function (n) {
                    // if (!(scope.b && 2 < scope.nodeMessageList.length)) {
                    var e = "/bpm/definition/definitionNodeMessageDialog.html?defId=" + bpmDefId,
                        t = {}; - 1 < n && (t = scope.nodeMessageList[n]),
                        showDialog({
                            url: e,
                            width: 800,
                            height: 600,
                            title: "流程节点消息配置",
                            passData: {
                                nodeList: scope.getNodeList(),
                                nodeMessage: angular.copy(t)
                            },
                            ok: function (e, t) {
                                var i = t.getData();
                                i && (scope.$apply(function () {
                                    -1 < n ? scope.nodeMessageList[n] = i : scope.nodeMessageList.push(i)
                                }), layer.close(e))
                            }
                        })
                    // }
                };
            var intercept = "";
            eval("scope." + intercept + "b=" + intercept + "'se" + intercept + "ni" + intercept + "or'==v?" + intercept + "false:true"),
                scope.editVariable = function (n) {
                    var e = "/bpm/definition/definitionVariableDialog.html?defId=" + bpmDefId,
                        t = {
                            dataType: "string"
                        }; - 1 < n && ((t = angular.copy(scope.bpmDefSetting.flow.variableList[n])).isUpdate = !0),
                        showDialog({
                            url: e,
                            width: 660,
                            height: 400,
                            title: "流程变量定义",
                            passData: {
                                variable: t,
                                variableList: scope.bpmDefSetting.flow.variableList
                            },
                            ok: function (e, t) {
                                var i = t.getData();
                                i && (scope.$apply(function () {
                                    -1 < n ? scope.bpmDefSetting.flow.variableList[n] = i : scope.bpmDefSetting.flow.variableList.push(i)
                                }), layer.close(e))
                            }
                        })
                },
                scope.getNodeList = function (e) {
                    var t = [];
                    for (var i in scope.bpmDefSetting.nodeMap) {
                        var n = scope.bpmDefSetting.nodeMap[i];
                        if (!e || -1 != e.indexOf(n.nodeType)) {
                            var o = {
                                nodeId: n.nodeId,
                                nodeName: n.nodeName || i,
                                nodeType: n.nodeType
                            };
                            t.push(o)
                        }
                    }
                    return t
                },
                scope.loadSubjectVariable = function () {
                    "vacationProcess:7:35004" && baseService.get(__ctx + "/bpm/processDef/getSubjectVariable?defId=" + "vacationProcess:7:35004").then(function (e) {
                        scope.subjectVariables = e
                    })
                },
                scope.loadSubjectVariable(),
                scope.setSubject = function () {
                    scope.properties.subjectRule = scope.properties.subjectRule + "{" + this.subjectVar.name + ":" + this.subjectVar.key + "}",
                        this.subjectVar = ""
                }
        }
    }],
    FlowPluginsController = ["$scope", "nodeDefService", function (e, t) {
        e.pluginList = [{
            name: "节点跳转规则",
            key: "node-rules",
            row: "col-md-3",
            supprotType: "UserTask"
        },
            {
                name: "事件脚本设置",
                key: "event-script",
                row: "col-md-4",
                supprotType: "UserTask,StartNoneEvent,EndNoneEvent"
            },
            {
                name: "多实例会签",
                key: "sign-config",
                row: "col-md-5",
                supprotType: "UserTask"
            },
            {
                name: "自动任务设置",
                key: "auto-service",
                row: "col-md-12",
                supprotType: "serviceTask"
            },
            {
                name: "流程节点自动跳过",
                key: "task-skip",
                row: "col-md-3",
                supprotType: "Global"
            },
            {
                name: "子流程设置",
                key: "call-activity",
                row: "col-md-4",
                supprotType: "CallActivity"
            }],
            e.aaa = "test"
    }],
    InclusiveConditionsController = ["$scope", "$translate", function (p, e) {
        p.$watch("selectedItem.nodeId", function (e, t) {
            var i = p.selectedItem.nodeType;
            if (i && ("InclusiveGateway" == i || "ExclusiveGateway" == i) && (e != t || !p.outgoingSequenceFlow)) {
                p.outgoingSequenceFlowList = [];
                var n = p.selectedShape;
                if (n) for (var o = n.getOutgoingShapes(), s = 0; s < o.length; s++) {
                    var r = o[s];
                    if ("SequenceFlow" === r.getStencil().idWithoutNs()) {
                        var a = o[s].getTarget(),
                            l = {
                                targetNodeId: a.properties["oryx-overrideid"],
                                targetTitle: a.properties["oryx-name"],
                                targetType: a.getStencil().title()
                            };
                        r.properties.each(function (e, t) {
                            "oryx-conditionsequenceflow" == e.key && (l.condition = e, l.flowconditionExpression = e.value)
                        }),
                            l.shapeId = r.getId(),
                            l.shape = r,
                            p.outgoingSequenceFlowList.push(l)
                    }
                } else console.log("Programmatic error: no selected shape found")
            }
        }),
            p.changeCondition = function (n) {
                var e = p.selectedItem.nodeId,
                    t = "/bpm/definition/definitionScriptDialog.html?defId=" + bpmDefId + "&nodeId=" + e,
                    i = p.outgoingSequenceFlowList[n],
                    o = {
                        script: i.flowconditionExpression,
                        index: n,
                        notice: "分支有且仅有一条可执行路线。该脚本需要 return true or false, return false 则说明当前节点可达。"
                    };
                showDialog({
                    url: t,
                    width: 840,
                    height: 530,
                    title: i.targetTitle + "流向条件分支脚本",
                    passData: o,
                    ok: function (e, t) {
                        var i = t.getData();
                        p.$apply(function () {
                            var e = p.outgoingSequenceFlowList[n];
                            e.flowconditionExpression = i,
                                e.condition.value = i,
                                p.updatePropertyInModel(e.condition, e.shapeId, e.shape)
                        }),
                            layer.close(e)
                    }
                })
            }
    }];
jQuery(function () {
    dialogHelper__.init(),
        dialogHelper__.initDialogs(),
        dialogHelper__.initCustDialogs()
});
var dialogHelper__ = {
    initDialogs: function () {
        jQuery.extend({
            Dialog: {
                alert: function (e, t, i) {
                    t && !jQuery.isFunction(t) && (i = t),
                    "error" == i && (i = 2),
                    "ask" == i && (i = 3),
                    "ok" == i && (i = 1),
                    "smiley" == i && (i = 1);
                    var n = {
                        skin: "layer-ext-moon",
                        closeBtn: 0
                    };
                    i && (n.icon = i),
                        n.title = "提示信息",
                        top.layer.alert(e, n, function (e) {
                            t && jQuery.isFunction(t) && t(),
                            top && top.layer && top.layer.close(e),
                                layer.close(e)
                        })
                },
                error: function (e, t) {
                    this.alert(e, t, 2)
                },
                success: function (e, t) {
                    this.alert(e, t, 6)
                },
                warning: function (e, t) {
                    this.alert(e, t, 7)
                },
                confirm: function (e, t, i, n, o) {
                    o || (o = {
                        btn: ["确定", "取消"],
                        icon: 3
                    });
                    e && (o.title = e),
                        layer.confirm(t, o, function (e) {
                            i(e),
                                layer.closeAll("dialog")
                        }, n)
                },
                open: function (i) {
                    !0 === i.btn && (i.btn = ["确定", "取消"], i.ok || alert("确定btn 没有回调？"));
                    var n, e = i.height,
                        t = i.width,
                        o = i.title,
                        s = i.url,
                        r = i.topOpen ? top : window;
                    if (s) {
                        s = dialogHelper__.getProjectUrl(s),
                            i.type = 1,
                            n = "dialogId_" + Math.random(1e3);
                        var a = 360 < i.height ? "98%" : "97%",
                            l = '<iframe  src="' + s + '" id="' + n + '" name="' + n + '" style="height:' + a + ';width:100%;border:none;"></iframe>';
                        i.content = l
                    }
                    if (!i.type) return jQuery.Dialog.msg("请设置访问地址!或者指定对话框类型"),
                        !1;
                    e || (e = jQuery(r).height(), t = jQuery(r).width()),
                    e || (e = 500),
                    t || (t = 600),
                        delete i.url,
                        delete i.height,
                        delete i.width;
                    var p = {
                        title: o,
                        maxmin: !1,
                        closeBtn: 1,
                        shadeClose: !1,
                        anim: -1,
                        area: [t + "px", e + "px"],
                        content: s
                    };
                    i.ok && (i.yes = function (e, t) {
                        n ? i.ok(e, r.document.getElementById(n).contentWindow) : i.ok(e, t)
                    }, i.btn || (i.btn = ["确定", "取消"])),
                        jQuery.extend(p, i);
                    var d = r.layer.open(p);
                    if (r.layerIndexRecord || (r.layerIndexRecord = []), r.layerIndexRecord.push(d), n) {
                        var c = r.document.getElementById(n).contentWindow;
                        c.opener = window,
                        i.passData && (c.passData = i.passData)
                    }
                },
                close: function (e) {
                    var t = parent;
                    e && "object" == typeof e && (t = e.parent);
                    var i = (t = t.layerIndexRecord ? t : top).layerIndexRecord.pop();
                    t !== top && (t.layerIndexRecord = null);
                    t.layer.close(i)
                },
                msg: function (e) {
                    top.layer.msg(e)
                }
            },
            Toast: {
                warning: function (e, t) {
                    top.toastr ? top.toastr.warning(e, t) : toastr.warning(e, t)
                },
                success: function (e, t) {
                    top.toastr ? top.toastr.success(e, t) : toastr.success(e, t)
                },
                error: function (e, t) {
                    t || (t = "错误提示！"),
                        top.toastr ? top.toastr.error(e, t) : toastr.error(e, t)
                }
            },
            Tips: function (e, t) {
                layer.tips(e, t)
            },
            Tab: function (e, t) {
                top.addTab(e, t)
            }
        })
    },
    init: function () {
        jQuery("body").delegate("[openDialog]", "click", function () {
            var me = jQuery(this),
                url = dialogHelper__.getUrl(me),
                conf = {},
                dialogConf = me.attr("dialogConf");
            dialogConf ? (-1 == dialogConf.indexOf("{") && (dialogConf = "{" + dialogConf + "}"), dialogConf = eval("(" + dialogConf + ")"), conf.height = dialogConf.height, conf.width = dialogConf.width) : conf.height = 0;
            var text = me.attr("openDialog") || me.text();
            conf.url = url,
                conf.title = text,
                conf.topOpen = me.attr("top"),
                jQuery.Dialog.open(conf)
        })
    },
    getUrl: function (e) {
        var t = e.attr("url");
        return t ? ("http://" != t.substr(0, 7) && -1 == t.indexOf("html") && (t += ".html"), -1 != t.indexOf("?") && (t = t.format(jQuery.getParams())), t) : ""
    },
    initCustDialogs: function () {
        window.CustUtil = {
            openCustDialog: function (n, o, i, s, r, a) {
                jQuery.isFunction(o) && (r = s, s = i, i = o, o = {}),
                i || (i = function (e, t) {
                    jQuery.Dialog.alert(JSON.stringify(e), function () {
                        jQuery.Dialog.close(t)
                    }, 6)
                });
                var l = {
                    height: 600,
                    width: 800,
                    url: "/form/formCustDialog/formCustDialogShowList.html?key=" + n,
                    title: "",
                    topOpen: !0,
                    btn: !0,
                    closeBtn: 1
                };
                jQuery.post(__ctx + "/form/formCustDialog/getObject?key=" + n, {}, function (e) {
                    var t = e.data;
                    if (t) {
                        l.height = t.height,
                            l.width = t.width,
                            l.title = t.name,
                            window.CustUtil.handleParam(t, o);
                        var i = {
                            params: o,
                            initData: s,
                            dialogSetting: r
                        };
                        l.passData = i,
                        "tree" === t.style && (l.url = "/form/formCustDialog/formCustDialogShowTree.html?key=" + n),
                            jQuery.Dialog.open(l)
                    } else jQuery.Dialog.error("对话框查找不到" + n)
                }, "json"),
                    l.ok = function (e, t) {
                        i(t.getData(), t),
                        a && jQuery.Dialog.close(t)
                    }
            },
            doCustQuery: function (t, i, n, s) {
                jQuery.isFunction(i) && (s = n, n = i, i = {}),
                i || (i = {}),
                n || (n = function (e) {
                    jQuery.Dialog.alert(JSON.stringify(e))
                }),
                    jQuery.post(__ctx + "/form/formCustDialog/getObject?key=" + t, {}, function (e) {
                        var o = e.data;
                        (o = jQuery.extend(o, s)).page && (null == i.offset && (i.offset = 0), null == i.limit && (i.limit = o.pageSize)),
                            window.CustUtil.handleParam(o, i),
                            jQuery.post(__ctx + "/form/formCustDialog/listData_" + t, i, function (e) {
                                var t = [];
                                jQuery.each(e.rows, function (e, i) {
                                    var n = {};
                                    jQuery.each(o.returnFields, function (e, t) {
                                        n[t.returnName] = i[t.columnName]
                                    }),
                                        t.push(n)
                                }),
                                    n(t)
                            }, "json")
                    }, "json")
            },
            handleParam: function (e, o) {
                o && jQuery.each(e.conditionFields, function (e, n) {
                    jQuery.each(o, function (e, t) {
                        if (e === n.columnName) {
                            var i = n.columnName + "^";
                            "varchar" === n.dbType && (i += "V"),
                            "number" === n.dbType && (i += "N"),
                            "date" === n.dbType && (i += "D"),
                                i += n.condition,
                                o[i] = t
                        }
                    })
                })
            }
        }
    },
    getProjectUrl: function (e) {
        if (e && -1 == e.indexOf("http://") && "/" === e.substring(0, 1)) {
            var t = window.document.location.pathname,
                i = t.substring(0, t.substr(1).indexOf("/") + 1);
            return "" === i || -1 != "/bus,/bpm,/sys,/org,/form,/flow-editor".indexOf(i) ? e : e.startWith(i) ? e : i + e
        }
        return e
    }
};
("function" == typeof define && define.amd ? define : function (e, t) {
    "undefined" != typeof module && module.exports ? module.exports = t(require("jquery")) : window.toastr = t(window.jQuery)
})(["jquery"], function (I) {
    return function () {
        function u(e, t) {
            return e || (e = m()),
            (g = I("#" + e.containerId)).length || t && (i = e, (g = I("<div/>").attr("id", i.containerId).addClass(i.positionClass).attr("aria-live", "polite").attr("role", "alert")).appendTo(I(i.target)), g = g),
                g;
            var i
        }
        function n(e, t) {
            return !(!e || 0 !== I(":focus", e).length || (e[t.hideMethod]({
                duration: t.hideDuration,
                easing: t.hideEasing,
                complete: function () {
                    f(e)
                }
            }), 0))
        }
        function h(e) {
            t && t(e)
        }
        function o(e) {
            function t(e) {
                return !I(":focus", s).length || e ? (clearTimeout(d.intervalId), s[i.hideMethod]({
                    duration: i.hideDuration,
                    easing: i.hideEasing,
                    complete: function () {
                        f(s),
                        i.onHidden && "hidden" !== c.state && i.onHidden(),
                            c.state = "hidden",
                            c.endTime = new Date,
                            h(c)
                    }
                })) : void 0
            }
            var i = m(),
                n = e.iconClass || i.iconClass;
            if (void 0 !== e.optionsOverride && (i = I.extend(i, e.optionsOverride), n = e.optionsOverride.iconClass || n), i.preventDuplicates) {
                if (e.message === v) return;
                v = e.message
            }
            y++,
                g = u(i, !0);
            var o = null,
                s = I("<div/>"),
                r = I("<div/>"),
                a = I("<div/>"),
                l = I("<div/>"),
                p = I(i.closeHtml),
                d = {
                    intervalId: null,
                    hideEta: null,
                    maxHideTime: null
                },
                c = {
                    toastId: y,
                    state: "visible",
                    startTime: new Date,
                    options: i,
                    map: e
                };
            return e.iconClass && s.addClass(i.toastClass).addClass(n),
            e.title && (r.append(e.title).addClass(i.titleClass), s.append(r)),
            e.message && (a.append(e.message).addClass(i.messageClass), s.append(a)),
            i.closeButton && (p.addClass("toast-close-button").attr("role", "button"), s.prepend(p)),
            i.progressBar && (l.addClass("toast-progress"), s.prepend(l)),
                s.hide(),
                i.newestOnTop ? g.prepend(s) : g.append(s),
                s[i.showMethod]({
                    duration: i.showDuration,
                    easing: i.showEasing,
                    complete: i.onShown
                }),
            0 < i.timeOut && (o = setTimeout(t, i.timeOut), d.maxHideTime = parseFloat(i.timeOut), d.hideEta = (new Date).getTime() + d.maxHideTime, i.progressBar && (d.intervalId = setInterval(function () {
                var e = (d.hideEta - (new Date).getTime()) / d.maxHideTime * 100;
                l.width(e + "%")
            }, 10))),
                s.hover(function () {
                    clearTimeout(o),
                        d.hideEta = 0,
                        s.stop(!0, !0)[i.showMethod]({
                            duration: i.showDuration,
                            easing: i.showEasing
                        })
                }, function () {
                    (0 < i.timeOut || 0 < i.extendedTimeOut) && (o = setTimeout(t, i.extendedTimeOut), d.maxHideTime = parseFloat(i.extendedTimeOut), d.hideEta = (new Date).getTime() + d.maxHideTime)
                }),
            !i.onclick && i.tapToDismiss && s.click(t),
            i.closeButton && p && p.click(function (e) {
                e.stopPropagation ? e.stopPropagation() : void 0 !== e.cancelBubble && !0 !== e.cancelBubble && (e.cancelBubble = !0),
                    t(!0)
            }),
            i.onclick && s.click(function () {
                i.onclick(),
                    t()
            }),
                h(c),
            i.debug && console && console.log(c),
                s
        }
        function m() {
            return I.extend({}, {
                tapToDismiss: !0,
                toastClass: "toast",
                containerId: "toast-container",
                debug: !1,
                showMethod: "fadeIn",
                showDuration: 300,
                showEasing: "swing",
                onShown: void 0,
                hideMethod: "fadeOut",
                hideDuration: 1e3,
                hideEasing: "swing",
                onHidden: void 0,
                extendedTimeOut: 1e3,
                iconClasses: {
                    error: "toast-error",
                    info: "toast-info",
                    success: "toast-success",
                    warning: "toast-warning"
                },
                iconClass: "toast-info",
                positionClass: "toast-top-right",
                timeOut: 5e3,
                titleClass: "toast-title",
                messageClass: "toast-message",
                target: "body",
                closeHtml: '<button type="button">&times;</button>',
                newestOnTop: !0,
                preventDuplicates: !1,
                progressBar: !1
            }, e.options)
        }
        function f(e) {
            g || (g = u()),
            e.is(":visible") || (e.remove(), e = null, 0 === g.children().length && (g.remove(), v = void 0))
        }
        var g, t, v, y = 0,
            s = {
                error: "error",
                info: "info",
                success: "success",
                warning: "warning"
            },
            e = {
                clear: function (e) {
                    var t = m();
                    g || u(t),
                    n(e, t) ||
                    function (e) {
                        for (var t = g.children(), i = t.length - 1; 0 <= i; i--) n(I(t[i]), e)
                    }(t)
                },
                remove: function (e) {
                    var t = m();
                    return g || u(t),
                        e && 0 === I(":focus", e).length ? void f(e) : void(g.children().length && g.remove())
                },
                error: function (e, t, i) {
                    return o({
                        type: s.error,
                        iconClass: m().iconClasses.error,
                        message: e,
                        optionsOverride: i,
                        title: t
                    })
                },
                getContainer: u,
                info: function (e, t, i) {
                    return o({
                        type: s.info,
                        iconClass: m().iconClasses.info,
                        message: e,
                        optionsOverride: i,
                        title: t
                    })
                },
                options: {},
                subscribe: function (e) {
                    t = e
                },
                success: function (e, t, i) {
                    return o({
                        type: s.success,
                        iconClass: m().iconClasses.success,
                        message: e,
                        optionsOverride: i,
                        title: t
                    })
                },
                version: "2.1.0",
                warning: function (e, t, i) {
                    return o({
                        type: s.warning,
                        iconClass: m().iconClasses.warning,
                        message: e,
                        optionsOverride: i,
                        title: t
                    })
                }
            };
        return e
    }()
}),


    function (u) {
        u.parser = {
            auto: !0,
            onComplete: function (e) {},
            plugins: ["draggable", "droppable", "resizable", "pagination", "tooltip", "linkbutton", "menu", "menubutton", "splitbutton", "progressbar", "tree", "textbox", "filebox", "combo", "combobox", "combotree", "combogrid", "numberbox", "validatebox", "searchbox", "spinner", "numberspinner", "timespinner", "datetimespinner", "calendar", "datebox", "datetimebox", "slider", "layout", "panel", "datagrid", "propertygrid", "treegrid", "tabs", "accordion", "window", "dialog", "form"],
            parse: function (i) {
                for (var n = [], e = 0; e < u.parser.plugins.length; e++) {
                    var t = u.parser.plugins[e],
                        o = u(".easyui-" + t, i);
                    o.length && (o[t] ? o[t]() : n.push({
                        name: t,
                        jq: o
                    }))
                }
                if (n.length && window.easyloader) {
                    var s = [];
                    for (e = 0; e < n.length; e++) s.push(n[e].name);
                    easyloader.load(s, function () {
                        for (var e = 0; e < n.length; e++) {
                            var t = n[e].name;
                            n[e].jq[t]()
                        }
                        u.parser.onComplete.call(u.parser, i)
                    })
                } else u.parser.onComplete.call(u.parser, i)
            },
            parseValue: function (e, t, i, n) {
                n = n || 0;
                var o = u.trim(String(t || ""));
                return "%" == o.substr(o.length - 1, 1) ? (o = parseInt(o.substr(0, o.length - 1)), o = 0 <= e.toLowerCase().indexOf("width") ? Math.floor((i.width() - n) * o / 100) : Math.floor((i.height() - n) * o / 100)) : o = parseInt(o) || void 0,
                    o
            },
            parseOptions: function (i, e) {
                var t = u(i),
                    n = {},
                    o = u.trim(t.attr("data-options"));
                if (o && ("{" != o.substring(0, 1) && (o = "{" + o + "}"), n = new Function("return " + o)()), u.map(["width", "height", "left", "top", "minWidth", "maxWidth", "minHeight", "maxHeight"], function (e) {
                    var t = u.trim(i.style[e] || "");
                    t && (-1 == t.indexOf("%") && (t = parseInt(t) || void 0), n[e] = t)
                }), e) {
                    for (var s = {}, r = 0; r < e.length; r++) {
                        var a = e[r];
                        if ("string" == typeof a) s[a] = t.attr(a);
                        else for (var l in a) {
                            var p = a[l];
                            "boolean" == p ? s[l] = t.attr(l) ? "true" == t.attr(l) : void 0 : "number" == p && (s[l] = "0" == t.attr(l) ? 0 : parseFloat(t.attr(l)) || void 0)
                        }
                    }
                    u.extend(n, s)
                }
                return n
            }
        },
            u(function () {
                var e = u('<div style="position:absolute;top:-1000px;width:100px;height:100px;padding:5px"></div>').appendTo("body");
                u._boxModel = 100 != e.outerWidth(),
                    e.remove(),
                !window.easyloader && u.parser.auto && u.parser.parse()
            }),
            u.fn._outerWidth = function (e) {
                return null == e ? this[0] == window ? this.width() || document.body.clientWidth : this.outerWidth() || 0 : this._size("width", e)
            },
            u.fn._outerHeight = function (e) {
                return null == e ? this[0] == window ? this.height() || document.body.clientHeight : this.outerHeight() || 0 : this._size("height", e)
            },
            u.fn._scrollLeft = function (e) {
                return null == e ? this.scrollLeft() : this.each(function () {
                    u(this).scrollLeft(e)
                })
            },
            u.fn._propAttr = u.fn.prop || u.fn.attr,
            u.fn._size = function (i, n) {
                return "string" == typeof i ? "clear" == i ? this.each(function () {
                    u(this).css({
                        width: "",
                        minWidth: "",
                        maxWidth: "",
                        height: "",
                        minHeight: "",
                        maxHeight: ""
                    })
                }) : "fit" == i ? this.each(function () {
                    o(this, "BODY" == this.tagName ? u("body") : u(this).parent(), !0)
                }) : "unfit" == i ? this.each(function () {
                    o(this, u(this).parent(), !1)
                }) : null == n ? e(this[0], i) : this.each(function () {
                    e(this, i, n)
                }) : this.each(function () {
                    n = n || u(this).parent(),
                        u.extend(i, o(this, n, i.fit) || {});
                    var e = s(this, "width", n, i),
                        t = s(this, "height", n, i);
                    e || t ? u(this).addClass("easyui-fluid") : u(this).removeClass("easyui-fluid")
                });

                function o(e, t, i) {
                    if (!t.length) return !1;
                    var n = u(e)[0],
                        o = t[0],
                        s = o.fcount || 0;
                    return i ? (n.fitted || (n.fitted = !0, o.fcount = s + 1, u(o).addClass("panel-noscroll"), "BODY" == o.tagName && u("html").addClass("panel-fit")), {
                        width: u(o).width() || 1,
                        height: u(o).height() || 1
                    }) : (n.fitted && (n.fitted = !1, o.fcount = s - 1, 0 == o.fcount && (u(o).removeClass("panel-noscroll"), "BODY" == o.tagName && u("html").removeClass("panel-fit"))), !1)
                }
                function s(e, t, i, n) {
                    var o = u(e),
                        s = t,
                        r = s.substr(0, 1).toUpperCase() + s.substr(1),
                        a = u.parser.parseValue("min" + r, n["min" + r], i),
                        l = u.parser.parseValue("max" + r, n["max" + r], i),
                        p = u.parser.parseValue(s, n[s], i),
                        d = 0 <= String(n[s] || "").indexOf("%");
                    if (isNaN(p)) o._size(s, ""),
                        o._size("min" + r, a),
                        o._size("max" + r, l);
                    else {
                        var c = Math.min(Math.max(p, a || 0), l || 99999);
                        d || (n[s] = c),
                            o._size("min" + r, ""),
                            o._size("max" + r, ""),
                            o._size(s, c)
                    }
                    return d || n.fit
                }
                function e(e, t, i) {
                    var n = u(e);
                    if (null == i) {
                        if (i = parseInt(e.style[t]), isNaN(i)) return;
                        return u._boxModel && (i += o()),
                            i
                    }
                    function o() {
                        return 0 <= t.toLowerCase().indexOf("width") ? n.outerWidth() - n.width() : n.outerHeight() - n.height()
                    }
                    "" === i ? n.css(t, "") : (u._boxModel && (i -= o()) < 0 && (i = 0), n.css(t, i + "px"))
                }
            }
    }(jQuery),


    function (o) {
        var t = null,
            i = !1;

        function n(e, t, i) {
            var n = new o.Event(t);
            n.pageX = e.changedTouches[0].pageX,
                n.pageY = e.changedTouches[0].pageY,
                n.which = i || 1,
                o(e.target).trigger(n)
        }
        document.addEventListener && (document.addEventListener("touchstart", function (e) {
            1 == e.touches.length && (i ? (clearTimeout(dblClickTimer), i = !1, n(e, "dblclick")) : (i = !0, dblClickTimer = setTimeout(function () {
                i = !1
            }, 500)), t = setTimeout(function () {
                n(e, "contextmenu", 3)
            }, 1e3), n(e, "mousedown"), (o.fn.draggable.isDragging || o.fn.resizable.isResizing) && e.preventDefault())
        }, !0), document.addEventListener("touchmove", function (e) {
            1 == e.touches.length && (t && clearTimeout(t), n(e, "mousemove"), (o.fn.draggable.isDragging || o.fn.resizable.isResizing) && e.preventDefault())
        }, !0), document.addEventListener("touchend", function (e) {
            t && clearTimeout(t),
                n(e, "mouseup"),
            (o.fn.draggable.isDragging || o.fn.resizable.isResizing) && e.preventDefault()
        }, !0))
    }(jQuery),


    function (c) {
        c.fn.resizable = function (t, e) {
            if ("string" == typeof t) return c.fn.resizable.methods[t](this, e);

            function i(e) {
                var t = e.data,
                    i = c.data(t.target, "resizable").options;
                if (-1 != t.dir.indexOf("e")) {
                    var n = t.startWidth + e.pageX - t.startX;
                    n = Math.min(Math.max(n, i.minWidth), i.maxWidth),
                        t.width = n
                }
                if (-1 != t.dir.indexOf("s")) {
                    var o = t.startHeight + e.pageY - t.startY;
                    o = Math.min(Math.max(o, i.minHeight), i.maxHeight),
                        t.height = o
                }
                if (-1 != t.dir.indexOf("w")) {
                    n = t.startWidth - e.pageX + t.startX;
                    n = Math.min(Math.max(n, i.minWidth), i.maxWidth),
                        t.width = n,
                        t.left = t.startLeft + t.startWidth - t.width
                }
                if (-1 != t.dir.indexOf("n")) {
                    o = t.startHeight - e.pageY + t.startY;
                    o = Math.min(Math.max(o, i.minHeight), i.maxHeight),
                        t.height = o,
                        t.top = t.startTop + t.startHeight - t.height
                }
            }
            function n(e) {
                var t = e.data,
                    i = c(t.target);
                i.css({
                    left: t.left,
                    top: t.top
                }),
                i.outerWidth() != t.width && i._outerWidth(t.width),
                i.outerHeight() != t.height && i._outerHeight(t.height)
            }
            function s(e) {
                return c.fn.resizable.isResizing = !0,
                    c.data(e.data.target, "resizable").options.onStartResize.call(e.data.target, e),
                    !1
            }
            function r(e) {
                return i(e),
                0 != c.data(e.data.target, "resizable").options.onResize.call(e.data.target, e) && n(e),
                    !1
            }
            function a(e) {
                return c.fn.resizable.isResizing = !1,
                    i(e),
                    n(e),
                    c.data(e.data.target, "resizable").options.onStopResize.call(e.data.target, e),
                    c(document).unbind(".resizable"),
                    c("body").css("cursor", ""),
                    !1
            }
            return this.each(function () {
                var d = null,
                    e = c.data(this, "resizable");

                function o(e) {
                    var t = c(e.data.target),
                        i = "",
                        n = t.offset(),
                        o = t.outerWidth(),
                        s = t.outerHeight(),
                        r = d.edge;
                    e.pageY > n.top && e.pageY < n.top + r ? i += "n" : e.pageY < n.top + s && e.pageY > n.top + s - r && (i += "s"),
                        e.pageX > n.left && e.pageX < n.left + r ? i += "w" : e.pageX < n.left + o && e.pageX > n.left + o - r && (i += "e");
                    for (var a = d.handles.split(","), l = 0; l < a.length; l++) {
                        var p = a[l].replace(/(^\s*)|(\s*$)/g, "");
                        if ("all" == p || p == i) return i
                    }
                    return ""
                }
                e ? (c(this).unbind(".resizable"), d = c.extend(e.options, t || {})) : (d = c.extend({}, c.fn.resizable.defaults, c.fn.resizable.parseOptions(this), t || {}), c.data(this, "resizable", {
                    options: d
                })),
                1 != d.disabled && c(this).bind("mousemove.resizable", {
                    target: this
                }, function (e) {
                    if (!c.fn.resizable.isResizing) {
                        var t = o(e);
                        "" == t ? c(e.data.target).css("cursor", "") : c(e.data.target).css("cursor", t + "-resize")
                    }
                }).bind("mouseleave.resizable", {
                    target: this
                }, function (e) {
                    c(e.data.target).css("cursor", "")
                }).bind("mousedown.resizable", {
                    target: this
                }, function (i) {
                    var e = o(i);
                    if ("" != e) {
                        var t = {
                            target: i.data.target,
                            dir: e,
                            startLeft: n("left"),
                            startTop: n("top"),
                            left: n("left"),
                            top: n("top"),
                            startX: i.pageX,
                            startY: i.pageY,
                            startWidth: c(i.data.target).outerWidth(),
                            startHeight: c(i.data.target).outerHeight(),
                            width: c(i.data.target).outerWidth(),
                            height: c(i.data.target).outerHeight(),
                            deltaWidth: c(i.data.target).outerWidth() - c(i.data.target).width(),
                            deltaHeight: c(i.data.target).outerHeight() - c(i.data.target).height()
                        };
                        c(document).bind("mousedown.resizable", t, s),
                            c(document).bind("mousemove.resizable", t, r),
                            c(document).bind("mouseup.resizable", t, a),
                            c("body").css("cursor", e + "-resize")
                    }
                    function n(e) {
                        var t = parseInt(c(i.data.target).css(e));
                        return isNaN(t) ? 0 : t
                    }
                })
            })
        },
            c.fn.resizable.methods = {
                options: function (e) {
                    return c.data(e[0], "resizable").options
                },
                enable: function (e) {
                    return e.each(function () {
                        c(this).resizable({
                            disabled: !1
                        })
                    })
                },
                disable: function (e) {
                    return e.each(function () {
                        c(this).resizable({
                            disabled: !0
                        })
                    })
                }
            },
            c.fn.resizable.parseOptions = function (e) {
                var t = c(e);
                return c.extend({}, c.parser.parseOptions(e, ["handles", {
                    minWidth: "number",
                    minHeight: "number",
                    maxWidth: "number",
                    maxHeight: "number",
                    edge: "number"
                }]), {
                    disabled: !! t.attr("disabled") || void 0
                })
            },
            c.fn.resizable.defaults = {
                disabled: !1,
                handles: "n, e, s, w, ne, se, sw, nw, all",
                minWidth: 10,
                minHeight: 10,
                maxWidth: 1e4,
                maxHeight: 1e4,
                edge: 5,
                onStartResize: function (e) {},
                onResize: function (e) {},
                onStopResize: function (e) {}
            },
            c.fn.resizable.isResizing = !1
    }(jQuery),


    function ($) {
        function _1(e) {
            e._remove()
        }
        function _3(e, t) {
            var i = $.data(e, "panel"),
                n = i.options,
                o = i.panel,
                s = o.children("div.panel-header"),
                r = o.children("div.panel-body"),
                a = o.children("div.panel-footer");
            if (t && $.extend(n, {
                width: t.width,
                height: t.height,
                minWidth: t.minWidth,
                maxWidth: t.maxWidth,
                minHeight: t.minHeight,
                maxHeight: t.maxHeight,
                left: t.left,
                top: t.top
            }), o._size(n), s.add(r)._outerWidth(o.width()), isNaN(parseInt(n.height))) {
                r.css("height", "");
                var l = $.parser.parseValue("minHeight", n.minHeight, o.parent()),
                    p = $.parser.parseValue("maxHeight", n.maxHeight, o.parent()),
                    d = s._outerHeight() + a._outerHeight() + o._outerHeight() - o.height();
                r._size("minHeight", l ? l - d : ""),
                    r._size("maxHeight", p ? p - d : "")
            } else r._outerHeight(o.height() - s._outerHeight() - a._outerHeight());
            o.css({
                height: "",
                minHeight: "",
                maxHeight: "",
                left: n.left,
                top: n.top
            }),
                n.onResize.apply(e, [n.width, n.height]),
                $(e).panel("doLayout")
        }
        function _f(e, t) {
            var i = $.data(e, "panel").options,
                n = $.data(e, "panel").panel;
            t && (null != t.left && (i.left = t.left), null != t.top && (i.top = t.top)),
                n.css({
                    left: i.left,
                    top: i.top
                }),
                i.onMove.apply(e, [i.left, i.top])
        }
        function _14(i) {
            $(i).addClass("panel-body")._size("clear");
            var e = $('<div class="panel"></div>').insertBefore(i);
            return e[0].appendChild(i),
                e.bind("_resize", function (e, t) {
                    return ($(this).hasClass("easyui-fluid") || t) && _3(i),
                        !1
                }),
                e
        }
        function _18(_19) {
            var _1a = $.data(_19, "panel"),
                _1b = _1a.options,
                _1c = _1a.panel;
            _1c.css(_1b.style),
                _1c.addClass(_1b.cls),
                _1d(),
                _1e();
            var _1f = $(_19).panel("header"),
                _20 = $(_19).panel("body"),
                _21 = $(_19).siblings("div.panel-footer");

            function _1d() {
                if (_1b.tools && "string" == typeof _1b.tools && _1c.find(">div.panel-header>div.panel-tool .panel-tool-a").appendTo(_1b.tools), _1(_1c.children("div.panel-header")), _1b.title && !_1b.noheader) {
                    var _22 = $('<div class="panel-header"></div>').prependTo(_1c),
                        _23 = $('<div class="panel-title"></div>').html(_1b.title).appendTo(_22);
                    _1b.iconCls && (_23.addClass("panel-with-icon"), $('<div class="panel-icon"></div>').addClass(_1b.iconCls).appendTo(_22));
                    var _24 = $('<div class="panel-tool"></div>').appendTo(_22);
                    if (_24.bind("click", function (e) {
                        e.stopPropagation()
                    }), _1b.tools) if ($.isArray(_1b.tools)) for (var i = 0; i < _1b.tools.length; i++) {
                        var t = $('<a href="javascript:void(0)"></a>').addClass(_1b.tools[i].iconCls).appendTo(_24);
                        _1b.tools[i].handler && t.bind("click", eval(_1b.tools[i].handler))
                    } else $(_1b.tools).children().each(function () {
                        $(this).addClass($(this).attr("iconCls")).addClass("panel-tool-a").appendTo(_24)
                    });
                    _1b.collapsible && $('<a class="panel-tool-collapse" href="javascript:void(0)"></a>').appendTo(_24).bind("click", function () {
                        return 1 == _1b.collapsed ? _4a(_19, !0) : _38(_19, !0),
                            !1
                    }),
                    _1b.minimizable && $('<a class="panel-tool-min" href="javascript:void(0)"></a>').appendTo(_24).bind("click", function () {
                        return _55(_19),
                            !1
                    }),
                    _1b.maximizable && $('<a class="panel-tool-max" href="javascript:void(0)"></a>').appendTo(_24).bind("click", function () {
                        return 1 == _1b.maximized ? _59(_19) : _37(_19),
                            !1
                    }),
                    _1b.closable && $('<a class="panel-tool-close" href="javascript:void(0)"></a>').appendTo(_24).bind("click", function () {
                        return _39(_19),
                            !1
                    }),
                        _1c.children("div.panel-body").removeClass("panel-body-noheader")
                } else _1c.children("div.panel-body").addClass("panel-body-noheader")
            }
            function _1e() {
                _1b.footer ? ($(_1b.footer).addClass("panel-footer").appendTo(_1c), $(_19).addClass("panel-body-nobottom")) : (_1c.children("div.panel-footer").remove(), $(_19).removeClass("panel-body-nobottom"))
            }
            _1b.border ? (_1f.removeClass("panel-header-noborder"), _20.removeClass("panel-body-noborder"), _21.removeClass("panel-footer-noborder")) : (_1f.addClass("panel-header-noborder"), _20.addClass("panel-body-noborder"), _21.addClass("panel-footer-noborder")),
                _1f.addClass(_1b.headerCls),
                _20.addClass(_1b.bodyCls),
                $(_19).attr("id", _1b.id || ""),
            _1b.content && ($(_19).panel("clear"), $(_19).html(_1b.content), $.parser.parse($(_19)))
        }
        function _25(i, e) {
            var n = $.data(i, "panel"),
                o = n.options;
            if (t && (o.queryParams = e), o.href && (!n.isLoaded || !o.cache)) {
                var t = $.extend({}, o.queryParams);
                if (0 == o.onBeforeLoad.call(i, t)) return;
                n.isLoaded = !1,
                    $(i).panel("clear"),
                o.loadingMessage && $(i).html($('<div class="panel-loading"></div>').html(o.loadingMessage)),
                    o.loader.call(i, t, function (e) {
                        var t = o.extractor.call(i, e);
                        $(i).html(t),
                            $.parser.parse($(i)),
                            o.onLoad.apply(i, arguments),
                            n.isLoaded = !0
                    }, function () {
                        o.onLoadError.apply(i, arguments)
                    })
            }
        }
        function _2d(e) {
            var t = $(e);
            t.find(".combo-f").each(function () {
                $(this).combo("destroy")
            }),
                t.find(".m-btn").each(function () {
                    $(this).menubutton("destroy")
                }),
                t.find(".s-btn").each(function () {
                    $(this).splitbutton("destroy")
                }),
                t.find(".tooltip-f").each(function () {
                    $(this).tooltip("destroy")
                }),
                t.children("div").each(function () {
                    $(this)._size("unfit")
                }),
                t.empty()
        }
        function _2f(e) {
            $(e).panel("doLayout", !0)
        }
        function _31(e, t) {
            var i = $.data(e, "panel").options,
                n = $.data(e, "panel").panel;
            if (1 == t || 0 != i.onBeforeOpen.call(e)) if (n.stop(!0, !0), $.isFunction(i.openAnimation)) i.openAnimation.call(e, o);
            else switch (i.openAnimation) {
                    case "slide":
                        n.slideDown(i.openDuration, o);
                        break;
                    case "fade":
                        n.fadeIn(i.openDuration, o);
                        break;
                    case "show":
                        n.show(i.openDuration, o);
                        break;
                    default:
                        n.show(),
                            o()
                }
            function o() {
                i.closed = !1,
                    i.minimized = !1,
                n.children("div.panel-header").find("a.panel-tool-restore").length && (i.maximized = !0),
                    i.onOpen.call(e),
                1 == i.maximized && (i.maximized = !1, _37(e)),
                1 == i.collapsed && (i.collapsed = !1, _38(e)),
                i.collapsed || (_25(e), _2f(e))
            }
        }
        function _39(e, t) {
            var i = $.data(e, "panel").options,
                n = $.data(e, "panel").panel;
            if (1 == t || 0 != i.onBeforeClose.call(e)) if (n.stop(!0, !0), n._size("unfit"), $.isFunction(i.closeAnimation)) i.closeAnimation.call(e, o);
            else switch (i.closeAnimation) {
                    case "slide":
                        n.slideUp(i.closeDuration, o);
                        break;
                    case "fade":
                        n.fadeOut(i.closeDuration, o);
                        break;
                    case "hide":
                        n.hide(i.closeDuration, o);
                        break;
                    default:
                        n.hide(),
                            o()
                }
            function o() {
                i.closed = !0,
                    i.onClose.call(e)
            }
        }
        function _3e(e, t) {
            var i = $.data(e, "panel"),
                n = i.options,
                o = i.panel;
            1 != t && 0 == n.onBeforeDestroy.call(e) || ($(e).panel("clear").panel("clear", "footer"), _1(o), n.onDestroy.call(e))
        }
        function _38(e, t) {
            var i = $.data(e, "panel").options,
                n = $.data(e, "panel").panel,
                o = n.children("div.panel-body"),
                s = n.children("div.panel-header").find("a.panel-tool-collapse");
            1 != i.collapsed && (o.stop(!0, !0), 0 != i.onBeforeCollapse.call(e) && (s.addClass("panel-tool-expand"), 1 == t ? o.slideUp("normal", function () {
                i.collapsed = !0,
                    i.onCollapse.call(e)
            }) : (o.hide(), i.collapsed = !0, i.onCollapse.call(e))))
        }
        function _4a(e, t) {
            var i = $.data(e, "panel").options,
                n = $.data(e, "panel").panel,
                o = n.children("div.panel-body"),
                s = n.children("div.panel-header").find("a.panel-tool-collapse");
            0 != i.collapsed && (o.stop(!0, !0), 0 != i.onBeforeExpand.call(e) && (s.removeClass("panel-tool-expand"), 1 == t ? o.slideDown("normal", function () {
                i.collapsed = !1,
                    i.onExpand.call(e),
                    _25(e),
                    _2f(e)
            }) : (o.show(), i.collapsed = !1, i.onExpand.call(e), _25(e), _2f(e))))
        }
        function _37(e) {
            var t = $.data(e, "panel").options,
                i = $.data(e, "panel").panel.children("div.panel-header").find("a.panel-tool-max");
            1 != t.maximized && (i.addClass("panel-tool-restore"), $.data(e, "panel").original || ($.data(e, "panel").original = {
                width: t.width,
                height: t.height,
                left: t.left,
                top: t.top,
                fit: t.fit
            }), t.left = 0, t.top = 0, t.fit = !0, _3(e), t.minimized = !1, t.maximized = !0, t.onMaximize.call(e))
        }
        function _55(e) {
            var t = $.data(e, "panel").options,
                i = $.data(e, "panel").panel;
            i._size("unfit"),
                i.hide(),
                t.minimized = !0,
                t.maximized = !1,
                t.onMinimize.call(e)
        }
        function _59(e) {
            var t = $.data(e, "panel").options,
                i = $.data(e, "panel").panel,
                n = i.children("div.panel-header").find("a.panel-tool-max");
            0 != t.maximized && (i.show(), n.removeClass("panel-tool-restore"), $.extend(t, $.data(e, "panel").original), _3(e), t.minimized = !1, t.maximized = !1, $.data(e, "panel").original = null, t.onRestore.call(e))
        }
        function _5e(e, t) {
            $.data(e, "panel").options.title = t,
                $(e).panel("header").find("div.panel-title").html(t)
        }
        $.fn._remove = function () {
            return this.each(function () {
                $(this).remove();
                try {
                    this.outerHTML = ""
                } catch (e) {}
            })
        };
        var _61 = null;
        $(window).unbind(".panel").bind("resize.panel", function () {
            _61 && clearTimeout(_61),
                _61 = setTimeout(function () {
                    var e = $("body.layout");
                    e.length ? (e.layout("resize"), $("body").children(".easyui-fluid:visible").trigger("_resize")) : $("body").panel("doLayout"),
                        _61 = null
                }, 100)
        }),
            $.fn.panel = function (i, e) {
                return "string" == typeof i ? $.fn.panel.methods[i](this, e) : (i = i || {}, this.each(function () {
                    var e, t = $.data(this, "panel");
                    t ? (e = $.extend(t.options, i), t.isLoaded = !1) : (e = $.extend({}, $.fn.panel.defaults, $.fn.panel.parseOptions(this), i), $(this).attr("title", ""), t = $.data(this, "panel", {
                        options: e,
                        panel: _14(this),
                        isLoaded: !1
                    })),
                        _18(this),
                    1 == e.doSize && (t.panel.css("display", "block"), _3(this)),
                        1 == e.closed || 1 == e.minimized ? t.panel.hide() : _31(this)
                }))
            },
            $.fn.panel.methods = {
                options: function (e) {
                    return $.data(e[0], "panel").options
                },
                panel: function (e) {
                    return $.data(e[0], "panel").panel
                },
                header: function (e) {
                    return $.data(e[0], "panel").panel.find(">div.panel-header")
                },
                footer: function (e) {
                    return e.panel("panel").children(".panel-footer")
                },
                body: function (e) {
                    return $.data(e[0], "panel").panel.find(">div.panel-body")
                },
                setTitle: function (e, t) {
                    return e.each(function () {
                        _5e(this, t)
                    })
                },
                open: function (e, t) {
                    return e.each(function () {
                        _31(this, t)
                    })
                },
                close: function (e, t) {
                    return e.each(function () {
                        _39(this, t)
                    })
                },
                destroy: function (e, t) {
                    return e.each(function () {
                        _3e(this, t)
                    })
                },
                clear: function (e, t) {
                    return e.each(function () {
                        _2d("footer" == t ? $(this).panel("footer") : this)
                    })
                },
                refresh: function (e, t) {
                    return e.each(function () {
                        var e = $.data(this, "panel");
                        e.isLoaded = !1,
                        t && ("string" == typeof t ? e.options.href = t : e.options.queryParams = t),
                            _25(this)
                    })
                },
                resize: function (e, t) {
                    return e.each(function () {
                        _3(this, t)
                    })
                },
                doLayout: function (e, t) {
                    return e.each(function () {
                        function e(n, o) {
                            if (n) {
                                var s = n == $("body")[0];
                                $(n).find("div.panel:visible,div.accordion:visible,div.tabs-container:visible,div.layout:visible,.easyui-fluid:visible").filter(function (e, t) {
                                    var i = $(t).parents("div.panel-" + o + ":first");
                                    return s ? 0 == i.length : i[0] == n
                                }).trigger("_resize", [t || !1])
                            }
                        }
                        e(this, "body"),
                            e($(this).siblings("div.panel-footer")[0], "footer")
                    })
                },
                move: function (e, t) {
                    return e.each(function () {
                        _f(this, t)
                    })
                },
                maximize: function (e) {
                    return e.each(function () {
                        _37(this)
                    })
                },
                minimize: function (e) {
                    return e.each(function () {
                        _55(this)
                    })
                },
                restore: function (e) {
                    return e.each(function () {
                        _59(this)
                    })
                },
                collapse: function (e, t) {
                    return e.each(function () {
                        _38(this, t)
                    })
                },
                expand: function (e, t) {
                    return e.each(function () {
                        _4a(this, t)
                    })
                }
            },
            $.fn.panel.parseOptions = function (e) {
                var t = $(e);
                return $.extend({}, $.parser.parseOptions(e, ["id", "width", "height", "left", "top", "title", "iconCls", "cls", "headerCls", "bodyCls", "tools", "href", "method", {
                    cache: "boolean",
                    fit: "boolean",
                    border: "boolean",
                    noheader: "boolean"
                },
                    {
                        collapsible: "boolean",
                        minimizable: "boolean",
                        maximizable: "boolean"
                    },
                    {
                        closable: "boolean",
                        collapsed: "boolean",
                        minimized: "boolean",
                        maximized: "boolean",
                        closed: "boolean"
                    },
                    "openAnimation", "closeAnimation", {
                        openDuration: "number",
                        closeDuration: "number"
                    }]), {
                    loadingMessage: null != t.attr("loadingMessage") ? t.attr("loadingMessage") : void 0
                })
            },
            $.fn.panel.defaults = {
                id: null,
                title: null,
                iconCls: null,
                width: "auto",
                height: "auto",
                left: null,
                top: null,
                cls: null,
                headerCls: null,
                bodyCls: null,
                style: {},
                href: null,
                cache: !0,
                fit: !1,
                border: !0,
                doSize: !0,
                noheader: !1,
                content: null,
                collapsible: !1,
                minimizable: !1,
                maximizable: !1,
                closable: !1,
                collapsed: !1,
                minimized: !1,
                maximized: !1,
                closed: !1,
                openAnimation: !1,
                openDuration: 400,
                closeAnimation: !1,
                closeDuration: 400,
                tools: null,
                footer: null,
                queryParams: {},
                method: "get",
                href: null,
                loadingMessage: "Loading...",
                loader: function (e, t, i) {
                    var n = $(this).panel("options");
                    if (!n.href) return !1;
                    $.ajax({
                        type: n.method,
                        url: n.href,
                        cache: !1,
                        data: e,
                        dataType: "html",
                        success: function (e) {
                            t(e)
                        },
                        error: function () {
                            i.apply(this, arguments)
                        }
                    })
                },
                extractor: function (e) {
                    var t = /<body[^>]*>((.|[\n\r])*)<\/body>/im.exec(e);
                    return t ? t[1] : e
                },
                onBeforeLoad: function (e) {},
                onLoad: function () {},
                onLoadError: function () {},
                onBeforeOpen: function () {},
                onOpen: function () {},
                onBeforeClose: function () {},
                onClose: function () {},
                onBeforeDestroy: function () {},
                onDestroy: function () {},
                onResize: function (e, t) {},
                onMove: function (e, t) {},
                onMaximize: function () {},
                onRestore: function () {},
                onMinimize: function () {},
                onBeforeCollapse: function () {},
                onBeforeExpand: function () {},
                onCollapse: function () {},
                onExpand: function () {}
            }
    }(jQuery),


    function (u) {
        var h = !1;

        function d(e, t) {
            var i = u.data(e, "layout"),
                n = i.options,
                o = i.panels,
                s = u(e);
            t && u.extend(n, {
                width: t.width,
                height: t.height
            }),
                "body" == e.tagName.toLowerCase() ? s._size("fit") : s._size(n);
            var r = {
                top: 0,
                left: 0,
                width: s.width(),
                height: s.height()
            };

            function a(e, t) {
                if (e.length && f(e)) {
                    var i = e.panel("options");
                    e.panel("resize", {
                        width: s.width(),
                        height: i.height
                    });
                    var n = e.panel("panel").outerHeight();
                    e.panel("move", {
                        left: 0,
                        top: "n" == t ? 0 : s.height() - n
                    }),
                        r.height -= n,
                    "n" == t && (r.top += n, !i.split && i.border && r.top--),
                    !i.split && i.border && r.height++
                }
            }
            function l(e, t) {
                if (e.length && f(e)) {
                    var i = e.panel("options");
                    e.panel("resize", {
                        width: i.width,
                        height: r.height
                    });
                    var n = e.panel("panel").outerWidth();
                    e.panel("move", {
                        left: "e" == t ? s.width() - n : 0,
                        top: r.top
                    }),
                        r.width -= n,
                    "w" == t && (r.left += n, !i.split && i.border && r.left--),
                    !i.split && i.border && r.width++
                }
            }
            a(f(o.expandNorth) ? o.expandNorth : o.north, "n"),
                a(f(o.expandSouth) ? o.expandSouth : o.south, "s"),
                l(f(o.expandEast) ? o.expandEast : o.east, "e"),
                l(f(o.expandWest) ? o.expandWest : o.west, "w"),
                o.center.panel("resize", r)
        }
        function s(o, e, t) {
            e.region = e.region || "center";
            var i = u.data(o, "layout").panels,
                n = u(o),
                s = e.region;
            if (!i[s].length) {
                var r = u(t);
                r.length || (r = u("<div></div>").appendTo(n));
                var a = u.extend({}, u.fn.layout.paneldefaults, {
                    width: r.length ? parseInt(r[0].style.width) || r.outerWidth() : "auto",
                    height: r.length ? parseInt(r[0].style.height) || r.outerHeight() : "auto",
                    doSize: !1,
                    collapsible: !0,
                    cls: "layout-panel layout-panel-" + s,
                    bodyCls: "layout-body",
                    onOpen: function () {
                        var e = u(this).panel("header").children("div.panel-tool");
                        e.children("a.panel-tool-collapse").hide();
                        var t = {
                            north: "up",
                            south: "down",
                            east: "right",
                            west: "left"
                        };
                        if (t[s]) {
                            var i = "layout-button-" + t[s],
                                n = e.children("a." + i);
                            n.length || (n = u('<a href="javascript:void(0)"></a>').addClass(i).appendTo(e)).bind("click", {
                                dir: s
                            }, function (e) {
                                return m(o, e.data.dir),
                                    !1
                            }),
                                u(this).panel("options").collapsible ? n.show() : n.hide()
                        }
                    }
                }, e);
                if (r.panel(a), (i[s] = r).panel("options").split) {
                    var l = r.panel("panel");
                    l.addClass("layout-split-" + s);
                    var p = "";
                    "north" == s && (p = "s"),
                    "south" == s && (p = "n"),
                    "east" == s && (p = "w"),
                    "west" == s && (p = "e"),
                        l.resizable(u.extend({}, {
                            handles: p,
                            onStartResize: function (e) {
                                if (h = !0, "north" == s || "south" == s) var t = u(">div.layout-split-proxy-v", o);
                                else t = u(">div.layout-split-proxy-h", o);
                                var i = {
                                    display: "block"
                                };
                                "north" == s ? (i.top = parseInt(l.css("top")) + l.outerHeight() - t.height(), i.left = parseInt(l.css("left")), i.width = l.outerWidth(), i.height = t.height()) : "south" == s ? (i.top = parseInt(l.css("top")), i.left = parseInt(l.css("left")), i.width = l.outerWidth(), i.height = t.height()) : "east" == s ? (i.top = parseInt(l.css("top")) || 0, i.left = parseInt(l.css("left")) || 0, i.width = t.width(), i.height = l.outerHeight()) : "west" == s && (i.top = parseInt(l.css("top")) || 0, i.left = l.outerWidth() - t.width(), i.width = t.width(), i.height = l.outerHeight()),
                                    t.css(i),
                                    u('<div class="layout-mask"></div>').css({
                                        left: 0,
                                        top: 0,
                                        width: n.width(),
                                        height: n.height()
                                    }).appendTo(n)
                            },
                            onResize: function (e) {
                                var t;
                                "north" == s || "south" == s ? (t = u(">div.layout-split-proxy-v", o)).css("top", e.pageY - u(o).offset().top - t.height() / 2) : (t = u(">div.layout-split-proxy-h", o)).css("left", e.pageX - u(o).offset().left - t.width() / 2);
                                return !1
                            },
                            onStopResize: function (e) {
                                n.children("div.layout-split-proxy-v,div.layout-split-proxy-h").hide(),
                                    r.panel("resize", e.data),
                                    d(o),
                                    h = !1,
                                    n.find(">div.layout-mask").remove()
                            }
                        }, e))
                }
            }
        }
        function m(a, l, e) {
            null == e && (e = "normal");
            var p = u.data(a, "layout").panels,
                d = p[l],
                c = d.panel("options");
            if (0 != c.onBeforeCollapse.call(d)) {
                var t = "expand" + l.substring(0, 1).toUpperCase() + l.substring(1);
                p[t] || (p[t] = function (e) {
                    var t;
                    "east" == e ? t = "layout-button-left" : "west" == e ? t = "layout-button-right" : "north" == e ? t = "layout-button-down" : "south" == e && (t = "layout-button-up");
                    var i = u("<div></div>").appendTo(a);
                    return i.panel(u.extend({}, u.fn.layout.paneldefaults, {
                        cls: "layout-expand layout-expand-" + e,
                        title: "&nbsp;",
                        closed: !0,
                        minWidth: 0,
                        minHeight: 0,
                        doSize: !1,
                        tools: [{
                            iconCls: t,
                            handler: function () {
                                return o(a, l),
                                    !1
                            }
                        }]
                    })),
                        i.panel("panel").hover(function () {
                            u(this).addClass("layout-expand-over")
                        }, function () {
                            u(this).removeClass("layout-expand-over")
                        }),
                        i
                }(l), p[t].panel("panel").bind("click", function () {
                    d.panel("expand", !1).panel("open");
                    var e = n();
                    return d.panel("resize", e.collapse),
                        d.panel("panel").animate(e.expand, function () {
                            u(this).unbind(".layout").bind("mouseleave.layout", {
                                region: l
                            }, function (e) {
                                1 != h && (u("body>div.combo-p>div.combo-panel:visible").length || m(a, e.data.region))
                            })
                        }),
                        !1
                }));
                var i = n();
                f(p[t]) || p.center.panel("resize", i.resizeC),
                    d.panel("panel").animate(i.collapse, e, function () {
                        d.panel("collapse", !1).panel("close"),
                            p[t].panel("open").panel("resize", i.expandP),
                            u(this).unbind(".layout")
                    })
            }
            function n() {
                var e = u(a),
                    t = p.center.panel("options"),
                    i = c.collapsedSize;
                if ("east" == l) {
                    var n = d.panel("panel")._outerWidth(),
                        o = t.width + n - i;
                    return !c.split && c.border || o++,
                        {
                            resizeC: {
                                width: o
                            },
                            expand: {
                                left: e.width() - n
                            },
                            expandP: {
                                top: t.top,
                                left: e.width() - i,
                                width: i,
                                height: t.height
                            },
                            collapse: {
                                left: e.width(),
                                top: t.top,
                                height: t.height
                            }
                        }
                }
                if ("west" == l) {
                    n = d.panel("panel")._outerWidth(),
                        o = t.width + n - i;
                    return !c.split && c.border || o++,
                        {
                            resizeC: {
                                width: o,
                                left: i - 1
                            },
                            expand: {
                                left: 0
                            },
                            expandP: {
                                left: 0,
                                top: t.top,
                                width: i,
                                height: t.height
                            },
                            collapse: {
                                left: -n,
                                top: t.top,
                                height: t.height
                            }
                        }
                }
                if ("north" == l) {
                    var s = d.panel("panel")._outerHeight(),
                        r = t.height;
                    return f(p.expandNorth) || (r += s - i + (c.split || !c.border ? 1 : 0)),
                        p.east.add(p.west).add(p.expandEast).add(p.expandWest).panel("resize", {
                            top: i - 1,
                            height: r
                        }),
                        {
                            resizeC: {
                                top: i - 1,
                                height: r
                            },
                            expand: {
                                top: 0
                            },
                            expandP: {
                                top: 0,
                                left: 0,
                                width: e.width(),
                                height: i
                            },
                            collapse: {
                                top: -s,
                                width: e.width()
                            }
                        }
                }
                if ("south" == l) {
                    s = d.panel("panel")._outerHeight(),
                        r = t.height;
                    return f(p.expandSouth) || (r += s - i + (c.split || !c.border ? 1 : 0)),
                        p.east.add(p.west).add(p.expandEast).add(p.expandWest).panel("resize", {
                            height: r
                        }),
                        {
                            resizeC: {
                                height: r
                            },
                            expand: {
                                top: e.height() - s
                            },
                            expandP: {
                                top: e.height() - i,
                                left: 0,
                                width: e.width(),
                                height: i
                            },
                            collapse: {
                                top: e.height(),
                                width: e.width()
                            }
                        }
                }
            }
        }
        function o(i, n) {
            var o = u.data(i, "layout").panels,
                s = o[n];
            if (0 != s.panel("options").onBeforeExpand.call(s)) {
                var e = "expand" + n.substring(0, 1).toUpperCase() + n.substring(1);
                if (o[e]) {
                    o[e].panel("close"),
                        s.panel("panel").stop(!0, !0),
                        s.panel("expand", !1).panel("open");
                    var t = function () {
                        var e = u(i),
                            t = o.center.panel("options"); {
                            if ("east" == n && o.expandEast) return {
                                collapse: {
                                    left: e.width(),
                                    top: t.top,
                                    height: t.height
                                },
                                expand: {
                                    left: e.width() - s.panel("panel")._outerWidth()
                                }
                            };
                            if ("west" == n && o.expandWest) return {
                                collapse: {
                                    left: -s.panel("panel")._outerWidth(),
                                    top: t.top,
                                    height: t.height
                                },
                                expand: {
                                    left: 0
                                }
                            };
                            if ("north" == n && o.expandNorth) return {
                                collapse: {
                                    top: -s.panel("panel")._outerHeight(),
                                    width: e.width()
                                },
                                expand: {
                                    top: 0
                                }
                            };
                            if ("south" == n && o.expandSouth) return {
                                collapse: {
                                    top: e.height(),
                                    width: e.width()
                                },
                                expand: {
                                    top: e.height() - s.panel("panel")._outerHeight()
                                }
                            }
                        }
                    }();
                    s.panel("resize", t.collapse),
                        s.panel("panel").animate(t.expand, function () {
                            d(i)
                        })
                }
            }
        }
        function f(e) {
            return !!e && ( !! e.length && e.panel("panel").is(":visible"))
        }
        u.fn.layout = function (o, e) {
            return "string" == typeof o ? u.fn.layout.methods[o](this, e) : (o = o || {}, this.each(function () {
                var e, t, i = u.data(this, "layout");
                if (i) u.extend(i.options, o);
                else {
                    var n = u.extend({}, u.fn.layout.defaults, u.fn.layout.parseOptions(this), o);
                    u.data(this, "layout", {
                        options: n,
                        panels: {
                            center: u(),
                            north: u(),
                            south: u(),
                            east: u(),
                            west: u()
                        }
                    }),


                        function (i) {
                            var e = u(i);

                            function t(e) {
                                e.children("div").each(function () {
                                    var e = u.fn.layout.parsePanelOptions(this);
                                    0 <= "north,south,east,west,center".indexOf(e.region) && s(i, e, this)
                                })
                            }
                            e.addClass("layout"),
                                e.children("form").length ? t(e.children("form")) : t(e),
                                e.append('<div class="layout-split-proxy-h"></div><div class="layout-split-proxy-v"></div>'),
                                e.bind("_resize", function (e, t) {
                                    return (u(this).hasClass("easyui-fluid") || t) && d(i),
                                        !1
                                })
                        }(this)
                }
                d(this),
                    e = this,
                (t = u.data(e, "layout").panels).east.length && t.east.panel("options").collapsed && m(e, "east", 0),
                t.west.length && t.west.panel("options").collapsed && m(e, "west", 0),
                t.north.length && t.north.panel("options").collapsed && m(e, "north", 0),
                t.south.length && t.south.panel("options").collapsed && m(e, "south", 0)
            }))
        },
            u.fn.layout.methods = {
                options: function (e) {
                    return u.data(e[0], "layout").options
                },
                resize: function (e, t) {
                    return e.each(function () {
                        d(this, t)
                    })
                },
                panel: function (e, t) {
                    return u.data(e[0], "layout").panels[t]
                },
                collapse: function (e, t) {
                    return e.each(function () {
                        m(this, t)
                    })
                },
                expand: function (e, t) {
                    return e.each(function () {
                        o(this, t)
                    })
                },
                add: function (e, t) {
                    return e.each(function () {
                        s(this, t),
                            d(this),
                        u(this).layout("panel", t.region).panel("options").collapsed && m(this, t.region, 0)
                    })
                },
                remove: function (e, t) {
                    return e.each(function () {
                        !
                            function (e, t) {
                                var i = u.data(e, "layout").panels;
                                if (i[t].length) {
                                    i[t].panel("destroy"),
                                        i[t] = u();
                                    var n = "expand" + t.substring(0, 1).toUpperCase() + t.substring(1);
                                    i[n] && (i[n].panel("destroy"), i[n] = void 0)
                                }
                            }(this, t),
                            d(this)
                    })
                }
            },
            u.fn.layout.parseOptions = function (e) {
                return u.extend({}, u.parser.parseOptions(e, [{
                    fit: "boolean"
                }]))
            },
            u.fn.layout.defaults = {
                fit: !1
            },
            u.fn.layout.parsePanelOptions = function (e) {
                u(e);
                return u.extend({}, u.fn.panel.parseOptions(e), u.parser.parseOptions(e, ["region", {
                    split: "boolean",
                    collpasedSize: "number",
                    minWidth: "number",
                    minHeight: "number",
                    maxWidth: "number",
                    maxHeight: "number"
                }]))
            },
            u.fn.layout.paneldefaults = u.extend({}, u.fn.panel.defaults, {
                region: null,
                split: !1,
                collapsedSize: 28,
                minWidth: 10,
                minHeight: 10,
                maxWidth: 1e4,
                maxHeight: 1e4
            })
    }(jQuery),


    function (be, Ne, Re) {
        var e;
        e = function (E) {
            var h, e, v, t, g, C = !0,
                x = !1,
                y = null,
                P = "x",
                _ = "y",
                D = "width",
                L = "height",
                $ = "top",
                k = "left",
                A = "bottom",
                M = "right",
                X = "center",
                Y = "flipinvert",
                F = "shift",
                w = {},
                B = "qtip",
                m = "data-hasqtip",
                d = "data-qtip-id",
                i = ["ui-widget", "ui-tooltip"],
                I = "." + B,
                n = "click dblclick mousedown mouseup mousemove mouseleave mouseenter".split(" "),
                u = B + "-fixed",
                c = B + "-default",
                r = B + "-focus",
                s = B + "-hover",
                f = B + "-disabled",
                o = "_replacedByqTip",
                S = "oldtitle",
                T = {
                    ie: function () {
                        for (var e = 3, t = Ne.createElement("div");
                             (t.innerHTML = "\x3c!--[if gt IE " + ++e + "]><i></i><![endif]--\x3e") && t.getElementsByTagName("i")[0];);
                        return 4 < e ? e : NaN
                    }(),
                    iOS: parseFloat(("" + (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [0, ""])[1]).replace("undefined", "3_2").replace("_", ".").replace("_", "")) || x
                };

            function O(e, t, i, n) {
                this.id = i,
                    this.target = e,
                    this.tooltip = y,
                    this.elements = {
                        target: e
                    },
                    this._id = B + "-" + i,
                    this.timers = {
                        img: {}
                    },
                    this.options = t,
                    this.plugins = {},
                    this.cache = {
                        event: {},
                        target: E(),
                        disabled: x,
                        attr: n,
                        onTooltip: x,
                        lastClass: ""
                    },
                    this.rendered = this.destroyed = this.disabled = this.waiting = this.hiddenDuringWait = this.positioning = this.triggering = x
            }
            function a(e) {
                return e === y || "object" !== E.type(e)
            }
            function l(e) {
                return !(E.isFunction(e) || e && e.attr || e.length || "object" === E.type(e) && (e.jquery || e.then))
            }
            function b(e) {
                var t, o, s, r;
                return a(e) ? x : (a(e.metadata) && (e.metadata = {
                    type: e.metadata
                }), "content" in e && (a(t = e.content) || t.jquery || t.done ? t = e.content = {
                    text: o = l(t) ? x : t
                } : o = t.text, "ajax" in t && (s = t.ajax, r = s && s.once !== x, delete t.ajax, t.text = function (e, n) {
                    var t = o || E(this).attr(n.options.content.attr) || "Loading...",
                        i = E.ajax(E.extend({}, s, {
                            context: n
                        })).then(s.success, y, s.error).then(function (e) {
                            return e && r && n.set("content.text", e),
                                e
                        }, function (e, t, i) {
                            n.destroyed || 0 === e.status || n.set("content.text", t + ": " + i)
                        });
                    return r ? t : (n.set("content.text", t), i)
                }), "title" in t && (a(t.title) || (t.button = t.title.button, t.title = t.title.text), l(t.title || x) && (t.title = x))), "position" in e && a(e.position) && (e.position = {
                    my: e.position,
                    at: e.position
                }), "show" in e && a(e.show) && (e.show = e.show.jquery ? {
                    target: e.show
                } : e.show === C ? {
                    ready: C
                } : {
                    event: e.show
                }), "hide" in e && a(e.hide) && (e.hide = e.hide.jquery ? {
                    target: e.hide
                } : {
                    event: e.hide
                }), "style" in e && a(e.style) && (e.style = {
                    classes: e.style
                }), E.each(w, function () {
                    this.sanitize && this.sanitize(e)
                }), e)
            }
            function p(e, t) {
                for (var i, n = 0, o = e, s = t.split("."); o = o[s[n++]];) n < s.length && (i = o);
                return [i || e, s.pop()]
            }
            function N(e, t) {
                var i, n, o;
                for (i in this.checks) for (n in this.checks[i])(o = new RegExp(n, "i").exec(e)) && (t.push(o), ("builtin" === i || this.plugins[i]) && this.checks[i][n].apply(this.plugins[i] || this, t))
            }(e = O.prototype)._when = function (e) {
                return E.when.apply(E, e)
            },
                e.render = function (e) {
                    if (this.rendered || this.destroyed) return this;
                    var i = this,
                        t = this.options,
                        n = this.cache,
                        o = this.elements,
                        s = t.content.text,
                        r = t.content.title,
                        a = t.content.button,
                        l = t.position,
                        p = (this._id, []);
                    return E.attr(this.target[0], "aria-describedby", this._id),
                        this.tooltip = o.tooltip = E("<div/>", {
                            id: this._id,
                            class: [B, c, t.style.classes, B + "-pos-" + t.position.my.abbrev()].join(" "),
                            width: t.style.width || "",
                            height: t.style.height || "",
                            tracking: "mouse" === l.target && l.adjust.mouse,
                            role: "alert",
                            "aria-live": "polite",
                            "aria-atomic": x,
                            "aria-describedby": this._id + "-content",
                            "aria-hidden": C
                        }).toggleClass(f, this.disabled).attr(d, this.id).data(B, this).appendTo(l.container).append(o.content = E("<div />", {
                            class: B + "-content",
                            id: this._id + "-content",
                            "aria-atomic": C
                        })),
                        this.rendered = -1,
                        this.positioning = C,
                    r && (this._createTitle(), E.isFunction(r) || p.push(this._updateTitle(r, x))),
                    a && this._createButton(),
                    E.isFunction(s) || p.push(this._updateContent(s, x)),
                        this.rendered = C,
                        this._setWidget(),
                        E.each(w, function (e) {
                            var t;
                            "render" === this.initialize && (t = this(i)) && (i.plugins[e] = t)
                        }),
                        this._unassignEvents(),
                        this._assignEvents(),
                        this._when(p).then(function () {
                            i._trigger("render"),
                                i.positioning = x,
                            i.hiddenDuringWait || !t.show.ready && !e || i.toggle(C, n.event, x),
                                i.hiddenDuringWait = x
                        }),
                        h.api[this.id] = this
                },
                e.destroy = function (e) {
                    if (this.destroyed) return this.target;

                    function t() {
                        if (!this.destroyed) {
                            this.destroyed = C;
                            var e = this.target,
                                t = e.attr(S);
                            this.rendered && this.tooltip.stop(1, 0).find("*").remove().end().remove(),
                                E.each(this.plugins, function (e) {
                                    this.destroy && this.destroy()
                                }),
                                clearTimeout(this.timers.show),
                                clearTimeout(this.timers.hide),
                                this._unassignEvents(),
                                e.removeData(B).removeAttr(d).removeAttr(m).removeAttr("aria-describedby"),
                            this.options.suppress && t && e.attr("title", t).removeAttr(S),
                                this._unbind(e),
                                this.options = this.elements = this.cache = this.timers = this.plugins = this.mouse = y,
                                delete h.api[this.id]
                        }
                    }
                    return e === C && "hide" !== this.triggering || !this.rendered ? t.call(this) : (this.tooltip.one("tooltiphidden", E.proxy(t, this)), !this.triggering && this.hide()),
                        this.target
                },
                t = e.checks = {
                    builtin: {
                        "^id$": function (e, t, i, n) {
                            var o = i === C ? h.nextid : i,
                                s = B + "-" + o;
                            o !== x && 0 < o.length && !E("#" + s).length ? (this._id = s, this.rendered && (this.tooltip[0].id = this._id, this.elements.content[0].id = this._id + "-content", this.elements.title[0].id = this._id + "-title")) : e[t] = n
                        },
                        "^prerender": function (e, t, i) {
                            i && !this.rendered && this.render(this.options.show.ready)
                        },
                        "^content.text$": function (e, t, i) {
                            this._updateContent(i)
                        },
                        "^content.attr$": function (e, t, i, n) {
                            this.options.content.text === this.target.attr(n) && this._updateContent(this.target.attr(i))
                        },
                        "^content.title$": function (e, t, i) {
                            if (!i) return this._removeTitle();
                            i && !this.elements.title && this._createTitle(),
                                this._updateTitle(i)
                        },
                        "^content.button$": function (e, t, i) {
                            this._updateButton(i)
                        },
                        "^content.title.(text|button)$": function (e, t, i) {
                            this.set("content." + t, i)
                        },
                        "^position.(my|at)$": function (e, t, i) {
                            "string" == typeof i && (e[t] = new v(i, "at" === t))
                        },
                        "^position.container$": function (e, t, i) {
                            this.rendered && this.tooltip.appendTo(i)
                        },
                        "^show.ready$": function (e, t, i) {
                            i && (!this.rendered && this.render(C) || this.toggle(C))
                        },
                        "^style.classes$": function (e, t, i, n) {
                            this.rendered && this.tooltip.removeClass(n).addClass(i)
                        },
                        "^style.(width|height)": function (e, t, i) {
                            this.rendered && this.tooltip.css(t, i)
                        },
                        "^style.widget|content.title": function () {
                            this.rendered && this._setWidget()
                        },
                        "^style.def": function (e, t, i) {
                            this.rendered && this.tooltip.toggleClass(c, !! i)
                        },
                        "^events.(render|show|move|hide|focus|blur)$": function (e, t, i) {
                            this.rendered && this.tooltip[(E.isFunction(i) ? "" : "un") + "bind"]("tooltip" + t, i)
                        },
                        "^(show|hide|position).(event|target|fixed|inactive|leave|distance|viewport|adjust)": function () {
                            if (this.rendered) {
                                var e = this.options.position;
                                this.tooltip.attr("tracking", "mouse" === e.target && e.adjust.mouse),
                                    this._unassignEvents(),
                                    this._assignEvents()
                            }
                        }
                    }
                },
                e.get = function (e) {
                    if (this.destroyed) return this;
                    var t = p(this.options, e.toLowerCase()),
                        i = t[0][t[1]];
                    return i.precedance ? i.string() : i
                };
            var R = /^position\.(my|at|adjust|target|container|viewport)|style|content|show\.ready/i,
                z = /^prerender|show\.ready/i;
            e.set = function (o, e) {
                if (this.destroyed) return this;
                var t, s = this.rendered,
                    r = x,
                    a = this.options;
                this.checks;
                return "string" == typeof o ? (t = o, (o = {})[t] = e) : o = E.extend({}, o),
                    E.each(o, function (e, t) {
                        if (s && z.test(e)) delete o[e];
                        else {
                            var i, n = p(a, e.toLowerCase());
                            i = n[0][n[1]],
                                n[0][n[1]] = t && t.nodeType ? E(t) : t,
                                r = R.test(e) || r,
                                o[e] = [n[0], n[1], t, i]
                        }
                    }),
                    b(a),
                    this.positioning = C,
                    E.each(o, E.proxy(N, this)),
                    this.positioning = x,
                this.rendered && 0 < this.tooltip[0].offsetWidth && r && this.reposition("mouse" === a.position.target ? y : this.cache.event),
                    this
            },
                e._update = function (e, t, i) {
                    var n = this,
                        o = this.cache;
                    return this.rendered && e ? (E.isFunction(e) && (e = e.call(this.elements.target, o.event, this) || ""), E.isFunction(e.then) ? (o.waiting = C, e.then(function (e) {
                        return o.waiting = x,
                            n._update(e, t)
                    }, y, function (e) {
                        return n._update(e, t)
                    })) : e === x || !e && "" !== e ? x : (e.jquery && 0 < e.length ? t.empty().append(e.css({
                        display: "block",
                        visibility: "visible"
                    })) : t.html(e), this._waitForContent(t).then(function (e) {
                        e.images && e.images.length && n.rendered && 0 < n.tooltip[0].offsetWidth && n.reposition(o.event, !e.length)
                    }))) : x
                },
                e._waitForContent = function (e) {
                    var t = this.cache;
                    return t.waiting = C,
                        (E.fn.imagesLoaded ? e.imagesLoaded() : E.Deferred().resolve([])).done(function () {
                            t.waiting = x
                        }).promise()
                },
                e._updateContent = function (e, t) {
                    this._update(e, this.elements.content, t)
                },
                e._updateTitle = function (e, t) {
                    this._update(e, this.elements.title, t) === x && this._removeTitle(x)
                },
                e._createTitle = function () {
                    var e = this.elements,
                        t = this._id + "-title";
                    e.titlebar && this._removeTitle(),
                        e.titlebar = E("<div />", {
                            class: B + "-titlebar " + (this.options.style.widget ? U("header") : "")
                        }).append(e.title = E("<div />", {
                            id: t,
                            class: B + "-title",
                            "aria-atomic": C
                        })).insertBefore(e.content).delegate(".qtip-close", "mousedown keydown mouseup keyup mouseout", function (e) {
                            E(this).toggleClass("ui-state-active ui-state-focus", "down" === e.type.substr(-4))
                        }).delegate(".qtip-close", "mouseover mouseout", function (e) {
                            E(this).toggleClass("ui-state-hover", "mouseover" === e.type)
                        }),
                    this.options.content.button && this._createButton()
                },
                e._removeTitle = function (e) {
                    var t = this.elements;
                    t.title && (t.titlebar.remove(), t.titlebar = t.title = t.button = y, e !== x && this.reposition())
                },
                e.reposition = function (e, t) {
                    if (!this.rendered || this.positioning || this.destroyed) return this;
                    this.positioning = C;
                    var i, n, o = this.cache,
                        s = this.tooltip,
                        r = this.options.position,
                        a = r.target,
                        l = r.my,
                        p = r.at,
                        d = r.viewport,
                        c = r.container,
                        u = r.adjust,
                        h = u.method.split(" "),
                        m = s.outerWidth(x),
                        f = s.outerHeight(x),
                        g = 0,
                        v = 0,
                        y = s.css("position"),
                        I = {
                            left: 0,
                            top: 0
                        },
                        S = 0 < s[0].offsetWidth,
                        O = e && "scroll" === e.type,
                        b = E(be),
                        N = c[0].ownerDocument,
                        R = this.mouse;
                    if (E.isArray(a) && 2 === a.length) p = {
                        x: k,
                        y: $
                    },
                        I = {
                            left: a[0],
                            top: a[1]
                        };
                    else if ("mouse" === a) p = {
                        x: k,
                        y: $
                    },
                        !R || !R.pageX || !u.mouse && e && e.pageX ? e && e.pageX || ((!u.mouse || this.options.show.distance) && o.origin && o.origin.pageX ? e = o.origin : e && (!e || "resize" !== e.type && "scroll" !== e.type) || (e = o.event)) : e = R,
                    "static" !== y && (I = c.offset()),
                    N.body.offsetWidth !== (be.innerWidth || N.documentElement.clientWidth) && (n = E(Ne.body).offset()),
                        I = {
                            left: e.pageX - I.left + (n && n.left || 0),
                            top: e.pageY - I.top + (n && n.top || 0)
                        },
                    u.mouse && O && R && (I.left -= (R.scrollX || 0) - b.scrollLeft(), I.top -= (R.scrollY || 0) - b.scrollTop());
                    else {
                        if ("event" === a ? e && e.target && "scroll" !== e.type && "resize" !== e.type ? o.target = E(e.target) : e.target || (o.target = this.elements.target) : "event" !== a && (o.target = E(a.jquery ? a : this.elements.target)), a = o.target, 0 === (a = E(a).eq(0)).length) return this;
                        a[0] === Ne || a[0] === be ? (g = T.iOS ? be.innerWidth : a.width(), v = T.iOS ? be.innerHeight : a.height(), a[0] === be && (I = {
                            top: (d || a).scrollTop(),
                            left: (d || a).scrollLeft()
                        })) : w.imagemap && a.is("area") ? i = w.imagemap(this, a, p, w.viewport ? h : x) : w.svg && a && a[0].ownerSVGElement ? i = w.svg(this, a, p, w.viewport ? h : x) : (g = a.outerWidth(x), v = a.outerHeight(x), I = a.offset()),
                        i && (g = i.width, v = i.height, n = i.offset, I = i.position),
                            I = this.reposition.offset(a, I, c),
                        (3.1 < T.iOS && T.iOS < 4.1 || 4.3 <= T.iOS && T.iOS < 4.33 || !T.iOS && "fixed" === y) && (I.left -= b.scrollLeft(), I.top -= b.scrollTop()),
                        (!i || i && i.adjustable !== x) && (I.left += p.x === M ? g : p.x === X ? g / 2 : 0, I.top += p.y === A ? v : p.y === X ? v / 2 : 0)
                    }
                    return I.left += u.x + (l.x === M ? -m : l.x === X ? -m / 2 : 0),
                        I.top += u.y + (l.y === A ? -f : l.y === X ? -f / 2 : 0),
                        w.viewport ? (I.adjusted = w.viewport(this, I, r, g, v, m, f), n && I.adjusted.left && (I.left += n.left), n && I.adjusted.top && (I.top += n.top)) : I.adjusted = {
                            left: 0,
                            top: 0
                        },
                    this._trigger("move", [I, d.elem || d], e) && (delete I.adjusted, t === x || !S || isNaN(I.left) || isNaN(I.top) || "mouse" === a || !E.isFunction(r.effect) ? s.css(I) : E.isFunction(r.effect) && (r.effect.call(s, this, E.extend({}, I)), s.queue(function (e) {
                        E(this).css({
                            opacity: "",
                            height: ""
                        }),
                        T.ie && this.style.removeAttribute("filter"),
                            e()
                    })), this.positioning = x),
                        this
                },
                e.reposition.offset = function (e, i, t) {
                    if (!t[0]) return i;
                    var n, o, s, r, a = E(e[0].ownerDocument),
                        l = !! T.ie && "CSS1Compat" !== Ne.compatMode,
                        p = t[0];

                    function d(e, t) {
                        i.left += t * e.scrollLeft(),
                            i.top += t * e.scrollTop()
                    }
                    for (;
                        "static" !== (o = E.css(p, "position")) && ("fixed" === o ? (s = p.getBoundingClientRect(), d(a, -1)) : ((s = E(p).position()).left += parseFloat(E.css(p, "borderLeftWidth")) || 0, s.top += parseFloat(E.css(p, "borderTopWidth")) || 0), i.left -= s.left + (parseFloat(E.css(p, "marginLeft")) || 0), i.top -= s.top + (parseFloat(E.css(p, "marginTop")) || 0), n || "hidden" === (r = E.css(p, "overflow")) || "visible" === r || (n = E(p))), p = p.offsetParent;);
                    return n && (n[0] !== a[0] || l) && d(n, 1),
                        i
                };
            var G = (v = e.reposition.Corner = function (e, t) {
                e = ("" + e).replace(/([A-Z])/, " $1").replace(/middle/gi, X).toLowerCase(),
                    this.x = (e.match(/left|right/i) || e.match(/center/) || ["inherit"])[0].toLowerCase(),
                    this.y = (e.match(/top|bottom|center/i) || ["inherit"])[0].toLowerCase(),
                    this.forceY = !! t;
                var i = e.charAt(0);
                this.precedance = "t" === i || "b" === i ? _ : P
            }).prototype;

            function U(e) {
                return i.concat("").join(e ? "-" + e + " " : " ")
            }
            function V(e) {
                return e && {
                    type: e.type,
                    pageX: e.pageX,
                    pageY: e.pageY,
                    target: e.target,
                    relatedTarget: e.relatedTarget,
                    scrollX: e.scrollX || be.pageXOffset || Ne.body.scrollLeft || Ne.documentElement.scrollLeft,
                    scrollY: e.scrollY || be.pageYOffset || Ne.body.scrollTop || Ne.documentElement.scrollTop
                } || {}
            }
            function W(e, t) {
                if (0 < t) return setTimeout(E.proxy(e, this), t);
                e.call(this)
            }
            function H(e) {
                if (this.tooltip.hasClass(f)) return x;
                clearTimeout(this.timers.show),
                    clearTimeout(this.timers.hide),
                    this.timers.show = W.call(this, function () {
                        this.toggle(C, e)
                    }, this.options.show.delay)
            }
            function j(e) {
                if (this.tooltip.hasClass(f)) return x;
                var t = E(e.relatedTarget),
                    i = t.closest(I)[0] === this.tooltip[0],
                    n = t[0] === this.options.show.target[0];
                if (clearTimeout(this.timers.show), clearTimeout(this.timers.hide), this !== t[0] && "mouse" === this.options.position.target && i || this.options.hide.fixed && /mouse(out|leave|move)/.test(e.type) && (i || n)) try {
                    e.preventDefault(),
                        e.stopImmediatePropagation()
                } catch (e) {} else this.timers.hide = W.call(this, function () {
                    this.toggle(x, e)
                }, this.options.hide.delay, this)
            }
            function q(e) {
                if (this.tooltip.hasClass(f) || !this.options.hide.inactive) return x;
                clearTimeout(this.timers.inactive),
                    this.timers.inactive = W.call(this, function () {
                        this.hide(e)
                    }, this.options.hide.inactive)
            }
            function K(e) {
                this.rendered && 0 < this.tooltip[0].offsetWidth && this.reposition(e)
            }
            G.invert = function (e, t) {
                this[e] = this[e] === k ? M : this[e] === M ? k : t || this[e]
            },
                G.string = function () {
                    var e = this.x,
                        t = this.y;
                    return e === t ? e : this.precedance === _ || this.forceY && "center" !== t ? t + " " + e : e + " " + t
                },
                G.abbrev = function () {
                    var e = this.string().split(" ");
                    return e[0].charAt(0) + (e[1] && e[1].charAt(0) || "")
                },
                G.clone = function () {
                    return new v(this.string(), this.forceY)
                },
                e.toggle = function (e, t) {
                    var i = this.cache,
                        n = this.options,
                        o = this.tooltip;
                    if (t) {
                        if (/over|enter/.test(t.type) && /out|leave/.test(i.event.type) && n.show.target.add(t.target).length === n.show.target.length && o.has(t.relatedTarget).length) return this;
                        i.event = V(t)
                    }
                    if (this.waiting && !e && (this.hiddenDuringWait = C), !this.rendered) return e ? this.render(1) : this;
                    if (this.destroyed || this.disabled) return this;
                    var s, r, a, l = e ? "show" : "hide",
                        p = this.options[l],
                        d = (this.options[e ? "hide" : "show"], this.options.position),
                        c = this.options.content,
                        u = this.tooltip.css("width"),
                        h = this.tooltip.is(":visible"),
                        m = e || 1 === p.target.length,
                        f = !t || p.target.length < 2 || i.target[0] === t.target;
                    return (typeof e).search("boolean|number") && (e = !h),
                        r = (s = !o.is(":animated") && h === e && f) ? y : !! this._trigger(l, [90]),
                        this.destroyed ? this : (r !== x && e && this.focus(t), !r || s || (E.attr(o[0], "aria-hidden", !e), e ? (i.origin = V(this.mouse), E.isFunction(c.text) && this._updateContent(c.text, x), E.isFunction(c.title) && this._updateTitle(c.title, x), !g && "mouse" === d.target && d.adjust.mouse && (E(Ne).bind("mousemove." + B, this._storeMouse), g = C), u || o.css("width", o.outerWidth(x)), this.reposition(t, arguments[2]), u || o.css("width", ""), p.solo && ("string" == typeof p.solo ? E(p.solo) : E(I, p.solo)).not(o).not(p.target).qtip("hide", E.Event("tooltipsolo"))) : (clearTimeout(this.timers.show), delete i.origin, g && !E(I + '[tracking="true"]:visible', p.solo).not(o).length && (E(Ne).unbind("mousemove." + B), g = x), this.blur(t)), a = E.proxy(function () {
                            e ? (T.ie && o[0].style.removeAttribute("filter"), o.css("overflow", ""), "string" == typeof p.autofocus && E(this.options.show.autofocus, o).focus(), this.options.show.target.trigger("qtip-" + this.id + "-inactive")) : o.css({
                                display: "",
                                visibility: "",
                                opacity: "",
                                left: "",
                                top: ""
                            }),
                                this._trigger(e ? "visible" : "hidden")
                        }, this), p.effect === x || m === x ? (o[l](), a()) : E.isFunction(p.effect) ? (o.stop(1, 1), p.effect.call(o, this), o.queue("fx", function (e) {
                            a(),
                                e()
                        })) : o.fadeTo(90, e ? 1 : 0, a), e && p.target.trigger("qtip-" + this.id + "-inactive")), this)
                },
                e.show = function (e) {
                    return this.toggle(C, e)
                },
                e.hide = function (e) {
                    return this.toggle(x, e)
                },
                e.focus = function (e) {
                    if (!this.rendered || this.destroyed) return this;
                    var t = E(I),
                        i = this.tooltip,
                        n = parseInt(i[0].style.zIndex, 10),
                        o = h.zindex + t.length;
                    return i.hasClass(r) || this._trigger("focus", [o], e) && (n !== o && (t.each(function () {
                        this.style.zIndex > n && (this.style.zIndex = this.style.zIndex - 1)
                    }), t.filter("." + r).qtip("blur", e)), i.addClass(r)[0].style.zIndex = o),
                        this
                },
                e.blur = function (e) {
                    return !this.rendered || this.destroyed || (this.tooltip.removeClass(r), this._trigger("blur", [this.tooltip.css("zIndex")], e)),
                        this
                },
                e.disable = function (e) {
                    return this.destroyed || ("toggle" === e ? e = !(this.rendered ? this.tooltip.hasClass(f) : this.disabled) : "boolean" != typeof e && (e = C), this.rendered && this.tooltip.toggleClass(f, e).attr("aria-disabled", e), this.disabled = !! e),
                        this
                },
                e.enable = function () {
                    return this.disable(x)
                },
                e._createButton = function () {
                    var t = this,
                        e = this.elements,
                        i = e.tooltip,
                        n = this.options.content.button,
                        o = "string" == typeof n ? n : "Close tooltip";
                    e.button && e.button.remove(),
                        n.jquery ? e.button = n : e.button = E("<a />", {
                            class: "qtip-close " + (this.options.style.widget ? "" : B + "-icon"),
                            title: o,
                            "aria-label": o
                        }).prepend(E("<span />", {
                            class: "ui-icon ui-icon-close",
                            html: "&times;"
                        })),
                        e.button.appendTo(e.titlebar || i).attr("role", "button").click(function (e) {
                            return i.hasClass(f) || t.hide(e),
                                x
                        })
                },
                e._updateButton = function (e) {
                    if (!this.rendered) return x;
                    var t = this.elements.button;
                    e ? this._createButton() : t.remove()
                },
                e._setWidget = function () {
                    var e = this.options.style.widget,
                        t = this.elements,
                        i = t.tooltip,
                        n = i.hasClass(f);
                    i.removeClass(f),
                        f = e ? "ui-state-disabled" : "qtip-disabled",
                        i.toggleClass(f, n),
                        i.toggleClass("ui-helper-reset " + U(), e).toggleClass(c, this.options.style.def && !e),
                    t.content && t.content.toggleClass(U("content"), e),
                    t.titlebar && t.titlebar.toggleClass(U("header"), e),
                    t.button && t.button.toggleClass(B + "-icon", !e)
                },
                e._storeMouse = function (e) {
                    (this.mouse = V(e)).type = "mousemove"
                },
                e._bind = function (e, t, i, n, o) {
                    var s = "." + this._id + (n ? "-" + n : "");
                    t.length && E(e).bind((t.split ? t : t.join(s + " ")) + s, E.proxy(i, o || this))
                },
                e._unbind = function (e, t) {
                    E(e).unbind("." + this._id + (t ? "-" + t : ""))
                };
            var Q = "." + B;

            function J(e, t, i) {
                E(Ne.body).delegate(e, (t.split ? t : t.join(Q + " ")) + Q, function () {
                    var e = h.api[E.attr(this, d)];
                    e && !e.disabled && i.apply(e, arguments)
                })
            }
            E(function () {
                J(I, ["mouseenter", "mouseleave"], function (e) {
                    var t = "mouseenter" === e.type,
                        i = E(e.currentTarget),
                        n = E(e.relatedTarget || e.target),
                        o = this.options;
                    t ? (this.focus(e), i.hasClass(u) && !i.hasClass(f) && clearTimeout(this.timers.hide)) : "mouse" === o.position.target && o.hide.event && o.show.target && !n.closest(o.show.target[0]).length && this.hide(e),
                        i.toggleClass(s, t)
                }),
                    J("[" + d + "]", n, q)
            }),
                e._trigger = function (e, t, i) {
                    var n = E.Event("tooltip" + e);
                    return n.originalEvent = i && E.extend({}, i) || this.cache.event || y,
                        this.triggering = e,
                        this.tooltip.trigger(n, [this].concat(t || [])),
                        this.triggering = x,
                        !n.isDefaultPrevented()
                },
                e._bindEvents = function (i, e, t, n, o, s) {
                    if (n.add(t).length === n.length) {
                        var r = [];
                        e = E.map(e, function (e) {
                            var t = E.inArray(e, i);
                            if (!(-1 < t)) return e;
                            r.push(i.splice(t, 1)[0])
                        }),
                        r.length && this._bind(t, r, function (e) {
                            ( !! this.rendered && 0 < this.tooltip[0].offsetWidth ? s : o).call(this, e)
                        })
                    }
                    this._bind(t, i, o),
                        this._bind(n, e, s)
                },
                e._assignInitialEvents = function (e) {
                    var t = this.options,
                        i = t.show.target,
                        n = t.hide.target,
                        o = t.show.event ? E.trim("" + t.show.event).split(" ") : [],
                        s = t.hide.event ? E.trim("" + t.hide.event).split(" ") : [];

                    function r(e) {
                        if (this.disabled || this.destroyed) return x;
                        this.cache.event = V(e),
                            this.cache.target = e ? E(e.target) : [Re],
                            clearTimeout(this.timers.show),
                            this.timers.show = W.call(this, function () {
                                this.render("object" == typeof e || t.show.ready)
                            }, t.show.delay)
                    }
                    /mouse(over|enter)/i.test(t.show.event) && !/mouse(out|leave)/i.test(t.hide.event) && s.push("mouseleave"),
                        this._bind(i, "mousemove", function (e) {
                            this._storeMouse(e),
                                this.cache.onTarget = C
                        }),
                        this._bindEvents(o, s, i, n, r, function () {
                            clearTimeout(this.timers.show)
                        }),
                    (t.show.ready || t.prerender) && r.call(this, e)
                },
                e._assignEvents = function () {
                    var i = this,
                        o = this.options,
                        e = o.position,
                        n = this.tooltip,
                        t = o.show.target,
                        s = o.hide.target,
                        r = e.container,
                        a = e.viewport,
                        l = E(Ne),
                        p = (E(Ne.body), E(be)),
                        d = o.show.event ? E.trim("" + o.show.event).split(" ") : [],
                        c = o.hide.event ? E.trim("" + o.hide.event).split(" ") : [];
                    E.each(o.events, function (e, t) {
                        i._bind(n, "toggle" === e ? ["tooltipshow", "tooltiphide"] : ["tooltip" + e], t, null, n)
                    }),
                    /mouse(out|leave)/i.test(o.hide.event) && "window" === o.hide.leave && this._bind(l, ["mouseout", "blur"], function (e) {
                        /select|option/.test(e.target.nodeName) || e.relatedTarget || this.hide(e)
                    }),
                        o.hide.fixed ? s = s.add(n.addClass(u)) : /mouse(over|enter)/i.test(o.show.event) && this._bind(s, "mouseleave", function () {
                            clearTimeout(this.timers.show)
                        }),
                    -1 < ("" + o.hide.event).indexOf("unfocus") && this._bind(r.closest("html"), ["mousedown", "touchstart"], function (e) {
                        var t = E(e.target),
                            i = this.rendered && !this.tooltip.hasClass(f) && 0 < this.tooltip[0].offsetWidth,
                            n = 0 < t.parents(I).filter(this.tooltip[0]).length;
                        t[0] === this.target[0] || t[0] === this.tooltip[0] || n || this.target.has(t[0]).length || !i || this.hide(e)
                    }),
                    "number" == typeof o.hide.inactive && (this._bind(t, "qtip-" + this.id + "-inactive", q), this._bind(s.add(n), h.inactiveEvents, q, "-inactive")),
                        this._bindEvents(d, c, t, s, H, j),
                        this._bind(t.add(n), "mousemove", function (e) {
                            if ("number" == typeof o.hide.distance) {
                                var t = this.cache.origin || {},
                                    i = this.options.hide.distance,
                                    n = Math.abs;
                                (n(e.pageX - t.pageX) >= i || n(e.pageY - t.pageY) >= i) && this.hide(e)
                            }
                            this._storeMouse(e)
                        }),
                    "mouse" === e.target && e.adjust.mouse && (o.hide.event && this._bind(t, ["mouseenter", "mouseleave"], function (e) {
                        this.cache.onTarget = "mouseenter" === e.type
                    }), this._bind(l, "mousemove", function (e) {
                        this.rendered && this.cache.onTarget && !this.tooltip.hasClass(f) && 0 < this.tooltip[0].offsetWidth && this.reposition(e)
                    })),
                    (e.adjust.resize || a.length) && this._bind(E.event.special.resize ? a : p, "resize", K),
                    e.adjust.scroll && this._bind(p.add(e.container), "scroll", K)
                },
                e._unassignEvents = function () {
                    var e = [this.options.show.target[0], this.options.hide.target[0], this.rendered && this.tooltip[0], this.options.position.container[0], this.options.position.viewport[0], this.options.position.container.closest("html")[0], be, Ne];
                    this._unbind(E([]).pushStack(E.grep(e, function (e) {
                        return "object" == typeof e
                    })))
                },
                h = E.fn.qtip = function (e, t, i) {
                    var n = ("" + e).toLowerCase(),
                        o = y,
                        s = E.makeArray(arguments).slice(1),
                        r = s[s.length - 1],
                        a = this[0] ? E.data(this[0], B) : y;
                    return !arguments.length && a || "api" === n ? a : "string" == typeof e ? (this.each(function () {
                        var e = E.data(this, B);
                        if (!e) return C;
                        if (r && r.timeStamp && (e.cache.event = r), !t || "option" !== n && "options" !== n) e[n] && e[n].apply(e, s);
                        else {
                            if (i === Re && !E.isPlainObject(t)) return o = e.get(t),
                                x;
                            e.set(t, i)
                        }
                    }), o !== y ? o : this) : "object" != typeof e && arguments.length ? void 0 : (a = b(E.extend(C, {}, e)), this.each(function (e) {
                        var t, i;
                        if (i = !(i = E.isArray(a.id) ? a.id[e] : a.id) || i === x || i.length < 1 || h.api[i] ? h.nextid++ : i, (t = function (e, t, i) {
                            var n, o, s, r, a, l = E(Ne.body),
                                p = e[0] === Ne ? l : e,
                                d = e.metadata ? e.metadata(i.metadata) : y,
                                c = "html5" === i.metadata.type && d ? d[i.metadata.name] : y,
                                u = e.data(i.metadata.name || "qtipopts");
                            try {
                                u = "string" == typeof u ? E.parseJSON(u) : u
                            } catch (e) {}
                            if (o = (r = E.extend(C, {}, h.defaults, i, "object" == typeof u ? b(u) : y, b(c || d))).position, r.id = t, "boolean" == typeof r.content.text) {
                                if (s = e.attr(r.content.attr), r.content.attr === x || !s) return x;
                                r.content.text = s
                            }
                            if (o.container.length || (o.container = l), o.target === x && (o.target = p), r.show.target === x && (r.show.target = p), r.show.solo === C && (r.show.solo = o.container.closest("body")), r.hide.target === x && (r.hide.target = p), r.position.viewport === C && (r.position.viewport = o.container), o.container = o.container.eq(0), o.at = new v(o.at, C), o.my = new v(o.my), e.data(B)) if (r.overwrite) e.qtip("destroy", !0);
                            else if (r.overwrite === x) return x;
                            return e.attr(m, t),
                            r.suppress && (a = e.attr("title")) && e.removeAttr("title").attr(S, a).attr("title", ""),
                                n = new O(e, r, t, !! s),
                                e.data(B, n),
                                e.one("remove.qtip-" + t + " removeqtip.qtip-" + t, function () {
                                    var e;
                                    (e = E(this).data(B)) && e.destroy(!0)
                                }),
                                n
                        }(E(this), i, a)) === x) return C;
                        h.api[i] = t,
                            E.each(w, function () {
                                "initialize" === this.initialize && this(t)
                            }),
                            t._assignInitialEvents(r)
                    }))
                },
                E.qtip = O,
                h.api = {},
                E.each({
                    attr: function (e, t) {
                        if (this.length) {
                            var i = this[0],
                                n = E.data(i, "qtip");
                            if ("title" === e && n && "object" == typeof n && n.options.suppress) return arguments.length < 2 ? E.attr(i, S) : (n && "title" === n.options.content.attr && n.cache.attr && n.set("content.text", t), this.attr(S, t))
                        }
                        return E.fn["attr" + o].apply(this, arguments)
                    },
                    clone: function (e) {
                        E([]);
                        var t = E.fn["clone" + o].apply(this, arguments);
                        return e || t.filter("[" + S + "]").attr("title", function () {
                            return E.attr(this, S)
                        }).removeAttr(S),
                            t
                    }
                }, function (e, t) {
                    if (!t || E.fn[e + o]) return C;
                    var i = E.fn[e + o] = E.fn[e];
                    E.fn[e] = function () {
                        return t.apply(this, arguments) || i.apply(this, arguments)
                    }
                }),
            E.ui || (E["cleanData" + o] = E.cleanData, E.cleanData = function (e) {
                for (var t, i = 0;
                     (t = E(e[i])).length; i++) if (t.attr(m)) try {
                    t.triggerHandler("removeqtip")
                } catch (e) {}
                E["cleanData" + o].apply(this, arguments)
            }),
                h.version = "@@VERSION",
                h.nextid = 0,
                h.inactiveEvents = n,
                h.zindex = 15e3,
                h.defaults = {
                    prerender: x,
                    id: x,
                    overwrite: C,
                    suppress: C,
                    content: {
                        text: C,
                        attr: "title",
                        title: x,
                        button: x
                    },
                    position: {
                        my: "top left",
                        at: "bottom right",
                        target: x,
                        container: x,
                        viewport: x,
                        adjust: {
                            x: 0,
                            y: 0,
                            mouse: C,
                            scroll: C,
                            resize: C,
                            method: "flipinvert flipinvert"
                        },
                        effect: function (e, t, i) {
                            E(this).animate(t, {
                                duration: 200,
                                queue: x
                            })
                        }
                    },
                    show: {
                        target: x,
                        event: "mouseenter",
                        effect: C,
                        delay: 90,
                        solo: x,
                        ready: x,
                        autofocus: x
                    },
                    hide: {
                        target: x,
                        event: "mouseleave",
                        effect: C,
                        delay: 0,
                        fixed: x,
                        inactive: x,
                        leave: "window",
                        distance: x
                    },
                    style: {
                        classes: "",
                        widget: x,
                        width: x,
                        height: x,
                        def: C
                    },
                    events: {
                        render: y,
                        move: y,
                        show: y,
                        hide: y,
                        toggle: y,
                        visible: y,
                        hidden: y,
                        focus: y,
                        blur: y
                    }
                };
            var Z, ee = "margin",
                te = "border",
                ie = "color",
                ne = "background-color",
                oe = "transparent",
                se = " !important",
                re = !! Ne.createElement("canvas").getContext,
                ae = /rgba?\(0, 0, 0(, 0)?\)|transparent|#123456/i;

            function le(e) {
                return e.charAt(0).toUpperCase() + e.slice(1)
            }
            var pe, de = {},
                ce = ["Webkit", "O", "Moz", "ms"];

            function ue(e, t) {
                return Math.ceil(parseFloat(function (e, t) {
                    var i, n, o = t.charAt(0).toUpperCase() + t.slice(1),
                        s = (t + " " + ce.join(o + " ") + o).split(" "),
                        r = 0;
                    if (de[t]) return e.css(de[t]);
                    for (; i = s[r++];) if ((n = e.css(i)) !== Re) return de[t] = i,
                        n
                }(e, t)))
            }
            if (re) var he = (be.devicePixelRatio || 1) / ((pe = Ne.createElement("canvas").getContext("2d")).backingStorePixelRatio || pe.webkitBackingStorePixelRatio || pe.mozBackingStorePixelRatio || pe.msBackingStorePixelRatio || pe.oBackingStorePixelRatio || 1);
            else var me = function (e, t, i) {
                return "<qtipvml:" + e + ' xmlns="urn:schemas-microsoft.com:vml" class="qtip-vml" ' + (t || "") + ' style="behavior: url(#default#VML); ' + (i || "") + '" />'
            };

            function fe(e, t) {
                this._ns = "tip",
                    this.options = t,
                    this.offset = t.offset,
                    this.size = [t.width, t.height],
                    this.init(this.qtip = e)
            }
            E.extend(fe.prototype, {
                init: function (e) {
                    var t, i;
                    i = this.element = e.elements.tip = E("<div />", {
                        class: B + "-tip"
                    }).prependTo(e.tooltip),
                        re ? ((t = E("<canvas />").appendTo(this.element)[0].getContext("2d")).lineJoin = "miter", t.miterLimit = 1e5, t.save()) : (t = me("shape", 'coordorigin="0,0"', "position:absolute;"), this.element.html(t + t), e._bind(E("*", i).add(i), ["click", "mousedown"], function (e) {
                            e.stopPropagation()
                        }, this._ns)),
                        e._bind(e.tooltip, "tooltipmove", this.reposition, this._ns, this),
                        this.create()
                },
                _swapDimensions: function () {
                    this.size[0] = this.options.height,
                        this.size[1] = this.options.width
                },
                _resetDimensions: function () {
                    this.size[0] = this.options.width,
                        this.size[1] = this.options.height
                },
                _useTitle: function (e) {
                    var t = this.qtip.elements.titlebar;
                    return t && (e.y === $ || e.y === X && this.element.position().top + this.size[1] / 2 + this.options.offset < t.outerHeight(C))
                },
                _parseCorner: function (e) {
                    var t = this.qtip.options.position.my;
                    return e === x || t === x ? e = x : e === C ? e = new v(t.string()) : e.string || ((e = new v(e)).fixed = C),
                        e
                },
                _parseWidth: function (e, t, i) {
                    var n = this.qtip.elements,
                        o = te + le(t) + "Width";
                    return (i ? ue(i, o) : ue(n.content, o) || ue(this._useTitle(e) && n.titlebar || n.content, o) || ue(n.tooltip, o)) || 0
                },
                _parseRadius: function (e) {
                    var t = this.qtip.elements,
                        i = te + le(e.y) + le(e.x) + "Radius";
                    return T.ie < 9 ? 0 : ue(this._useTitle(e) && t.titlebar || t.content, i) || ue(t.tooltip, i) || 0
                },
                _invalidColour: function (e, t, i) {
                    var n = e.css(t);
                    return !n || i && n === e.css(i) || ae.test(n) ? x : n
                },
                _parseColours: function (e) {
                    var t = this.qtip.elements,
                        i = this.element.css("cssText", ""),
                        n = te + le(e[e.precedance]) + le(ie),
                        o = this._useTitle(e) && t.titlebar || t.content,
                        s = this._invalidColour,
                        r = [];
                    return r[0] = s(i, ne) || s(o, ne) || s(t.content, ne) || s(t.tooltip, ne) || i.css(ne),
                        r[1] = s(i, n, ie) || s(o, n, ie) || s(t.content, n, ie) || s(t.tooltip, n, ie) || t.tooltip.css(n),
                        E("*", i).add(i).css("cssText", ne + ":" + oe + se + ";" + te + ":0" + se + ";"),
                        r
                },
                _calculateSize: function (e) {
                    var t, i, n = e.precedance === _,
                        o = this.options.width,
                        s = this.options.height,
                        r = "c" === e.abbrev(),
                        a = (n ? o : s) * (r ? .5 : 1),
                        l = Math.pow,
                        p = Math.round,
                        d = Math.sqrt(l(a, 2) + l(s, 2)),
                        c = [this.border / a * d, this.border / s * d];
                    return c[2] = Math.sqrt(l(c[0], 2) - l(this.border, 2)),
                        c[3] = Math.sqrt(l(c[1], 2) - l(this.border, 2)),
                        i = [p((t = (d + c[2] + c[3] + (r ? 0 : c[0])) / d) * o), p(t * s)],
                        n ? i : i.reverse()
                },
                _calculateTip: function (e, t, i) {
                    i = i || 1;
                    var n = (t = t || this.size)[0] * i,
                        o = t[1] * i,
                        s = Math.ceil(n / 2),
                        r = Math.ceil(o / 2),
                        a = {
                            br: [0, 0, n, o, n, 0],
                            bl: [0, 0, n, 0, 0, o],
                            tr: [0, o, n, 0, n, o],
                            tl: [0, 0, 0, o, n, o],
                            tc: [0, o, s, 0, n, o],
                            bc: [0, 0, n, 0, s, o],
                            rc: [0, 0, n, r, 0, o],
                            lc: [n, 0, n, o, 0, r]
                        };
                    return a.lt = a.br,
                        a.rt = a.bl,
                        a.lb = a.tr,
                        a.rb = a.tl,
                        a[e.abbrev()]
                },
                _drawCoords: function (e, t) {
                    e.beginPath(),
                        e.moveTo(t[0], t[1]),
                        e.lineTo(t[2], t[3]),
                        e.lineTo(t[4], t[5]),
                        e.closePath()
                },
                create: function () {
                    var e = this.corner = (re || T.ie) && this._parseCorner(this.options.corner);
                    return (this.enabled = !! this.corner && "c" !== this.corner.abbrev()) && (this.qtip.cache.corner = e.clone(), this.update()),
                        this.element.toggle(this.enabled),
                        this.corner
                },
                update: function (e, t) {
                    if (!this.enabled) return this;
                    var i, n, o, s, r, a, l, p, d = this.qtip.elements,
                        c = this.element,
                        u = c.children(),
                        h = this.options,
                        m = this.size,
                        f = h.mimic,
                        g = Math.round;
                    e || (e = this.qtip.cache.corner || this.corner),
                        f === x ? f = e : ((f = new v(f)).precedance = e.precedance, "inherit" === f.x ? f.x = e.x : "inherit" === f.y ? f.y = e.y : f.x === f.y && (f[e.precedance] = e[e.precedance])),
                        n = f.precedance,
                        e.precedance === P ? this._swapDimensions() : this._resetDimensions(),
                        (i = this.color = this._parseColours(e))[1] !== oe ? (p = this.border = this._parseWidth(e, e[e.precedance]), h.border && p < 1 && !ae.test(i[1]) && (i[0] = i[1]), this.border = p = h.border !== C ? h.border : p) : this.border = p = 0,
                        l = this.size = this._calculateSize(e),
                        c.css({
                            width: l[0],
                            height: l[1],
                            lineHeight: l[1] + "px"
                        }),
                        a = e.precedance === _ ? [g(f.x === k ? p : f.x === M ? l[0] - m[0] - p : (l[0] - m[0]) / 2), g(f.y === $ ? l[1] - m[1] : 0)] : [g(f.x === k ? l[0] - m[0] : 0), g(f.y === $ ? p : f.y === A ? l[1] - m[1] - p : (l[1] - m[1]) / 2)],
                        re ? ((o = u[0].getContext("2d")).restore(), o.save(), o.clearRect(0, 0, 6e3, 6e3), s = this._calculateTip(f, m, he), r = this._calculateTip(f, this.size, he), u.attr(D, l[0] * he).attr(L, l[1] * he), u.css(D, l[0]).css(L, l[1]), this._drawCoords(o, r), o.fillStyle = i[1], o.fill(), o.translate(a[0] * he, a[1] * he), this._drawCoords(o, s), o.fillStyle = i[0], o.fill()) : (s = "m" + (s = this._calculateTip(f))[0] + "," + s[1] + " l" + s[2] + "," + s[3] + " " + s[4] + "," + s[5] + " xe", a[2] = p && /^(r|b)/i.test(e.string()) ? 8 === T.ie ? 2 : 1 : 0, u.css({
                            coordsize: l[0] + p + " " + (l[1] + p),
                            antialias: "" + (-1 < f.string().indexOf(X)),
                            left: a[0] - a[2] * Number(n === P),
                            top: a[1] - a[2] * Number(n === _),
                            width: l[0] + p,
                            height: l[1] + p
                        }).each(function (e) {
                            var t = E(this);
                            t[t.prop ? "prop" : "attr"]({
                                coordsize: l[0] + p + " " + (l[1] + p),
                                path: s,
                                fillcolor: i[0],
                                filled: !! e,
                                stroked: !e
                            }).toggle(!(!p && !e)),
                            !e && t.html(me("stroke", 'weight="' + 2 * p + 'px" color="' + i[1] + '" miterlimit="1000" joinstyle="miter"'))
                        })),
                    be.opera && setTimeout(function () {
                        d.tip.css({
                            display: "inline-block",
                            visibility: "visible"
                        })
                    }, 1),
                    t !== x && this.calculate(e, l)
                },
                calculate: function (s, r) {
                    if (!this.enabled) return x;
                    var a, e, l = this,
                        p = this.qtip.elements,
                        t = this.element,
                        d = this.options.offset,
                        c = (p.tooltip.hasClass("ui-widget"), {});
                    return s = s || this.corner,
                        a = s.precedance,
                        r = r || this._calculateSize(s),
                        e = [s.x, s.y],
                    a === P && e.reverse(),
                        E.each(e, function (e, t) {
                            var i, n, o;
                            t === X ? (c[i = a === _ ? k : $] = "50%", c[ee + "-" + i] = -Math.round(r[a === _ ? 0 : 1] / 2) + d) : (i = l._parseWidth(s, t, p.tooltip), n = l._parseWidth(s, t, p.content), o = l._parseRadius(s), c[t] = Math.max(-l.border, e ? n : d + (i < o ? o : -i)))
                        }),
                        c[s[a]] -= r[a === P ? 0 : 1],
                        t.css({
                            margin: "",
                            top: "",
                            bottom: "",
                            left: "",
                            right: ""
                        }).css(c),
                        c
                },
                reposition: function (e, t, n, i) {
                    if (this.enabled) {
                        var o, s, r = t.cache,
                            a = this.corner.clone(),
                            l = n.adjusted,
                            p = t.options.position.adjust.method.split(" "),
                            d = p[0],
                            c = p[1] || p[0],
                            u = {
                                left: x,
                                top: x,
                                x: 0,
                                y: 0
                            },
                            h = {};
                        this.corner.fixed !== C && (m(d, P, _, k, M), m(c, _, P, $, A), a.string() === r.corner.string() || r.cornerTop === l.top && r.cornerLeft === l.left || this.update(a, x)),
                        (o = this.calculate(a)).right !== Re && (o.left = -o.right),
                        o.bottom !== Re && (o.top = -o.bottom),
                            o.user = this.offset,
                        (u.left = d === F && !! l.left) && f(P, k, M),
                        (u.top = c === F && !! l.top) && f(_, $, A),
                            this.element.css(h).toggle(!(u.x && u.y || a.x === X && u.y || a.y === X && u.x)),
                            n.left -= o.left.charAt ? o.user : d !== F || u.top || !u.left && !u.top ? o.left + this.border : 0,
                            n.top -= o.top.charAt ? o.user : c !== F || u.left || !u.left && !u.top ? o.top + this.border : 0,
                            r.cornerLeft = l.left,
                            r.cornerTop = l.top,
                            r.corner = a.clone()
                    }
                    function m(e, t, i, n, o) {
                        e === F && a.precedance === t && l[n] && a[i] !== X ? a.precedance = a.precedance === P ? _ : P : e !== F && l[n] && (a[t] = a[t] === X ? 0 < l[n] ? n : o : a[t] === n ? o : n)
                    }
                    function f(e, t, i) {
                        a[e] === X ? h[ee + "-" + t] = u[e] = o[ee + "-" + t] - l[t] : (s = o[i] !== Re ? [l[t], -o[t]] : [-l[t], o[t]], (u[e] = Math.max(s[0], s[1])) > s[0] && (n[t] -= l[t], u[t] = x), h[o[i] !== Re ? i : t] = u[e])
                    }
                },
                destroy: function () {
                    this.qtip._unbind(this.qtip.tooltip, this._ns),
                    this.qtip.elements.tip && this.qtip.elements.tip.find("*").remove().end().remove()
                }
            }),
                (Z = w.tip = function (e) {
                    return new fe(e, e.options.style.tip)
                }).initialize = "render",
                Z.sanitize = function (e) {
                    if (e.style && "tip" in e.style) {
                        var t = e.style.tip;
                        "object" != typeof t && (t = e.style.tip = {
                            corner: t
                        }),
                        /string|boolean/i.test(typeof t.corner) || (t.corner = C)
                    }
                },
                t.tip = {
                    "^position.my|style.tip.(corner|mimic|border)$": function () {
                        this.create(),
                            this.qtip.reposition()
                    },
                    "^style.tip.(height|width)$": function (e) {
                        this.size = [e.width, e.height],
                            this.update(),
                            this.qtip.reposition()
                    },
                    "^content.title|style.(classes|widget)$": function () {
                        this.update()
                    }
                },
                E.extend(C, h.defaults, {
                    style: {
                        tip: {
                            corner: C,
                            mimic: x,
                            width: 6,
                            height: 6,
                            border: C,
                            offset: 0
                        }
                    }
                });
            var ge, ve, ye = "qtip-modal",
                Ie = "." + ye;

            function Se(e, t) {
                this.options = t,
                    this._ns = "-modal",
                    this.init(this.qtip = e)
            }
            ve = new(ve = function () {
                var p, d, c, u = this,
                    o = {};

                function h(e) {
                    o.length < 1 && e.length ? e.not("body").blur() : o.first().focus()
                }
                function e(e) {
                    if (c.is(":visible")) {
                        var t = E(e.target),
                            i = p.tooltip,
                            n = t.closest(I);
                        (n.length < 1 ? x : parseInt(n[0].style.zIndex, 10) > parseInt(i[0].style.zIndex, 10)) || t.closest(I)[0] === i[0] || h(t),
                        e.target === o[o.length - 1]
                    }
                }
                E.extend(u, {
                    init: function () {
                        return c = u.elem = E("<div />", {
                            id: "qtip-overlay",
                            html: "<div></div>",
                            mousedown: function () {
                                return x
                            }
                        }).hide(),
                            E(Ne.body).bind("focusin" + Ie, e),
                            E(Ne).bind("keydown" + Ie, function (e) {
                                p && p.options.show.modal.escape && 27 === e.keyCode && p.hide(e)
                            }),
                            c.bind("click" + Ie, function (e) {
                                p && p.options.show.modal.blur && p.hide(e)
                            }),
                            u
                    },
                    update: function (e) {
                        o = (p = e).options.show.modal.stealfocus !== x ? e.tooltip.find("*").filter(function () {
                            return function (e) {
                                if (E.expr[":"].focusable) return E.expr[":"].focusable;
                                var t, i, n, o = !isNaN(E.attr(e, "tabindex")),
                                    s = e.nodeName && e.nodeName.toLowerCase();
                                return "area" === s ? (i = (t = e.parentNode).name, !(!e.href || !i || "map" !== t.nodeName.toLowerCase()) && !! (n = E("img[usemap=#" + i + "]")[0]) && n.is(":visible")) : /input|select|textarea|button|object/.test(s) ? !e.disabled : "a" === s && e.href || o
                            }(this)
                        }) : []
                    },
                    toggle: function (e, t, i) {
                        E(Ne.body);
                        var n = e.tooltip,
                            o = e.options.show.modal,
                            s = o.effect,
                            r = t ? "show" : "hide",
                            a = c.is(":visible"),
                            l = E(Ie).filter(":visible:not(:animated)").not(n);
                        return u.update(e),
                        t && o.stealfocus !== x && h(E(":focus")),
                            c.toggleClass("blurs", o.blur),
                        t && c.appendTo(Ne.body),
                        c.is(":animated") && a === t && d !== x || !t && l.length || (c.stop(C, x), E.isFunction(s) ? s.call(c, t) : s === x ? c[r]() : c.fadeTo(parseInt(i, 10) || 90, t ? 1 : 0, function () {
                            t || c.hide()
                        }), t || c.queue(function (e) {
                            c.css({
                                left: "",
                                top: ""
                            }),
                            E(Ie).length || c.detach(),
                                e()
                        }), d = t, p.destroyed && (p = y)),
                            u
                    }
                }),
                    u.init()
            }),
                E.extend(Se.prototype, {
                    init: function (e) {
                        var s = e.tooltip;
                        if (!this.options.on) return this;
                        e.elements.overlay = ve.elem,
                            s.addClass(ye).css("z-index", h.modal_zindex + E(Ie).length),
                            e._bind(s, ["tooltipshow", "tooltiphide"], function (e, t, i) {
                                var n = e.originalEvent;
                                if (e.target === s[0]) if (n && "tooltiphide" === e.type && /mouse(leave|enter)/.test(n.type) && E(n.relatedTarget).closest(ve.elem[0]).length) try {
                                    e.preventDefault()
                                } catch (e) {} else(!n || n && "tooltipsolo" !== n.type) && this.toggle(e, "tooltipshow" === e.type, i)
                            }, this._ns, this),
                            e._bind(s, "tooltipfocus", function (e, t) {
                                if (!e.isDefaultPrevented() && e.target === s[0]) {
                                    var i = E(Ie),
                                        n = h.modal_zindex + i.length,
                                        o = parseInt(s[0].style.zIndex, 10);
                                    ve.elem[0].style.zIndex = n - 1,
                                        i.each(function () {
                                            this.style.zIndex > o && (this.style.zIndex -= 1)
                                        }),
                                        i.filter("." + r).qtip("blur", e.originalEvent),
                                        s.addClass(r)[0].style.zIndex = n,
                                        ve.update(t);
                                    try {
                                        e.preventDefault()
                                    } catch (e) {}
                                }
                            }, this._ns, this),
                            e._bind(s, "tooltiphide", function (e) {
                                e.target === s[0] && E(Ie).filter(":visible").not(s).last().qtip("focus", e)
                            }, this._ns, this)
                    },
                    toggle: function (e, t, i) {
                        if (e && e.isDefaultPrevented()) return this;
                        ve.toggle(this.qtip, !! t, i)
                    },
                    destroy: function () {
                        this.qtip.tooltip.removeClass(ye),
                            this.qtip._unbind(this.qtip.tooltip, this._ns),
                            ve.toggle(this.qtip, x),
                            delete this.qtip.elements.overlay
                    }
                }),
                (ge = w.modal = function (e) {
                    return new Se(e, e.options.show.modal)
                }).sanitize = function (e) {
                    e.show && ("object" != typeof e.show.modal ? e.show.modal = {
                        on: !! e.show.modal
                    } : void 0 === e.show.modal.on && (e.show.modal.on = C))
                },
                h.modal_zindex = h.zindex - 200,
                ge.initialize = "render",
                t.modal = {
                    "^show.modal.(on|blur)$": function () {
                        this.destroy(),
                            this.init(),
                            this.qtip.elems.overlay.toggle(0 < this.qtip.tooltip[0].offsetWidth)
                    }
                },
                E.extend(C, h.defaults, {
                    show: {
                        modal: {
                            on: x,
                            effect: C,
                            blur: C,
                            stealfocus: C,
                            escape: C
                        }
                    }
                }),
                w.viewport = function (e, I, t, i, n, o, s) {
                    var r, S, a, O, b, N, R, E, C, l = t.target,
                        p = e.elements.tooltip,
                        w = t.my,
                        T = t.at,
                        d = t.adjust,
                        c = d.method.split(" "),
                        u = c[0],
                        h = c[1] || c[0],
                        m = t.viewport,
                        f = t.container,
                        g = e.cache,
                        v = {
                            left: 0,
                            top: 0
                        };
                    if (!m.jquery || l[0] === be || l[0] === Ne.body || "none" === d.method) return v;

                    function y(e, t, i, n, o, s, r, a, l) {
                        var p = I[o],
                            d = w[e],
                            c = T[e],
                            u = i === F,
                            h = d === o ? l : d === s ? -l : -l / 2,
                            m = c === o ? a : c === s ? -a : -a / 2,
                            f = E[o] + C[o] - (b ? 0 : O[o]),
                            g = f - p,
                            v = p + l - (r === D ? N : R) - f,
                            y = h - (w.precedance === e || d === w[t] ? m : 0) - (c === X ? a / 2 : 0);
                        return u ? (y = (d === o ? 1 : -1) * h, I[o] += 0 < g ? g : 0 < v ? -v : 0, I[o] = Math.max(-O[o] + C[o], p - y, Math.min(Math.max(-O[o] + C[o] + (r === D ? N : R), p + y), I[o], "center" === d ? p - h : 1e9))) : (n *= i === Y ? 2 : 0, 0 < g && (d !== o || 0 < v) ? (I[o] -= y + n, S.invert(e, o)) : 0 < v && (d !== s || 0 < g) && (I[o] -= (d === X ? -y : y) + n, S.invert(e, s)), I[o] < E && -I[o] > v && (I[o] = p, S = w.clone())),
                        I[o] - p
                    }
                    return O = f.offset() || v,
                        b = "static" === f.css("position"),
                        r = "fixed" === p.css("position"),
                        N = m[0] === be ? m.width() : m.outerWidth(x),
                        R = m[0] === be ? m.height() : m.outerHeight(x),
                        E = {
                            left: r ? 0 : m.scrollLeft(),
                            top: r ? 0 : m.scrollTop()
                        },
                        C = m.offset() || v,
                    "shift" === u && "shift" === h || (S = w.clone()),
                        v = {
                            left: "none" !== u ? y(P, _, u, d.x, k, M, D, i, o) : 0,
                            top: "none" !== h ? y(_, P, h, d.y, $, A, L, n, s) : 0
                        },
                    S && g.lastClass !== (a = B + "-pos-" + S.abbrev()) && p.removeClass(e.cache.lastClass).addClass(e.cache.lastClass = a),
                        v
                },
                w.polys = {
                    polygon: function (e, t) {
                        var i, n, o, s = {
                                width: 0,
                                height: 0,
                                position: {
                                    top: 1e10,
                                    right: 0,
                                    bottom: 0,
                                    left: 1e10
                                },
                                adjustable: x
                            },
                            r = 0,
                            a = [],
                            l = 1,
                            p = 1,
                            d = 0,
                            c = 0;
                        for (r = e.length; r--;)(i = [parseInt(e[--r], 10), parseInt(e[r + 1], 10)])[0] > s.position.right && (s.position.right = i[0]),
                        i[0] < s.position.left && (s.position.left = i[0]),
                        i[1] > s.position.bottom && (s.position.bottom = i[1]),
                        i[1] < s.position.top && (s.position.top = i[1]),
                            a.push(i);
                        if (n = s.width = Math.abs(s.position.right - s.position.left), o = s.height = Math.abs(s.position.bottom - s.position.top), "c" === t.abbrev()) s.position = {
                            left: s.position.left + s.width / 2,
                            top: s.position.top + s.height / 2
                        };
                        else {
                            for (; 0 < n && 0 < o && 0 < l && 0 < p;) for (n = Math.floor(n / 2), o = Math.floor(o / 2), t.x === k ? l = n : t.x === M ? l = s.width - n : l += Math.floor(n / 2), t.y === $ ? p = o : t.y === A ? p = s.height - o : p += Math.floor(o / 2), r = a.length; r-- && !(a.length < 2);) d = a[r][0] - s.position.left,
                                c = a[r][1] - s.position.top,
                            (t.x === k && l <= d || t.x === M && d <= l || t.x === X && (d < l || d > s.width - l) || t.y === $ && p <= c || t.y === A && c <= p || t.y === X && (c < p || c > s.height - p)) && a.splice(r, 1);
                            s.position = {
                                left: a[0][0],
                                top: a[0][1]
                            }
                        }
                        return s
                    },
                    rect: function (e, t, i, n) {
                        return {
                            width: Math.abs(i - e),
                            height: Math.abs(n - t),
                            position: {
                                left: Math.min(e, i),
                                top: Math.min(t, n)
                            }
                        }
                    },
                    _angles: {
                        tc: 1.5,
                        tr: 7 / 4,
                        tl: 5 / 4,
                        bc: .5,
                        br: .25,
                        bl: .75,
                        rc: 2,
                        lc: 1,
                        c: 0
                    },
                    ellipse: function (e, t, i, n, o) {
                        var s = w.polys._angles[o.abbrev()],
                            r = 0 === s ? 0 : i * Math.cos(s * Math.PI),
                            a = n * Math.sin(s * Math.PI);
                        return {
                            width: 2 * i - Math.abs(r),
                            height: 2 * n - Math.abs(a),
                            position: {
                                left: e + r,
                                top: t + a
                            },
                            adjustable: x
                        }
                    },
                    circle: function (e, t, i, n) {
                        return w.polys.ellipse(e, t, i, i, n)
                    }
                },
                w.svg = function (e, t, i) {
                    for (var n, o, s, r, a, l, p, d, c, u, h, m = E(Ne), f = t[0], g = E(f.ownerSVGElement), v = !0; !f.getBBox;) f = f.parentNode;
                    if (!f.getBBox || !f.parentNode) return x;
                    n = g.attr("width") || g.width() || parseInt(g.css("width"), 10),
                        o = g.attr("height") || g.height() || parseInt(g.css("height"), 10);
                    var y = (parseInt(t.css("stroke-width"), 10) || 0) / 2;
                    switch (y && (y / n, y / o), f.nodeName) {
                        case "ellipse":
                        case "circle":
                            u = w.polys.ellipse(f.cx.baseVal.value, f.cy.baseVal.value, (f.rx || f.r).baseVal.value + y, (f.ry || f.r).baseVal.value + y, i);
                            break;
                        case "line":
                        case "polygon":
                        case "polyline":
                            for (u = [], d = -1, l = (c = f.points || [{
                                x: f.x1.baseVal.value,
                                y: f.y1.baseVal.value
                            },
                                {
                                    x: f.x2.baseVal.value,
                                    y: f.y2.baseVal.value
                                }]).numberOfItems || c.length; ++d < l;) p = c.getItem ? c.getItem(d) : c[d],
                                u.push.apply(u, [p.x, p.y]);
                            u = w.polys.polygon(u, i);
                            break;
                        default:
                            v = !(u = {
                                width: (u = f.getBoundingClientRect()).width,
                                height: u.height,
                                position: {
                                    left: u.left,
                                    top: u.top
                                }
                            })
                    }
                    return h = u.position,
                        g = g[0],
                    v && (g.createSVGPoint && (s = f.getScreenCTM(), (c = g.createSVGPoint()).x = h.left, c.y = h.top, r = c.matrixTransform(s), h.left = r.x, h.top = r.y), g.viewBox && (a = g.viewBox.baseVal) && a.width && a.height && (n / a.width, o / a.height)),
                        h.left += m.scrollLeft(),
                        h.top += m.scrollTop(),
                        u
                },
                w.imagemap = function (e, t, i, n) {
                    t.jquery || (t = E(t));
                    var o, s, r, a, l, p = t.attr("shape").toLowerCase().replace("poly", "polygon"),
                        d = E('img[usemap="#' + t.parent("map").attr("name") + '"]'),
                        c = E.trim(t.attr("coords")).replace(/,$/, "").split(",");
                    if (!d.length) return x;
                    if ("polygon" === p) a = w.polys.polygon(c, i);
                    else {
                        if (!w.polys[p]) return x;
                        for (r = -1, l = c.length, s = []; ++r < l;) s.push(parseInt(c[r], 10));
                        a = w.polys[p].apply(this, s.concat(i))
                    }
                    return (o = d.offset()).left += Math.ceil((d.outerWidth(x) - d.width()) / 2),
                        o.top += Math.ceil((d.outerHeight(x) - d.height()) / 2),
                        a.position.left += o.left,
                        a.position.top += o.top,
                        a
                };

            function Oe(e, t) {
                this._ns = "ie6",
                    this.init(this.qtip = e)
            }
            E.extend(Oe.prototype, {
                _scroll: function () {
                    var e = this.qtip.elements.overlay;
                    e && (e[0].style.top = E(be).scrollTop() + "px")
                },
                init: function (e) {
                    var t = e.tooltip;
                    E("select, object").length < 1 && (this.bgiframe = e.elements.bgiframe = E('<iframe class="qtip-bgiframe" frameborder="0" tabindex="-1" src="javascript:\'\';"  style="display:block; position:absolute; z-index:-1; filter:alpha(opacity=0); -ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";"></iframe>').appendTo(t), e._bind(t, "tooltipmove", this.adjustBGIFrame, this._ns, this)),
                        this.redrawContainer = E("<div/>", {
                            id: B + "-rcontainer"
                        }).appendTo(Ne.body),
                    e.elements.overlay && e.elements.overlay.addClass("qtipmodal-ie6fix") && (e._bind(be, ["scroll", "resize"], this._scroll, this._ns, this), e._bind(t, ["tooltipshow"], this._scroll, this._ns, this)),
                        this.redraw()
                },
                adjustBGIFrame: function () {
                    var e, t, i = this.qtip.tooltip,
                        n = {
                            height: i.outerHeight(x),
                            width: i.outerWidth(x)
                        },
                        o = this.qtip.plugins.tip,
                        s = this.qtip.elements.tip;
                    t = {
                        left: -(t = parseInt(i.css("borderLeftWidth"), 10) || 0),
                        top: -t
                    },
                    o && s && (t[(e = "x" === o.corner.precedance ? [D, k] : [L, $])[1]] -= s[e[0]]()),
                        this.bgiframe.css(t).css(n)
                },
                redraw: function () {
                    if (this.qtip.rendered < 1 || this.drawing) return this;
                    var e, t, i, n, o = this.qtip.tooltip,
                        s = this.qtip.options.style,
                        r = this.qtip.options.position.container;
                    return this.qtip.drawing = 1,
                    s.height && o.css(L, s.height),
                        s.width ? o.css(D, s.width) : (o.css(D, "").appendTo(this.redrawContainer), (t = o.width()) % 2 < 1 && (t += 1), e = -1 < ((i = o.css("maxWidth") || "") + (n = o.css("minWidth") || "")).indexOf("%") ? r.width() / 100 : 0, t = (i = (-1 < i.indexOf("%") ? e : 1) * parseInt(i, 10) || t) + (n = (-1 < n.indexOf("%") ? e : 1) * parseInt(n, 10) || 0) ? Math.min(Math.max(t, n), i) : t, o.css(D, Math.round(t)).appendTo(r)),
                        this.drawing = 0,
                        this
                },
                destroy: function () {
                    this.bgiframe && this.bgiframe.remove(),
                        this.qtip._unbind([be, this.qtip.tooltip], this._ns)
                }
            }),
                (w.ie6 = function (e) {
                    return 6 === T.ie ? new Oe(e) : x
                }).initialize = "render",
                t.ie6 = {
                    "^content|style$": function () {
                        this.redraw()
                    }
                }
        },
            "function" == typeof define && define.amd ? define(["jquery"], e) : jQuery && !jQuery.fn.qtip && e(jQuery)
    }(window, document);
