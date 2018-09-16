//console.log("chapter");
const database = firebase.database();

let tempCurrentNote = [];
let tempDb = {};

const notes = {
    "structure": {
        init: function(dbObj) {
            database.ref("/utilities").once("value").then(snapshot => {
                tempDb = snapshot.val();
                //console.log(tempDb);
                
                if (tempDb.editMode) {
                    
                    // Displaying HTML structure for edit mode
                    const editModeComponent = document.querySelector(".edit-mode");
                    editModeComponent.classList.remove("display-none");
                    
                    this.addEventListenersForBtns();
                    this.disallowAddingNewNote();
                    this.hideNewNoteBtn();
                    this.allowSavingNote();
                    notes.note.resumeNoteCreation(tempDb.unsavedNote, dbObj);
                    
                    // Displaying snippets
                    notes.snippet.displaySnippets(tempDb.unsavedNote, dbObj);
                    
                    // Displaying tags
                    notes.tag.displayTags(tempDb.unsavedNote);

                    //this.displayNotes();
                    
                    //console.log("unsaved note exists. initiating edit mode...");
                    //console.log(dbObj);
                } else {
                    
                    this.addEventListenersForBtns();
                    this.allowAddingNewNote();
                    this.disallowSavingNote();
                    console.log(dbObj);
                    this.displayNotes(dbObj);
                    
                    //console.log("no unsaved note. starting default behavior...");
                    //console.log(dbObj);
                }
                // console.log(!tempDb.unsavedNote);
                //this.createStructure(dbObj);
            });
        },
        addEventListenersForBtns: function() {
            //console.log("creating eventlisteners for buttons...");
            
            // Add new note button
            const newNoteBtn = document.querySelector(".new-note");
            newNoteBtn.addEventListener("click", notes.eventListeners.addNewNote);
            
            // Add new snippet button
            const insertSnippetBtn = document.querySelector(".snippet-controls .insert-snippet");
            insertSnippetBtn.addEventListener("click", notes.eventListeners.insertSnippet);
            
            // Exit edit mode button
            const closeEditModeBtn = document.querySelector(".close-edit");
            closeEditModeBtn.addEventListener("click", notes.eventListeners.closeEditMode);
            
            
            // Title field eventlistener
            const noteTitleField = document.querySelector("#note-title");
            noteTitleField.addEventListener("change", notes.eventListeners.saveTitleToDb);
            
            
            // Add tag button
            const addTagBtn = document.querySelector(".add-tag");
            addTagBtn.addEventListener("click", notes.eventListeners.addTagToDb);


            // Save note button
            const saveNoteBtn = document.querySelector(".save-note");
            saveNoteBtn.addEventListener("click", notes.eventListeners.saveNote);

        },
        allowAddingNewNote: function() {
            const newNoteBtn = document.querySelector(".new-note");
            if (newNoteBtn.classList.contains("loading")) {
                newNoteBtn.classList.remove("loading");
            }
            newNoteBtn.classList.remove("disabled");
        },
        disallowAddingNewNote: function() {
            const newNoteBtn = document.querySelector(".new-note");
            if (newNoteBtn.classList.contains("loading")) {
                newNoteBtn.classList.remove("loading");
            }
            newNoteBtn.classList.add("disabled");
        },
        allowSavingNote: function() {
            const insertNoteBtn = document.querySelector(".save-note");
            if (insertNoteBtn.classList.contains("display-none")) {
                insertNoteBtn.classList.remove("display-none");
            }
        },
        disallowSavingNote: function() {
            const insertNoteBtn = document.querySelector(".save-note");
            if (!insertNoteBtn.classList.contains("display-none")) {
                insertNoteBtn.classList.add("display-none");
            }
        },
        hideNewNoteBtn: function() {
            const newNoteBtn = document.querySelector(".new-note");
            if (!newNoteBtn.classList.contains("display-none")) {
                newNoteBtn.classList.add("display-none");
            }
        },
        displayNotes: function(dbObj) {
            let currentChapter = notes.database.getCurrentChapter();

            if (!dbObj[currentChapter]) {
                console.log("no notes to display");
            } else {

                // Setting the query from db to order notes by the attribute "pos"
                let query = database.ref(`/chapters/${currentChapter}`).orderByChild("pos");
                query.once("value").then(snapshot => {
                    // This is sort of a hack to make it work properly
                    let notesArray = [];
                    snapshot.forEach(note => {
                        notesArray.push(note.key);
                    });

                    // Displaying the notes
                    notesArray.forEach(note => {
                        let noteObj = dbObj[currentChapter][note];
                        notes.createElements.createNoteElements(noteObj, note, notesArray);
                    });
                });
                console.log("displaying notes...");
            }
        }
        
    },
    "eventListeners": {
        addNewNote: function() {
            
            // Creating the note to the database
            notes.note.initiateNoteCreation();
            
            // Switching edit mode on
            notes.database.changeEditModeStatus("on");
            
            console.log("clicked to add new note");
        },
        insertSnippet: function() {
            
            // Selecting Textarea
            const snippetTextarea = document.querySelector("#snippet-textarea");
            const snippetTextareaValue = snippetTextarea.value;
            
            // Selecting entire field for validation
            const snippetInputField = document.querySelector(".snippet-input");
            
            // Testing if input textarea is empty
            if (!snippetTextareaValue) {
                
                // Displaying an "error"
                console.log("Write something to textarea to insert a snippet");
                snippetInputField.classList.add("error");
                
            } else {
                
                // Removing error from the field if it exists
                if (snippetInputField.classList.contains("error")) {
                    snippetInputField.classList.remove("error");
                }
                
                // Creating the HTML for the snippet
                //notes.createElements.constructSnippetInEditMode(snippetTextareaValue);
                
                // Add snippet to db
                notes.snippet.addSnippetToDb();
                
                // Removing snippet textarea value after it's submitted
                snippetTextarea.value = "";
            }
        },
        closeEditMode: function() {
            
            // Removing HTML structure for edit mode
            const editModeComponent = document.querySelector(".edit-mode");
            editModeComponent.classList.add("display-none");
            
            const newNoteBtn = document.querySelector(".new-note");
            newNoteBtn.classList.remove("display-none");
            newNoteBtn.classList.add("loading");
            const insertNoteBtn = document.querySelector(".save-note");
            insertNoteBtn.classList.add("display-none");
            
           
           const currentChapter = notes.database.getCurrentChapter();
           const currentNote = tempDb.unsavedNote;
           
           
           // Removing note from database
            database.ref(`/chapters/${currentChapter}`).once("value").then(chapterObj => {

                // Looping through the chapter object containing notes
                chapterObj.forEach(currentNoteObj =>{

                    // Getting the current note that's being edited
                    if (currentNoteObj.key === currentNote) {

                        // Checking the current note position agains the length of the array containing all notes
                        // If the position equals the array length then it's the last element and can be removed safely
                        if (currentNoteObj.val().pos === Object.keys(chapterObj.val()).length) {

                            notes.note.removeNote(currentChapter, currentNote);
                            console.log("it's the last note element");
                        } else {
                            
                            // Looping through the chapter object (again..) to get notes after the current note
                            chapterObj.forEach(noteObj => {
                                
                                // Creating new positions for notes that come after the current one (which will all be -1 of their current ones) and then the note can be safely removed
                                if (noteObj.val().pos > currentNoteObj.val().pos) {
                                    let newPos = noteObj.val().pos - 1;
                                    let noteId = noteObj.key;
                                    console.log(`note: ${noteId}, oldPos: ${noteObj.val().pos}, newPos: ${newPos}`);
                                    
                                    database.ref(`/chapters/${currentChapter}/${noteId}`).update({
                                        pos: newPos
                                    })
                                }
                            });

                            notes.note.removeNote(currentChapter, currentNote);
                            console.log("it's not the last note element");
                        }
                    }
                });
            });

            // Switching edit mode off
            notes.database.changeEditModeStatus("off");
            
            location.reload();
            console.log("closed edit mode");
        },
        saveTitleToDb: function() {
            database.ref("/utilities").once("value").then(snapshot => {
                let currentChapter = notes.database.getCurrentChapter();
                let currentNote = snapshot.val().unsavedNote;
                const noteTitleFieldValue = document.querySelector("#note-title").value;
                
                console.log(currentChapter);
                console.log(currentNote);
                
                database.ref(`chapters/${currentChapter}/${currentNote}`).update({
                    title: noteTitleFieldValue
                });
                
            });
        },
        editSnippet: function(e) {
            
            // Snippet elements
            const snippetSegmentOuter = e.target.parentElement.parentElement;
            const snippetSegmentInner = e.target.parentElement;
            const snippetButtonsContainer = snippetSegmentInner.parentElement.children[1];
            
            // Making the snippet element "highlighted" when clicked upon
            snippetSegmentInner.classList.add("yellow");
            snippetSegmentInner.classList.remove("secondary");
            snippetButtonsContainer.classList.remove("display-none");
            snippetSegmentOuter.classList.add("compact");            
            
            // Getting the id of the snippet that was clicked on
            snippetId = snippetSegmentOuter.getAttribute("id");
            // Getting all the snippet elements
            const snippetsArray = snippetSegmentOuter.parentElement.children;
            
            
            // Hiding the "move up" button for the first snippet
            snippetsArray[0].children[1].children[4].classList.add("display-none");
            // Hiding the "move down" button for the last snippet
            snippetsArray[snippetsArray.length - 1].children[1].children[3].classList.add("display-none");
            
            //console.log(snippetsArray[snippetsArray.length - 1].children[1].children[3]);
            
            
            
            // Setting all the other snippets that weren't clicked on (but perhaps were previously) back to their inactive states (not "highlighted" state)
            for (let i = 0; i < snippetsArray.length; i++) {
                if (snippetsArray[i].getAttribute("id") !== snippetId) {
                    
                    if (snippetsArray[i].classList.contains("compact")) {
                        snippetsArray[i].classList.remove("compact");
                    }
                    if (snippetsArray[i].children[0].classList.contains("yellow")) {
                        snippetsArray[i].children[0].classList.remove("yellow");
                    }
                    if (!snippetsArray[i].children[0].classList.contains("secondary")) {
                        snippetsArray[i].children[0].classList.add("secondary");
                    }
                    if (!snippetsArray[i].children[1].classList.contains("display-none")) {
                        snippetsArray[i].children[1].classList.add("display-none");
                    }
                    
                    // Removes the display-none that's applied with the snippet text edit button
                    if (snippetsArray[i].children[0].children[0].classList.contains("display-none")) {
                        snippetsArray[i].children[0].children[0].classList.remove("display-none");
                    }
                    if (snippetsArray[i].children[0].children[1]) {
                        // Removes the textarea container
                        snippetsArray[i].children[0].removeChild(snippetsArray[i].children[0].children[1]);
                    }
                    
                    // Hiding the save edited text button
                    if (!snippetsArray[i].children[1].children[0].classList.contains("display-none")) {
                        snippetsArray[i].children[1].children[0].classList.add("display-none");
                    }
                    
                    // Displaying all other buttons
                    for (let j = 1; j < snippetsArray[i].children[1].children.length; j++) {
                        if (snippetsArray[i].children[1].children[j].classList.contains("display-none")) {
                            snippetsArray[i].children[1].children[j].classList.remove("display-none");
                        }
                    }
                    
                    // Hiding the "move up" button for the first snippet and displaying it on all others
                    if (i === 0) {
                        if (!snippetsArray[i].children[1].children[4].classList.contains("display-none")) {
                            snippetsArray[i].children[1].children[4].classList.add("display-none");
                        }
                    } else {
                        if (snippetsArray[i].children[1].children[4].classList.contains("display-none")) {
                            snippetsArray[i].children[1].children[4].classList.remove("display-none");
                        }
                    }
                    
                    // Hiding the "move down" button for the last snippet and displaying it on all others
                    if (i === snippetsArray.length - 1) {
                        if (!snippetsArray[i].children[1].children[3].classList.contains("display-none")) {
                            snippetsArray[i].children[1].children[3].classList.add("display-none");
                        }
                    } else {
                        if (snippetsArray[i].children[1].children[3].classList.contains("display-none")) {
                            snippetsArray[i].children[1].children[3].classList.remove("display-none");
                        }
                    }
                }
            }
            
            
            console.log(snippetId);
            
        },
        deleteSnippet: function(e) {
            
            // Getting snippetId
            let snippetId;
            
            if (e.target.tagName === "I") {
                snippetId = e.path[3].getAttribute("id");
            }
            if (e.target.tagName === "BUTTON") {
                snippetId = e.path[2].getAttribute("id");
            }
            
            // Getting current chapter and note ids from snippet id
            const id = snippetId.split("-");
            let currentChapter = `${id[0]}-${id[1]}-${id[2]}`;
            let currentNote = `note_${currentChapter}-${id[3]}`;
            
            // Removing snippet from db
            //database.ref(`chapters/${currentChapter}/${currentNote}/snippets/${snippetId}`).remove();
            
            database.ref(`chapters/${currentChapter}/${currentNote}/snippets`).once("value").then(snapshot => {
                snapshot.forEach(childSnapshot => {
                    if (childSnapshot.key === snippetId) {
                        //console.log(childSnapshot.key);
                        //console.log(childSnapshot.val());
                        //console.log(Object.keys(snapshot.val()).length);
                        
                        if (childSnapshot.val().pos === Object.keys(snapshot.val()).length) {
                            
                            // Removing last element
                            database.ref(`chapters/${currentChapter}/${currentNote}/snippets/${snippetId}`).remove();
                        } else {
                            //console.log(snapshot.val());
                            
                            // Getting all the elements after the element about to be deleted and changing their position value
                            snapshot.forEach(snippet => {
                                if (snippet.val().pos > childSnapshot.val().pos) {
                                    let snippetPos = snippet.val().pos - 1;
                                    let snippetKey = snippet.key;
                                    database.ref(`chapters/${currentChapter}/${currentNote}/snippets/${snippetKey}`).update({
                                        pos: snippetPos
                                    });
                                }
                            });
                            // Removing last element
                            database.ref(`chapters/${currentChapter}/${currentNote}/snippets/${snippetId}`).remove();
                        }
                    }
                });
                //console.log(snapshot.val());
            });
            
        },
        editSnippetText: function(e) {
            
            // console.log(e);
            
            // Getting snippetId
            let snippetId;
            let snippetTextElement;
            
            if (e.target.tagName === "I") {
                snippetId = e.path[3].getAttribute("id");
                snippetTextElement = e.path[3].children[0];
            }
            if (e.target.tagName === "BUTTON") {
                snippetId = e.path[2].getAttribute("id");
                snippetTextElement = e.path[2].children[0];
            }
            
            // Creating the textarea elements
            const inputContainer = document.createElement("div");
            inputContainer.classList.add("ui", "form");
            snippetTextElement.appendChild(inputContainer);
            
            const inputField = document.createElement("div");
            inputField.classList.add("field");
            inputContainer.appendChild(inputField);
            
            const inputTextarea = document.createElement("textarea");
            inputTextarea.setAttribute("id", "edit-snippet-text");
            inputTextarea.setAttribute("placeholder", "Edit snippet text");
            inputField.appendChild(inputTextarea);
            
            // Setting the value of the textarea
            inputTextarea.innerText = snippetTextElement.children[0].innerText;
            
            // Hides the paragraph element of the snippet when edited
            snippetTextElement.children[0].classList.add("display-none");
            
            // Displays the green save snippet button
            snippetTextElement.parentElement.children[1].children[0].classList.remove("display-none");
            
            for (let i = 1; i < snippetTextElement.parentElement.children[1].children.length; i++) {
                snippetTextElement.parentElement.children[1].children[i].classList.add("display-none");
            }
            
            // console.log(snippetId);
        },
        saveEditedSnippetText: function(e) {
            //console.log(e);
            
            // Getting snippetId
            let snippetId;
            let snippetTextElement;
            
            if (e.target.tagName === "I") {
                snippetId = e.path[3].getAttribute("id");
                snippetTextElement = e.path[3].children[0];
            }
            if (e.target.tagName === "BUTTON") {
                snippetId = e.path[2].getAttribute("id");
                snippetTextElement = e.path[2].children[0];
            }
            //console.log(snippetId);
            //console.log(snippetTextElement.children[1].children[0].children[0]);
            //console.log(snippetTextElement.children[1].children[0].children[0].value);
            
            let textareaValue = snippetTextElement.children[1].children[0].children[0].value;
            
            const id = snippetId.split("-");
            let currentChapter = `${id[0]}-${id[1]}-${id[2]}`;
            let currentNote = `note_${currentChapter}-${id[3]}`;
            
            
            database.ref(`chapters/${currentChapter}/${currentNote}/snippets/${snippetId}`).update({
                text: textareaValue
            });
        },
        moveSnippetUp: function(e) {
            console.log("moved snippet up");
            
            // Getting snippetId
            let snippetId;
            
            if (e.target.tagName === "I") {
                snippetId = e.path[3].getAttribute("id");
            }
            if (e.target.tagName === "BUTTON") {
                snippetId = e.path[2].getAttribute("id");
            }
            //console.log(snippetId);
            
            // Getting current chapter and note ids from snippet id
            const id = snippetId.split("-");
            let currentChapter = `${id[0]}-${id[1]}-${id[2]}`;
            let currentNote = `note_${currentChapter}-${id[3]}`;
            
            database.ref(`chapters/${currentChapter}/${currentNote}/snippets`).once("value").then(snapshot =>{
                // Getting the current snippet position
                let snippetCurrentPos = snapshot.val()[snippetId].pos;
                let snippetToBeMovedUp = snippetId;
                //console.log(snippetCurrentPos);
                //console.log(snippetToBeMovedUp);
                
                // Creating new position for snippet
                let snippetNewPos = snippetCurrentPos - 1;
                //console.log(snippetNewPos);
                
                // Getting the snippet that's moved down
                let snippetToBeMovedDown;
                snapshot.forEach(childSnapshot => {
                    if (childSnapshot.val().pos === snippetNewPos) {
                        snippetToBeMovedDown = childSnapshot.key;
                    }
                });
                //console.log(snippetToBeMovedDown);
                
                database.ref(`chapters/${currentChapter}/${currentNote}/snippets/${snippetToBeMovedUp}`).update({
                    pos: snippetNewPos
                });
                database.ref(`chapters/${currentChapter}/${currentNote}/snippets/${snippetToBeMovedDown}`).update({
                    pos: snippetCurrentPos
                });
            });
        },
        moveSnippetDown: function(e) {
            console.log("moved snippet down");
            
            // Getting snippetId
            let snippetId;
            
            if (e.target.tagName === "I") {
                snippetId = e.path[3].getAttribute("id");
            }
            if (e.target.tagName === "BUTTON") {
                snippetId = e.path[2].getAttribute("id");
            }
            //console.log(snippetId);
            
            // Getting current chapter and note ids from snippet id
            const id = snippetId.split("-");
            let currentChapter = `${id[0]}-${id[1]}-${id[2]}`;
            let currentNote = `note_${currentChapter}-${id[3]}`;
            
            database.ref(`chapters/${currentChapter}/${currentNote}/snippets`).once("value").then(snapshot =>{
                // Getting the current snippet position
                let snippetCurrentPos = snapshot.val()[snippetId].pos;
                let snippetToBeMovedDown = snippetId;
                //console.log(snippetCurrentPos);
                //console.log(snippetToBeMovedDown);
                
                
                // Creating new position for snippet
                let snippetNewPos = snippetCurrentPos + 1;
                //console.log(snippetNewPos);
                
                // Getting the snippet that's moved down
                let snippetToBeMovedUp;
                snapshot.forEach(childSnapshot => {
                    if (childSnapshot.val().pos === snippetNewPos) {
                        snippetToBeMovedUp = childSnapshot.key;
                    }
                });
                //console.log(snippetToBeMovedUp);
                
                database.ref(`chapters/${currentChapter}/${currentNote}/snippets/${snippetToBeMovedDown}`).update({
                    pos: snippetNewPos
                });
                database.ref(`chapters/${currentChapter}/${currentNote}/snippets/${snippetToBeMovedUp}`).update({
                    pos: snippetCurrentPos
                });
            });
        },
        addTagToDb: function() {
            // Getting the tag input field
            const tagInput = document.querySelector("#tags-field");
            
            // Testing that the input string is not blank
            if (tagInput.value !== "") {
                
                // Removing validation if there was one
                if (tagInput.parentElement.classList.contains("error")) {
                    tagInput.parentElement.classList.remove("error");
                }
                
                database.ref(`utilities/`).once("value").then(snapshot => {
                    
                    let currentNote = snapshot.val().unsavedNote;
                    let currentChapter = notes.database.getCurrentChapter();
                    
                    database.ref(`chapters/${currentChapter}/${currentNote}`).once("value").then(db => {
                        
                        // Getting the tags array from db (if there is one)
                        let tagsArray;
                        if (db.val().tags === undefined) {
                            tagsArray = [];
                        } else {
                            tagsArray = db.val().tags;
                        }
                        
                        // Checks if the tag is already inserted and doesn't insert anything if it's already in db
                        if (!tagsArray.includes(tagInput.value)) {
                            // Updating the tags array
                            tagsArray.push(tagInput.value);
                            database.ref(`chapters/${currentChapter}/${currentNote}`).update({
                                tags: tagsArray
                            });
                            
                            // Creating elements for tags
                            notes.createElements.createTagsForEditMode(tagsArray);
                        } else {
                            // Just clears the input if tag already exists
                            tagInput.value = "";
                        }
                    });
                });
                
            } else {
                // If trying to insert an empty string it will not be pushed to db
                tagInput.parentElement.classList.add("error");
            }
            
            console.log("clicked to add a tag");
        },
        deleteTagsInEditMode: function(e) {
            console.log("clicked on a tag to delete");
            //console.log(e);
            
            const currentChapter = notes.database.getCurrentChapter();
            const currentNote = tempDb.unsavedNote;
            
            //console.log(currentChapter);
            //console.log(currentNote);
            
            let tagText;
            
            if (e.target.tagName === "A") {
                tagText = e.path[0].innerText;
            }
            if (e.target.tagName === "I") {
                tagText = e.path[1].innerText;
            }
            //console.log(tagText);
            
            database.ref(`chapters/${currentChapter}/${currentNote}`).once("value").then(db => {
                let tagsArray = db.val().tags;
                //console.log(tagsArray);
                let removedTagArray = tagsArray.filter(tag => {
                    return tag !== tagText;
                });
                //console.log(removedTagArray);
                
                database.ref(`chapters/${currentChapter}/${currentNote}`).update({
                    tags: removedTagArray
                });
            });
        },
        saveNote: function() {
            console.log("clicked to save note");

            let currentChapter = notes.database.getCurrentChapter();
            let currentNote = tempDb.unsavedNote;

            const noteTitleField = document.querySelector("#note-title");
            const snippetInputField = document.querySelector("#snippet-textarea");

            if (noteTitleField.parentElement.classList.contains("error")) {
                noteTitleField.parentElement.classList.remove("error");
            }
            if (snippetInputField.parentElement.classList.contains("error")) {
                snippetInputField.parentElement.classList.remove("error");
            }



            
            database.ref(`chapters/${currentChapter}/${currentNote}`).once("value").then(db => {
                let dbObj = db.val();
                console.log(dbObj);

                if (!dbObj.title) {
                    noteTitleField.parentElement.classList.add("error");
                }
                if (!dbObj.snippets) {
                    snippetInputField.parentElement.classList.add("error");
                }

                if (dbObj.title && dbObj.snippets) {
                    notes.database.changeEditModeStatus("off");

                    // Removing HTML structure for edit mode
                    const editModeComponent = document.querySelector(".edit-mode");
                    editModeComponent.classList.add("display-none");

                    // Switching edit mode off
                    notes.database.changeEditModeStatus("off");
                    const newNoteBtn = document.querySelector(".new-note");
                    newNoteBtn.classList.remove("display-none");
                    newNoteBtn.classList.add("loading");
                    const insertNoteBtn = document.querySelector(".save-note");
                    insertNoteBtn.classList.add("display-none");
                    
                    location.reload();
                    console.log("ready to save note");
                }
            });
        },
        maximizeNote: function(e) {
            console.log("clicked to maximize note display");
            //console.log(e);
            //console.log(e.target.tagName);

            let noteId;
            let noteElement;
            let buttonElements;

            if (e.target.tagName === "I") {
                noteId = e.path[6].getAttribute("id");
                noteElement = e.path[6];
                buttonElements = e.path[2].children;
            }
            if (e.target.tagName === "A") {
                noteId = e.path[5].getAttribute("id");
                noteElement = e.path[5];
                buttonElements = e.path[1].children;
            }

            //console.log(noteElement);
            //console.log(noteId);

            let noteBodySection = noteElement.children[0].children[1];
            let noteFooterSection = noteElement.children[0].children[2];

            //console.log(noteBodySection);
            //console.log(noteFooterSection);

            // Removing the bottom segment styling from the body section
            if (noteBodySection.classList.contains("bottom")) {
                noteBodySection.classList.remove("bottom");
            }
            // Removing the display-none from the footer section
            if (noteFooterSection.classList.contains("display-none")) {
                noteFooterSection.classList.remove("display-none");
            }

            let maximizeButton = buttonElements[3];
            let minimizeButton = buttonElements[4];

            // Removing the display-none from minimize button and adding it to the maximize button
            if (minimizeButton.classList.contains("display-none")) {
                minimizeButton.classList.remove("display-none");
                maximizeButton.classList.add("display-none");
            }
        },
        minimizeNote: function(e) {
            console.log("clicked to minimize note");

            //console.log(e.target.tagName);

            let noteId;
            let noteElement;
            let buttonElements;

            if (e.target.tagName === "I") {
                noteId = e.path[6].getAttribute("id");
                noteElement = e.path[6];
                buttonElements = e.path[2].children;
            }
            if (e.target.tagName === "A") {
                noteId = e.path[5].getAttribute("id");
                noteElement = e.path[5];
                buttonElements = e.path[1].children;
            }

            let noteBodySection = noteElement.children[0].children[1];
            let noteFooterSection = noteElement.children[0].children[2];

            //console.log(noteBodySection);
            //console.log(noteFooterSection);

            // Adding the bottom segment styling to the body section
            if (!noteBodySection.classList.contains("bottom")) {
                // This class needs to be removed first and added later again to make it work (framework issue, class order seems to matter)
                noteBodySection.classList.remove("attached");
                noteBodySection.classList.add("bottom", "attached");
            }
            // Adding the display-none to the footer section
            if (!noteFooterSection.classList.contains("display-none")) {
                noteFooterSection.classList.add("display-none");
            }

            let maximizeButton = buttonElements[3];
            let minimizeButton = buttonElements[4];

            // Removing the display-none from maximize button and adding it to the minimize button
            if (maximizeButton.classList.contains("display-none")) {
                maximizeButton.classList.remove("display-none");
                minimizeButton.classList.add("display-none");
            }

        },
        editNote: function(e) {
            console.log("clicked to edit note");

            //console.log(e.target.tagName);

            let noteId;

            if (e.target.tagName === "I") {
                noteId = e.path[6].getAttribute("id");
            }
            if (e.target.tagName === "A") {
                noteId = e.path[5].getAttribute("id");
            }
            //console.log(noteId);

            // Displaying HTML structure for edit mode
            const editModeComponent = document.querySelector(".edit-mode");
            editModeComponent.classList.remove("display-none");
            
            notes.structure.addEventListenersForBtns();
            notes.structure.disallowAddingNewNote();
            notes.structure.hideNewNoteBtn();
            notes.structure.allowSavingNote();

            // Saving new information about the current edited note to db
            database.ref(`/utilities`).update({
                editMode: "on",
                unsavedNote: noteId
            });

            // New information to the tempDb variable (might not be necessary anymore, might refactor this out later)
            tempDb = {
                "editMode": true,
                "unsavedNote": noteId
            }

            // Getting the information from database about the current note
            database.ref(`/chapters`).once("value").then(snapshot => {
                const dbObj = snapshot.val();
                //console.log(dbObj);
                notes.note.resumeNoteCreation(tempDb.unsavedNote, dbObj);
                notes.snippet.displaySnippets(tempDb.unsavedNote, dbObj);
                notes.tag.displayTags(tempDb.unsavedNote); 
            });

        },
        moveNoteUp: function(e) {
            console.log("clicked to move note up");

            //console.log(e.target.tagName);
            
            let noteId;
            
            if (e.target.tagName === "I") {
                noteId = e.path[6].getAttribute("id");
            }
            if (e.target.tagName === "A") {
                noteId = e.path[5].getAttribute("id");
            }
            //console.log(noteId);

            const currentChapter = notes.database.getCurrentChapter();

            database.ref(`/chapters/${currentChapter}`).once("value").then(chapterObj => {

                // Getting the note positions
                let currentNotePos = chapterObj.val()[noteId].pos;
                let newNotePos = currentNotePos - 1;

                // Getting the notes to be moved
                let noteToBeMovedUp = noteId;
                let noteToBeMovedDown;

                chapterObj.forEach(noteObj => {
                    // Getting the noteId that has the "new note position" (the position the current one is move to) so they can be switched
                    if (noteObj.val().pos === newNotePos) {
                        noteToBeMovedDown = noteObj.key;
                    }
                });

                // Switching positions
                console.log()
                database.ref(`/chapters/${currentChapter}/${noteToBeMovedUp}`).update({
                    pos: newNotePos
                });
                database.ref(`/chapters/${currentChapter}/${noteToBeMovedDown}`).update({
                    pos: currentNotePos
                });

                location.reload();
                // console.log(noteToBeMovedDown);
                // console.log(currentNotePos);
                // console.log(noteToBeMovedUp);
            });
        },
        moveNoteDown: function(e) {
            console.log("clicked to move note down");

            //console.log(e.target.tagName);
            
            let noteId;
            
            if (e.target.tagName === "I") {
                noteId = e.path[6].getAttribute("id");
            }
            if (e.target.tagName === "A") {
                noteId = e.path[5].getAttribute("id");
            }
            //console.log(noteId);

            const currentChapter = notes.database.getCurrentChapter();

            database.ref(`/chapters/${currentChapter}`).once("value").then(chapterObj => {

                // Getting the note positions
                let currentNotePos = chapterObj.val()[noteId].pos;
                let newNotePos = currentNotePos + 1;

                // Getting the notes to be moved
                let noteToBeMovedDown = noteId;
                let noteToBeMovedUp;

                chapterObj.forEach(noteObj => {
                    // Getting the noteId that has the "new note position" (the position the current one is move to) so they can be switched
                    if (noteObj.val().pos === newNotePos) {
                        noteToBeMovedUp = noteObj.key;
                    }
                });

                // Switching positions
                console.log()
                database.ref(`/chapters/${currentChapter}/${noteToBeMovedDown}`).update({
                    pos: newNotePos
                });
                database.ref(`/chapters/${currentChapter}/${noteToBeMovedUp}`).update({
                    pos: currentNotePos
                });

                location.reload();
                // console.log(noteToBeMovedUp);
                // console.log(currentNotePos);
                // console.log(noteToBeMovedDown);
            });
        }
    },
    "createElements": {
        constructSnippetInEditMode: function(snippetText, snippetId) {
            
            // Selecting the container where snippets go into
            const snippetsContainer = document.querySelector(".inserted-snippets");
            
            // Creating the container for a single snippet
            const uiSegments = document.createElement("div");
            uiSegments.classList.add("ui", "segments", "snippet");
            uiSegments.setAttribute("id", snippetId);
            snippetsContainer.appendChild(uiSegments);
            
            this.createSnippetTextElements(uiSegments, snippetText);
            this.createSnippetButtonElements(uiSegments);
            
        },
        createSnippetTextElements: function(uiSegments, snippetText) {
            
            // Creating the container for the snippet text
            const uiSecondarySegment = document.createElement("div");
            uiSecondarySegment.classList.add("ui", "secondary", "segment", "snippet-text");
            uiSegments.appendChild(uiSecondarySegment);
            
            // Creating the snippet text element
            const snippetParagraph = document.createElement("p");
            uiSecondarySegment.appendChild(snippetParagraph);
            const snippetParagraphText = document.createTextNode(snippetText);
            snippetParagraph.appendChild(snippetParagraphText);
            
            // Adding an eventlistener to the snippet text element
            snippetParagraph.addEventListener("click", notes.eventListeners.editSnippet);
        },
        createSnippetButtonElements: function(uiSegments) {
            // Creating the controls segment for buttons
            uiSegmentControls = document.createElement("div");
            uiSegmentControls.classList.add("ui", "secondary", "segment", "snippet-buttons", "display-none");
            uiSegments.appendChild(uiSegmentControls);
            
            // Specifying button types in an array
            const buttonTypeArray = [
                {
                    "type": ["save"],
                    "function": notes.eventListeners.saveEditedSnippetText,
                    "color": "green",
                    "display": false
                    
                }, 
                {
                    "type": ["pencil"],
                    "function": notes.eventListeners.editSnippetText,
                    "color": "yellow",
                    "display": true
                }, 
                {
                    "type": ["trash", "alternate"],
                    "function": notes.eventListeners.deleteSnippet,
                    "color": "red",
                    "display": true
                }, 
                {
                    "type": ["long", "arrow", "down", "alternate"],
                    "function": notes.eventListeners.moveSnippetDown,
                    "display": true
                }, 
                {
                    "type": ["long", "arrow", "up", "alternate"],
                    "function": notes.eventListeners.moveSnippetUp,
                    "display": true
                }
            ];
            
            // Looping through button type array and adding buttons to the control segment
            for (let i = 0; i < buttonTypeArray.length; i++) {
                
                // Creating button element
                uiSegmentButton = document.createElement("button");
                uiSegmentButton.classList.add("ui", "icon", "button");
                uiSegmentControls.appendChild(uiSegmentButton);
                
                // Creating icon element for the button
                uiSegmentButtonIcon = document.createElement("i");
                uiSegmentButtonIcon.classList.add("icon");
                uiSegmentButton.appendChild(uiSegmentButtonIcon);
                
                // Adding types to icons
                buttonTypeArray[i].type.forEach(type => {
                    uiSegmentButtonIcon.classList.add(type);
                });
                
                // Adds colors to buttons
                if (buttonTypeArray[i].color) {
                    uiSegmentButton.classList.add(buttonTypeArray[i].color);
                }
                
                // Adds eventlisteners to buttons
                if (buttonTypeArray[i].function) {
                    uiSegmentButton.addEventListener("click", buttonTypeArray[i].function);
                }
                
                // Adding display properties
                if (!buttonTypeArray[i].display) {
                    uiSegmentButton.classList.add("display-none");
                } else {
                    if (uiSegmentButton.classList.contains("display-none")) {
                        uiSegmentButton.classList.remove("display-none");
                    }
                }
            }
        },
        createTagsForEditMode: function(tagsArray) {
            //
            const tagsContainer = document.querySelector(".tags-container");
            tagsContainer.innerHTML = "";
            //console.log(tagsContainer);
            //console.log(tagsArray);
            //console.log(dbObj);
            const tagInput = document.querySelector("#tags-field");
            tagInput.value = "";
            
            if (tagsArray) {
                tagsArray.forEach(tag => {
                    // Creating an anchor element as the tag label
                    const tagLabel = document.createElement("a");
                    tagLabel.classList.add("ui", "label");
                    tagLabel.addEventListener("click", notes.eventListeners.deleteTagsInEditMode);
                    
                    // Creating tag text and close icon
                    const tagText = document.createTextNode(tag);
                    const tagCloseIcon = document.createElement("i");
                    tagCloseIcon.classList.add("icon", "close");
                    
                    // Appending tag text and close icon to label
                    tagLabel.appendChild(tagText);
                    tagLabel.appendChild(tagCloseIcon);
                    
                    // Appending tag label to container
                    tagsContainer.appendChild(tagLabel);
                });
            }
        },
        createNoteElements: function(noteObj, noteId, notesArray) {
            //console.log(noteObj);

            // Getting the main container for all notes
            const notesListContainer = document.querySelector(".notes-list");
            
            // Creating the section element for one note
            const noteElement = document.createElement("section");
            noteElement.classList.add("note");
            noteElement.setAttribute("id", noteId);
            notesListContainer.appendChild(noteElement);

            // Creating the container element for note subsection elements
            const noteContainer = document.createElement("div");
            noteContainer.classList.add("ui", "container");
            noteElement.appendChild(noteContainer);

            this.createNoteTitleSubsection(noteContainer, noteObj, notesArray);
            this.createNoteBodySubsection(noteContainer, noteObj);
            this.createNoteFooterSubsection(noteContainer, noteObj);

        },
        createNoteTitleSubsection: function(noteContainer, noteObj, notesArray) {

            //console.log(noteObj);
            
            // Creating the top segment as a title container
            const titleSectionContainer = document.createElement("div");
            titleSectionContainer.classList.add("ui", "top", "attached", "secondary", "segment");
            noteContainer.appendChild(titleSectionContainer);

            // Creating the two column grid
            const titleSectionGrid = document.createElement("div");
            titleSectionGrid.classList.add("ui", "stackable", "two", "column", "grid");
            titleSectionContainer.appendChild(titleSectionGrid);

            // Creating the left column
            const titleSectionLeftColumn = document.createElement("div");
            titleSectionLeftColumn.classList.add("column", "middle", "aligned");
            titleSectionGrid.appendChild(titleSectionLeftColumn);

            // Creating the note title Element
            const titleSectionTitleElement = document.createElement("h3");
            titleSectionTitleElement.classList.add("ui", "header");
            titleSectionTitleElement.innerText = noteObj.title;
            titleSectionLeftColumn.appendChild(titleSectionTitleElement);

            // Creating the right column
            const titleSectionRightColumn = document.createElement("div");
            titleSectionRightColumn.classList.add("column", "right", "aligned");
            titleSectionGrid.appendChild(titleSectionRightColumn);

            this.createNoteTitleSubsectionButtons(titleSectionRightColumn, noteObj, notesArray);
            
            //console.log(noteContainer);
        },
        createNoteTitleSubsectionButtons: function(titleSectionRightColumn, noteObj, notesArray) {
            //console.log(titleSectionRightColumn);
            //console.log(noteObj);
            //console.log(notesArray);

            // Object to hold button information
            const buttonArray = [
                {
                    "type": ["pencil"],
                    "display": true,
                    "function": notes.eventListeners.editNote,
                    "href": "edit-mode"
                },
                {
                    "type": ["angle", "up"],
                    "display": true,
                    "function": notes.eventListeners.moveNoteUp
                },
                {
                    "type": ["angle", "down"],
                    "display": true,
                    "function": notes.eventListeners.moveNoteDown
                },
                {
                    "type": ["window", "maximize", "outline"],
                    "display": true,
                    "function": notes.eventListeners.maximizeNote
                },
                {
                    "type": ["window", "minimize", "outline"],
                    "display": false,
                    "function": notes.eventListeners.minimizeNote
                }
            ];

            // Loop to generate elements
            buttonArray.forEach(button => {
                //console.log(button.type);

                // Creating the button element
                const buttonElement = document.createElement("a");
                buttonElement.classList.add("ui", "basic", "icon", "button");
                titleSectionRightColumn.appendChild(buttonElement);

                // Creating button icon element
                const buttonIconElement = document.createElement("i");
                buttonIconElement.classList.add("icon");
                buttonElement.appendChild(buttonIconElement);

                // Adding icon type classes
                button.type.forEach(type => {
                    buttonIconElement.classList.add(type);
                });

                if (button.href) {
                    buttonElement.setAttribute("href", `#${button.href}`);
                }

                if (!button.display) {
                    buttonElement.classList.add("display-none");
                }

                if (button.function) {
                    buttonElement.addEventListener("click", button.function);
                } 
            });

            const moveUpButton = titleSectionRightColumn.children[1];
            const moveDownButton = titleSectionRightColumn.children[2];

            // Removes the move up button for the first note, but allows it for all others
            if (noteObj.pos === 1) {
                if (!moveUpButton.classList.contains("display-none")) {
                    moveUpButton.classList.add("display-none");
                }
            } else {
                if (moveUpButton.classList.contains("display-none")) {
                    moveUpButton.classList.remove("display-none");
                }
            }   

            // Removes the move down button for the last note, but allows it for all others
            if (noteObj.pos === notesArray.length) {
                if (!moveDownButton.classList.contains("display-none")) {
                    moveDownButton.classList.add("display-none");
                }
            } else {
                if (moveDownButton.classList.contains("display-none")) {
                    moveDownButton.classList.remove("display-none");
                }
            }

            //console.log(titleSectionRightColumn.children);
            //console.log(moveUpButton);
            //console.log(noteObj.pos);

        },
        createNoteBodySubsection: function(noteContainer, noteObj) {
            // console.log(noteContainer);
            //console.log(noteObj.snippets);

            // Creating body container element containing snippets
            const bodySectionContainer = document.createElement("div");
            bodySectionContainer.classList.add("ui", "bottom", "attached", "segment");
            noteContainer.appendChild(bodySectionContainer);
            
            
            // Creating array of snippets and looping through it while creating the snippet elements
            // Might not be the best solution, but for now it works
            let unsortedSnippetArray = Object.keys(noteObj.snippets);
            let sortedSnippetArray = [];

            // Basically using the "pos" attribute values as array positions to create an ordered array, kind of a hack.. at least for now
            unsortedSnippetArray.forEach(snippet => {
                sortedSnippetArray[noteObj.snippets[snippet].pos - 1] = snippet;
            });


            //const noteSnippetsArray = Object.keys(noteObj.snippets);
            sortedSnippetArray.forEach(snippet => {

                const snippetElement = document.createElement("p");
                bodySectionContainer.appendChild(snippetElement);

                // Getting and adding the snippet text
                let snippetText = noteObj.snippets[snippet].text;
                snippetElement.innerText = snippetText;
            });

        },
        createNoteFooterSubsection: function(noteContainer, noteObj) {

            // Creating footer container element containing two columns
            const footerSectionContainer = document.createElement("div");
            footerSectionContainer.classList.add("ui", "bottom", "attached", "secondary", "segment", "display-none");
            noteContainer.appendChild(footerSectionContainer);

            // Creating the columns container for the footer
            const footerColumnsContainer = document.createElement("div");
            footerColumnsContainer.classList.add("ui", "stackable", "two", "column", "grid");
            footerSectionContainer.appendChild(footerColumnsContainer);

            // Creating the left column
            const footerLeftColumn = document.createElement("div");
            footerLeftColumn.classList.add("column");
            footerColumnsContainer.appendChild(footerLeftColumn);

            this.createNoteFooterTags(footerLeftColumn, noteObj);

            // Creating the right column
            const footerRightColumn = document.createElement("div");
            footerRightColumn.classList.add("column", "right", "aligned");
            footerColumnsContainer.appendChild(footerRightColumn);

            // Technology labels will be added here

        },
        createNoteFooterTags: function(footerLeftColumn, noteObj) {
            
            // Creating the tags container element
            const tagsContainer = document.createElement("div");
            tagsContainer.classList.add("ui", "labels");
            footerLeftColumn.appendChild(tagsContainer);

            // Getting the tags and creating an element for each one
            let tagsArray = noteObj.tags;
            if (tagsArray) {
                tagsArray.forEach(tag => {
    
                    // Creating tag elements and adding text to them
                    const tagElement = document.createElement("a");
                    tagElement.classList.add("ui", "label");
                    tagElement.innerText = tag;
                    tagsContainer.appendChild(tagElement);
                });
            }
        }
    },
    "database": {
        getCurrentChapter: function() {
            const href = window.location.pathname;
            const hrefArray = href.split("/");
            const currentChapter = hrefArray[hrefArray.length - 1].split(".")[0].split("_")[1];
            return currentChapter;
        },
        changeEditModeStatus: function(status) {
            
            // Checking status and changing edit mode value in database based on that
            if (status === "on") {
                database.ref("/utilities").update({
                    editMode: true
                });
            }
            if (status === "off") {
                database.ref("/utilities").update({
                    editMode: false,
                    unsavedNote: ""
                });
            }
        }
    },
    "note": {
        initiateNoteCreation: function() {
            database.ref("/chapters").once("value").then(snapshot => {
                const dbObj = snapshot.val();
                const currentChapter = notes.database.getCurrentChapter();
                
                // Check if current chapter exists in database
                if (!dbObj[currentChapter]) {
                    
                    // If current chapter doesn't exist in database, the first entry will be created
                    this.createFirstNote(currentChapter);
                    
                    console.log("chapter doesn't exist in db. creating new chapter...");
                } else {
                    
                    
                    console.log("chapter exists in db. no need to create a new one.");
                    
                    const maxNoteNumber = this.findMaxNoteNumberId(dbObj, currentChapter);
                    //console.log(maxNoteNumber);
                    
                    this.createNote(currentChapter, maxNoteNumber);
                }
                
                //this.removeNote(currentChapter, `note_${currentChapter}-1`);
                
            });
        },
        resumeNoteCreation: function(noteId, dbObj) {
            
            //console.log(dbObj);
            const currentChapter = notes.database.getCurrentChapter();
            
            const noteIdContainer = document.querySelector(".note-id");
            noteIdContainer.innerText = noteId.split("_")[1];
            
            const noteTitleField = document.querySelector("#note-title");
            noteTitleField.value = dbObj[currentChapter][noteId].title;
            
        },
        createFirstNote: function(currentChapter) {
            const noteId = `${currentChapter}-1`;
            const firstNoteName = `note_${noteId}`;
            database.ref(`chapters/${currentChapter}/${firstNoteName}`).set({
                snippets: {},
                tags: [],
                title: "",
                pos: 1
            });
            
            // Unsaved note name is pushed to the db
            tempCurrentNote.push(firstNoteName);
            tempDb.unsavedNote = firstNoteName;
            database.ref("/utilities").update({
                unsavedNote: firstNoteName
            });
            
            // Displaying note id on an HTML element
            const noteIdElement = document.querySelector(".note-id");
            noteIdElement.innerText = tempDb.unsavedNote.split("_")[1];
            
        },
        findMaxNoteNumberId: function(dbObj, currentChapter) {
            const notesArray = Object.keys(dbObj[currentChapter]);
            let noteNumbersArray = [];
            notesArray.forEach(note => {
                noteNumbersArray.push(note.split("-")[3]);
            });
            return Math.max.apply(Math, noteNumbersArray);
        },
        createNote: function(currentChapter, maxNoteNumber) {
            
            database.ref(`/chapters/${currentChapter}`).once("value").then(snapshot => {

                const noteName = `note_${currentChapter}-${maxNoteNumber + 1}`;
                let notesArray = Object.keys(snapshot.val());
                let pos = notesArray.length + 1;

                database.ref(`chapters/${currentChapter}/${noteName}`).set({
                    snippets: {},
                    tags: [],
                    title: "",
                    pos: pos
                });
    
                // Unsaved note name is pushed to the db
                tempCurrentNote.push(noteName);
                tempDb.unsavedNote = noteName;
                database.ref("/utilities").update({
                    unsavedNote: noteName
                });
                
                // Displaying note id on an HTML element
                const noteIdElement = document.querySelector(".note-id");
                noteIdElement.innerText = tempDb.unsavedNote.split("_")[1];
            });

        },
        removeNote: function(currentChapter, currentNote) {

            database.ref(`chapters/${currentChapter}/${currentNote}`).remove();
            const noteIdText = document.querySelector(".note-id");
            noteIdText.innerText = "";
            console.log("removed note");
        }
    },
    "snippet": {
        findMaxSnippetId: function(dbObj, currentChapter, currentNote) {
            const snippetsArray = Object.keys(dbObj[currentChapter][currentNote].snippets);
            //console.log(snippetsArray);
            
            let snippetNumbersArray = [];
            snippetsArray.forEach(snippet => {
                //console.log(snippet);
                snippetNumbersArray.push(parseInt(snippet.split("-")[4]));
                //console.log(snippetNumbersArray);
            });
            return Math.max.apply(Math, snippetNumbersArray);
        },
        createSnippet: function(currentChapter, currentNote, maxSnippetNumber, snippetText) {
            
            // Connecting to db to get previously created snippets
            database.ref(`/chapters/${currentChapter}/${currentNote}/snippets`).once("value").then(snapshot => {
                
                // Array containing the snippets
                let snippetsArray = Object.keys(snapshot.val());
                
                let pos = snippetsArray.length + 1;
                
                let noteId = currentNote.split("_")[1];
                let snippetName = `${noteId}-${maxSnippetNumber + 1}`;
                
                //console.log(maxSnippetNumber);
                //console.log(snippetName);
                
                database.ref(`/chapters/${currentChapter}/${currentNote}/snippets/${snippetName}`).set({
                    text: snippetText,
                    pos: pos
                });
            });
            
            
        },
        displaySnippets: function(currentNote, dbObj) {
            //console.log(currentNote);
            let currentChapter = notes.database.getCurrentChapter();
            //console.log(currentChapter);
            
            if (!dbObj[currentChapter][currentNote].snippets) {
                console.log("no snippets to display");
            } else {
                
                // Creating the query for db
                let query = database.ref(`/chapters/${currentChapter}/${currentNote}/snippets`).orderByChild("pos");
                
                // Getting the values from db and looping through them to put them in order
                query.once("value").then(snapshot => {
                    // Creating the sorted array of snippets
                    let snippetsArray = [];
                    snapshot.forEach(childSnapshot => {
                        snippetsArray.push(childSnapshot.key);
                    });
                    //console.log(snippetsArray);
                    
                    //const snippetArray = Object.keys(dbObj[currentChapter][currentNote].snippets);
                    //this.createSortingForSnippets(snippetsArray, currentChapter, currentNote, dbObj);
                    
                    // Creating the HTML for each snippet
                    const snippetsContainer = document.querySelector(".inserted-snippets");
                    snippetsContainer.innerHTML = "";
                    
                    snippetsArray.forEach(snippet => {
                        let snippetValue = dbObj[currentChapter][currentNote].snippets[snippet].text;
                        notes.createElements.constructSnippetInEditMode(snippetValue, snippet);
                    });
                    
                    console.log("displaying snippets...");
                });
                
            }
        },
        addSnippetToDb: function() {
            
            const currentChapter = notes.database.getCurrentChapter();
            const currentNote = tempDb.unsavedNote;
            const currentNoteId = currentNote.split("_")[1];
            const snippetTextarea = document.querySelector("#snippet-textarea");
            let snippetTextareaValue = snippetTextarea.value;
            
            //console.log(currentNoteId);
            
            database.ref("/chapters").once("value").then(snapshot => {
                const dbObj = snapshot.val();
                //console.log(dbObj);
                
                if (!dbObj[currentChapter][currentNote].snippets) {
                    
                    // Creating the first snippet
                    const firstSnippet = `${currentNoteId}-1`;
                    //console.log(firstSnippet);
                    
                    database.ref(`/chapters/${currentChapter}/${currentNote}/snippets/${firstSnippet}`).set({
                        text: snippetTextareaValue,
                        pos: 1
                    });
                    console.log(`no snippets created for ${currentNote}, creating first one...`);
                } else {
                    
                    // Creating other snippets
                    let maxSnippetNumber = this.findMaxSnippetId(dbObj, currentChapter, currentNote);
                    //console.log(maxSnippetNumber);
                    
                    this.createSnippet(currentChapter, currentNote, maxSnippetNumber, snippetTextareaValue);
                    console.log("creating snippets...");
                }
            });
        },
        createSortingForSnippets: function(snippetArray, currentChapter, currentNote, dbObj) {
            console.log("creating sorting for snippets");
            //console.log(snippetArray);
            //console.log(dbObj);
            //console.log(currentChapter);
            //console.log(currentNote);
            
            
            
            for (let i = 0; i < snippetArray.length; i++) {
                //console.log(snippetArray[i]);
                let orderNumber = i + 1;
                //console.log(orderNumber);
                
                database.ref(`chapters/${currentChapter}/${currentNote}/snippets/${snippetArray[i]}`).update({
                    pos: orderNumber
                });
            }
        }
    },
    "tag": {
        displayTags: function(currentNote) {
            //console.log(currentNote);
            //console.log(dbObj);
            let currentChapter = notes.database.getCurrentChapter();
            
            database.ref(`chapters/${currentChapter}/${currentNote}/tags`).once("value").then(tagsArray => {
                notes.createElements.createTagsForEditMode(tagsArray.val());
            });
        }
    }
}



database.ref("/chapters").on("value", snapshot => {
    const dbObj = snapshot.val();
    notes.structure.init(dbObj);
});




/* 
    To get selected text use: window.getSelection() <- gives an object
    window.getSelection().baseNode.data <- gives the underlying text
    window.getSelection().anchorOffset <- gives starting point for the selection
    window.getSelection().focusOffset <- gives ending point for the selection

    window.getSelection().baseNode.data.slice(0, window.getSelection().anchorOffset); <- starting bit
    window.getSelection().baseNode.data.slice(window.getSelection().anchorOffset, window.getSelection().focusOffset); <- middle bit
    window.getSelection().baseNode.data.slice(window.getSelection().focusOffset); <- end bit

    middle bit will be appended as a text node to a newly created span node and other bits are just sibling text nodes of that span element
*/