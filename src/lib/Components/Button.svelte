<script>
    let {
      label = '',
      type = 'button',
      disabled = false,
      onClick = () => {},
    } = $props();
  
    // Funkce volaná při kliknutí na tlačítko
    function handleClick(event) {
      onClick(event);
    }
  </script>
  
  <button type={type} {disabled} class="btn" onclick={handleClick}>
    {label}
  </button>
  
  <style>
    .btn {
      width: 100%;
      padding: 0.75rem;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.3s;
    }
  
    .btn:hover {
      background-color: #0056b3;
    }
  
    .btn:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  </style>
  