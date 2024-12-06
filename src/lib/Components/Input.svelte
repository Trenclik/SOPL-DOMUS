<script>
    let { type = 'text', value = '', placeholder = '' } = $$props;
  
    const handleInput = (event) => {
      value = event.target.value;
    };
  </script>
  
  <style lang="scss">
    .input-container {
      margin-bottom: 15px;
  
      input {
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: 16px;
  
        &:focus {
          border-color: #4A90E2;
          outline: none;
        }
      }
    }
  </style>
  
  <div class="input-container">
    <input type={type} bind:value={value} placeholder={placeholder} on:input={handleInput} />
  </div>
  
