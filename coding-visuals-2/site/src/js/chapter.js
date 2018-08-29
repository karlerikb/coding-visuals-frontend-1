console.log("chapter");

const notes = {
    "structure": {
        createStructure: function() {
            console.log("init");
            const notesSection = document.querySelector(".notes > .container");
            //notesSection.innerText = "test";
            const newNoteBtn = document.createElement("div");
        }
    },
    init: function() {
        notes.structure.createStructure();
    }
}

notes.init();