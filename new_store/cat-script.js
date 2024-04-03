function loadData() {
  $.ajax({
    url: "api/categories-read.php",
  }).done(function (data) {
    console.log(data);

    let result = JSON.parse(data);

    var template = document.querySelector("#categoryRowTemplate");
    var parent = document.querySelector("#tableBody");

    result.forEach((item) => {
      let clone = template.content.cloneNode(true);
      clone.querySelector("tr td.tdID").innerHTML = item.category_id;
      clone.querySelector("tr td.tdName").innerHTML = item.category_name;
      clone.querySelector("tr td.tdCreatedAt").innerHTML = item.date_created;
      parent.appendChild(clone);
    });
  });
}

loadData();

$("#btnAddCategory").click(function () {
  // Corrected line to retrieve the value of categoryName
  var categoryName = document.getElementById("categoryName").value;

  if (categoryName.length > 0) {
      $.ajax({
          url: `api/categories-create.php?name=${categoryName}`,
          type: "GET"
      }).done(function (data) {
          let result = JSON.parse(data);

          if (result.res == "success") {
              location.reload();
              $("#exampleModal").modal("toggle");
              $("#form").trigger("reset");
          }
      });
  }
});


$(document).on("click", ".btnUpdate", function(){
  var categoryId = $(this).closest("tr").find(".tdID").text();
  var categoryName = $(this).closest("tr").find(".tdName").text();
  
  $("#updateCategoryId").val(categoryId);
  $("#updateCategoryName").val(categoryName);
  
  $("#updateModal").modal("show");
});

$("#btnUpdateCategory").click(function(){
  var categoryId = $("#updateCategoryId").val();
  var categoryName = $("#updateCategoryName").val();
  
  if(categoryName.length > 0){
      $.ajax({
          url:  "api/categories-update.php",
          type: "POST",
          data: {
              id: categoryId,
              name: categoryName
          }
      }).done(function(data){
          let result = JSON.parse(data);
          if(result.res == "success"){
              location.reload();
          }
      });
  }
});

$(document).on("click", ".btnDelete", function(){
  var categoryId = $(this).closest("tr").find(".tdID").text();
  
  if(confirm("Are you sure you want to delete this category?")) {
      $.ajax({
          url: "api/categories-delete.php",
          type: "POST",
          data: {
              id: categoryId
          }
      }).done(function(data){
          let result = JSON.parse(data);
          if(result.res == "success"){
              location.reload();
          }
      });
  }
});
