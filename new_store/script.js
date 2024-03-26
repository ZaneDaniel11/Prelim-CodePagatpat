function loadProductData() {
  $.ajax({
    url: "api/product/read.php",
  }).done(function (data) {
    console.log(data);

    let result = JSON.parse(data);

    var template = document.getElementById("productListTemplate");
    var parent = document.getElementById("productList");
  
    result.forEach(item => {
          let clone = template.content.cloneNode(true);
          clone.getElementById("prodId").value = item.product_id;
          clone.getElementById("prodName").innerHTML = item.product_name;
          clone.getElementById("prodCat").innerHTML = item.product_category;
          clone.getElementById("prodStock").innerHTML = item.product_quantity;
          clone.getElementById("prodImg").src = item.product_image;
          parent.appendChild(clone);
        });
  });
}
  
  loadProductData();

  $.ajax({
    url: "api/category/read.php",
    method: "GET",
    dataType: "json",
    success: function(data) {
        const selectElement = $("#pCat");
        const selectElementT = $("#pUpCat");

        const defaultOption = $("<option>")
            .text("Select Category")
            .prop({ disabled: true, selected: true });

        selectElement.append(defaultOption.clone());

        $.each(data, function(index, category) {
            const option = $("<option>")
                .val(category.category_name)
                .text(category.category_name);

            selectElement.append(option.clone());
            selectElementT.append(option.clone());
        });
    },
    error: function(xhr, status, error) {
        console.error("Error fetching categories:", error);
    }
});


  $('#btnAddProd').on('click', addProduct);

  function addProduct(event) {
      event.preventDefault();
  
      const formDataX = new FormData();
      formDataX.append('name', $('#pName').val());
      formDataX.append('cat', $('#pCat').val());
      formDataX.append('quan', $('#pQa').val());
      formDataX.append('img', $('#pPic')[0].files[0]);
    
      $.ajax({
          url: 'api/product/create.php',
          method: 'POST',
          processData: false,
          contentType: false,
          data: formDataX,
          success: function(data) {
              if (data.res === 'success') {
                  location.reload();
              } else {
                  console.error('Newton 2nd law:', data.error);
              }
          },
          error: function(xhr, status, error) {
              console.error('Newton 1st law:', error);
          }
      });
  }  


  addEventListener("click", function (event) {
    if (event.target.classList.contains("btnProdUpdate")) {
        var prodUpId = event.target.closest(".card").querySelector(".prodId").value;
        var prodUpName = event.target.closest(".card").querySelector("#prodName").textContent;
        var prodQName = event.target.closest(".card").querySelector("#prodStock").textContent;
        var prodCatName = event.target.closest(".card").querySelector("#prodCat").textContent;
        
  
      document.querySelector("#pEId").value = prodUpId;
      document.querySelector("#pEName").value = prodUpName;
      document.querySelector("#pEQa").value = prodQName;
      var selectElement = document.querySelector("#pECat");
        var options = selectElement.options;
        for (var i = 0; i < options.length; i++) {
            if (options[i].value === prodCatName) {
                options[i].selected = true;
                break;
            }
        }

  
      document.querySelector("#addCategoryModal").modal("show");
    }
  });


  $("#productUpdateMan").on("click", function() {
    const formDataY = new FormData();
    formDataY.append('id', $("#pEId").val());
    formDataY.append('name', $("#pEName").val());
    formDataY.append('cat', $("#pUpCat").val());
    formDataY.append('stock', $("#pEQa").val());
    formDataY.append('img', $("#pEPic")[0].files[0]);

    $.ajax({
        url: "api/product/update.php",
        method: "POST",
        data: formDataY,
        processData: false,
        contentType: false,
        success: function(data) {
            if (data.res === "success") {
                location.reload();
            }
        },
        error: function(xhr, status, error) {
            alert(error);
        }
    });
});

  $(document).on("click", ".btnProdDelete", function(event) {
    var prodId = $(this).closest(".card").find(".prodId").val();
    
    if (confirm(`Are you sure you want to delete this product? ${prodId}`)) {
        $.ajax({
            url: `api/product/delete.php?id=${prodId}`,
            method: 'GET',
            dataType: 'json'
        }).done(function(result) {
            if (result.res === "success") {
                location.reload();
            }
        });
    }
});

function updateStock(prodUpId, prodQName) {
  $.ajax({
      url: `api/product/quantity.php?id=${prodUpId}&stock=${prodQName}`,
      method: 'GET',
      dataType: 'json'
  }).done(function(data) {
      console.log(data);
      location.reload();
  });
}

