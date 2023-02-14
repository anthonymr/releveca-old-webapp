<?php
require_once "./backend/config.php";
require_once "./backend/functions.php";

session_start();

if (!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true) {
    header("location: index.php");
    exit;
}


?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">

    <title>Tencelu | Panel de control</title>
    <link rel="icon" href="../img/icon_new.svg?v=2" />

    <link rel="stylesheet" href="../css/cdn/bootstrap.css" />
    <link rel="stylesheet" href="../css/cdn/cropper.css" />
    <link rel="stylesheet" href="../css/cdn/animate.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">

    <link rel="stylesheet" href="../css/tables.css" />
    <link rel="stylesheet" href="../css/controlpanel_main.css" />
    <link rel="stylesheet" href="../css/image_input.css" />

    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="Expires" content="0" />
</head>

<body style="position:relative; min-width:1000px">
    <header>
        <a href="reset-password.php" style="margin-right: 15px; color:white"><i class="fas fa-key"></i></a>
        <a href="logout.php" style="margin-right: 15px; color:orange"><i class="fas fa-power-off"></i></a>
    </header>
    <main>
        <nav>
            <button @click="menuStatus = 1" class="btn btn-default btn-block" :class="{'btn-selected': menuStatus == 1}">Categorías</button>
            <button @click="menuStatus = 2" class="btn btn-default btn-block" :class="{'btn-selected': menuStatus == 2}">Sub-categorías</button>
            <button @click="menuStatus = 3" class="btn btn-default btn-block" :class="{'btn-selected': menuStatus == 3}">Plantillas</button>
            <button @click="menuStatus = 4" class="btn btn-default btn-block" :class="{'btn-selected': menuStatus == 4}">Artículos</button>
            <button @click="menuStatus = 5" class="btn btn-default btn-block" :class="{'btn-selected': menuStatus == 5}">Carrusel</button>
            <button @click="menuStatus = 6" class="btn btn-default btn-block" :class="{'btn-selected': menuStatus == 6}">Usuarios</button>
            <button @click="menuStatus = 7" class="btn btn-default btn-block" :class="{'btn-selected': menuStatus == 7}">Configuraciones</button>
        </nav>
        <aside v-if="menuStatus == 1" style="padding:40px">
            <tables :table_data="categories" :table_titles="categoriesTitles" :actions="categoriesActions" table_name="categorías" @add="addNewCategory()"></tables>
            <v_new_category v-if="showNewCategoryModal" @close="showNewCategoryModal = false; getCategories()" :_id="editingCategory"></v_new_category>
        </aside>
        <aside v-if="menuStatus == 2" style="padding:40px">
            <tables :table_data="subCategories" :table_titles="subCategoriesTitles" :actions="subCategoriesActions" table_name="subCategorías" @add="addNewSubCategory()"></tables>
            <v_new_sub_category v-if="showNewSubCategoryModal" @close="showNewSubCategoryModal = false; getSubCategories()" :_id="editingSubCategory"></v_new_sub_category>
        </aside>
        <aside v-if="menuStatus == 3">
           <v_templates></v_templates>
        </aside>
        <aside v-if="menuStatus == 4">
           <v_articles></v_articles>
        </aside>
        <aside v-if="menuStatus == 7">
           <v_configs></v_configs>
        </aside>
        <aside v-if="menuStatus == 5">
           <v_carousel></v_carousel>
        </aside>
        <aside v-if="menuStatus == 6">
           <v_users></v_users>
        </aside>
    </main>

    
    
    <script src="../js/cdn/jquery.min.js"></script>
    <script src="../js/cdn/cropper.js"></script>
    <script src="../js/cdn/axios.js"></script>
    <script src="../js/cdn/bootstrap.min.js"></script>
    <script src="../js/cdn/vue.js"></script>
    <script src="../js/cdn/xlsx.full.min.js"></script>
    <script src="//cdn.jsdelivr.net/npm/sortablejs@1.8.4/Sortable.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/Vue.Draggable/2.20.0/vuedraggable.umd.min.js"></script>
    <script src='https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.0/pdfmake.min.js'></script>
    <script src='https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.0/vfs_fonts.min.js'></script>

    <script src="components/image_input.js"></script>
    <script src="components/image_cropp.js"></script>
    <script src="components/tables.js"></script>
    <script src="components/new_sub_category.js"></script>
    <script src="components/new_category.js"></script>
    <script src="components/templates.js"></script>
    <script src="components/articles.js"></script>
    <script src="components/configs.js"></script>
    <script src="components/carousel.js"></script>
    <script src="components/new_slide.js"></script>
    <script src="components/users.js"></script>

    <script src="main.js"></script>
</body>

</html>