const express = require("express");
const bodyparser = require("body-parser");
const mysql = require("mysql2");
const multer  = require('multer');
const cors = require("cors");
const PORT = 8080;
const app = express();
const path = require('path');
const Categoria = require("./model/Categoria");
const Marca = require("./model/Marca");
const Producto = require("./model/Producto");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Directorio donde se guardarán los archivos
  },
  filename: function (req, file, cb) {
    cb(null, `${file.originalname}`); // Usa el nombre original del archivo
  }
});

const upload = multer({ storage: storage });

app.use(cors());
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, 'uploads')));


//Ruta para consultar categorias

app.get("/api/getCategorias", async (req, res) => {
  const categorias = await Categoria.findAll();
  res.json(categorias);
});

// categoria por id

app.get("/api/getCategorias/:idcategoria", async (req, res) => {
  const { idcategoria } = req.params;
  try {
    const categoria = await Categoria.findByPk(idcategoria);
    if (categoria) {
      res.status(200).json(categoria);
    } else {
      res.status(404).json({ mensaje: "Categoria no encontrada" });
    }
  } catch (e) {
    console.log("Error" + e);
    res.status(500).json({ mensaje: "Error al buscar la categoria" });
  }
});

//eliminar categoria

app.delete("/api/categoria/:idcategoria", async (req, res) => {
    const { idcategoria } = req.params;
    try{
        const categoria = await Categoria.findByPk(idcategoria);
        if (categoria) {
            await categoria.destroy();
            res.status(200).json({mensaje: 'categoria eliminada satisfactoriamente'});
          } else {
            res.status(404).json({ mensaje: "Categoria no encontrada" });
          }
    }catch{

    }
})

//update categoria

app.put('/api/categoria/:idcategoria', async (req, res) =>{
    const {idcategoria} = req.params;
    const {categoria} = req.body;

    try{
        categoriaExiste = await Categoria.findByPk(idcategoria);
        if(categoriaExiste) {
            await categoriaExiste.update({categoria});
            res.status(200).json({mensaje: 'Categoria actulizada exitosamente'})
        }else{
            res.status(404).json({mensaje: 'Error, no se encontro la categoria'})
        }
    }catch(e){
        console.log("Error" + e)
        res.status(500).json({mensaje: 'Error al actualizar la categoria'})
    }
})


//Ruta para publicar categorias

app.post("/api/categoria", async (req, res) => {
  const { categoria } = req.body;
  try {
    const newCategoria = await Categoria.create({ categoria });
    res.status(201).json(newCategoria);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al crear la categoria",
    });
  }
});

//Ruta para consultar marcas
app.get("/api/getMarcas", async (req, res) => {
  const marcas = await Marca.findAll();
  res.json(marcas);
});

//marcas id

app.get("/api/getMarcas/:idmarca", async (req, res) => {
    const { idmarca } = req.params;
    try {
      const marca = await Marca.findByPk(idmarca);
      if (marca) {
        res.status(200).json(marca);
      } else {
        res.status(404).json({ mensaje: "marca no encontrada" });
      }
    } catch (e) {
      console.log("Error" + e);
      res.status(500).json({ mensaje: "Error al buscar la marca" });
    }
  });

  //delete marcas

  app.delete("/api/marca/:idmarca", async (req, res) => {
    const { idmarca } = req.params;
    try{
        const marca = await Marca.findByPk(idmarca);
        if (marca) {
            await marca.destroy();
            res.status(200).json({mensaje: 'marca eliminada satisfactoriamente'});
          } else {
            res.status(404).json({ mensaje: "marca no encontrada" });
          }
    }catch{

    }
})

//Ruta para publicar marcas
app.post("/api/marca", async (req, res) => {
  const { marca, idcategoria } = req.body;
  try {
    const newMarca = await Marca.create({ marca, idcategoria });
    res.status(201).json(newMarca);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al crear la marca",
    });
  }
});

//Ruta para consultar productos
app.get("/api/getProductos", async (req, res) => {
  const productos = await Producto.findAll();
  res.json(productos);
});

// productos por id
app.get("/api/getProductos/:idproducto", async (req, res) => {
    const { idproducto } = req.params;
    try {
      const producto = await Producto.findByPk(idproducto);
      if (producto) {
        res.status(200).json(producto);
      } else {
        res.status(404).json({ mensaje: "producto no encontrada" });
      }
    } catch (e) {
      console.log("Error" + e);
      res.status(500).json({ mensaje: "Error al buscar la producto" });
    }
  });

  //borrar

  app.delete("/api/producto/:idproducto", async (req, res) => {
    const { idproducto } = req.params;
    try{
        const producto = await Producto.findByPk(idproducto);
        if (producto) {
            await producto.destroy();
            res.status(200).json({mensaje: 'producto eliminada satisfactoriamente'});
          } else {
            res.status(404).json({ mensaje: "producto no encontrada" });
          }
    }catch{

    }
})

//Ruta para publicar productos
app.post('/api/producto', upload.single('image'), async (req, res) => {
  const { nombre, precio, stock, idmarca } = req.body;
  try {
    let imagePath = null;
    if (req.file) {
      imagePath = `${req.file.originalname}`; // Ruta de la imagen en el servidor
    }

    const newProducto = await Producto.create({
      nombre,
      precio,
      stock,
      idmarca,
      image: imagePath // Guarda la ruta de la imagen en la base de datos
    });
    res.status(201).json(newProducto);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al crear el producto",
    });
  }
});

app.listen(PORT, () => console.log(`Esta vivo en http://localhost:${PORT}`));
