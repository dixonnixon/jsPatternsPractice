// template for the main form
// will hold the main UI that is not related to the subject
// but it is important as it would hold the form with fields
const mainTemplate = data => `
<div>
    <div class="form">
    </div>
    
    <pre class="model-state">
    </pre>
</div>
`;
// template for the form (our main focus)
// assist user input. UI that will participate with databinding
const formTemplate = data => `
<div class="form-item">
    <label>Enter your name: 
        <input type="text" class="name" size="40" value=""/>
    </label>
</div>
<div class="form-item">
    <label>Base64 code name: 
        <input type="text" class="output" size="40" value=""/>
    </label>
</div>
<div class="form-item"><span class="current-time"> </span></div>
`;