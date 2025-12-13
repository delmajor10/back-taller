const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Documentation',
    version: '1.0.0',
    description: 'Documentation for the API',
  },
  servers: [
    {
      url: `http://localhost:${process.env.PORT || 8080}/api/v1`,
      description: 'Development server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      }
    },
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: '60c72b2f9b1e8a001f8e4caa'
          },
          name: {
            type: 'string',
            example: 'John Doe'
          },
          email: {
            type: 'string',
            example: 'jhon.doe@example.com'
          },
          roles: {
            type: 'array',
            items: {
              type: 'string'
            },
            example: ['user']
          }
        }
      },
      Coupon: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: '60c72b2f9b1e8a001f8e4caa'
          },
          codigo: {
            type: 'string',
            example: 'Descuento1'
          },
          tipoDescuento: {
            type: 'string',
            example: 'Porcentaje'
          },
          valorDescuento: {
            type: 'number',
            example: 10
          },
          fechaIni: {
            type: 'date',
            example: '01/12/2025'
          },
          fechaFin: {
            type: 'date',
            example: '31/12/2025'
          },
          estado: {
            type: 'string',
            example: 'vigente'
          }
        }
      }
    }
  },
  security: [{
    bearerAuth: []
  }]
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./src/presentation/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
