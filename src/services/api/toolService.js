// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class ToolService {
  constructor() {
    this.apperClient = null;
    this.initializeClient();
  }

  initializeClient() {
    if (typeof window !== 'undefined' && window.ApperSDK) {
      const { ApperClient } = window.ApperSDK;
      this.apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
    }
  }

  async getAll() {
    if (!this.apperClient) this.initializeClient();
    
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "description" } },
          { field: { Name: "category" } },
          { field: { Name: "pricing" } },
          { field: { Name: "features" } },
          { field: { Name: "website" } },
          { field: { Name: "logo" } }
        ],
        orderBy: [{ fieldName: "Name", sorttype: "ASC" }]
      };

      const response = await this.apperClient.fetchRecords('tool', params);
      
      if (!response.success) {
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      console.error('Error fetching tools:', error);
      throw error;
    }
  }

  async getById(id) {
    if (!this.apperClient) this.initializeClient();
    
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "description" } },
          { field: { Name: "category" } },
          { field: { Name: "pricing" } },
          { field: { Name: "features" } },
          { field: { Name: "website" } },
          { field: { Name: "logo" } }
        ]
      };

      const response = await this.apperClient.getRecordById('tool', parseInt(id), params);
      
      if (!response.success) {
        throw new Error(response.message || 'Tool not found');
      }

      return response.data;
    } catch (error) {
      console.error(`Error fetching tool ${id}:`, error);
      throw error;
    }
  }

  async getByCategory(category) {
    if (!this.apperClient) this.initializeClient();
    
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "description" } },
          { field: { Name: "category" } },
          { field: { Name: "pricing" } },
          { field: { Name: "features" } },
          { field: { Name: "website" } },
          { field: { Name: "logo" } }
        ],
        where: [
          {
            FieldName: "category",
            Operator: "EqualTo",
            Values: [category]
          }
        ]
      };

      const response = await this.apperClient.fetchRecords('tool', params);
      
      if (!response.success) {
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      console.error('Error fetching tools by category:', error);
      throw error;
    }
  }

  async create(toolData) {
    if (!this.apperClient) this.initializeClient();
    
    try {
      // Only include updateable fields
      const updateableData = {
        Name: toolData.name,
        Tags: Array.isArray(toolData.tags) ? toolData.tags.join(',') : toolData.tags,
        description: toolData.description,
        category: toolData.category,
        pricing: toolData.pricing,
        features: Array.isArray(toolData.features) ? toolData.features.join('\n') : toolData.features,
        website: toolData.website,
        logo: toolData.logo
      };

      const params = {
        records: [updateableData]
      };

      const response = await this.apperClient.createRecord('tool', params);
      
      if (!response.success) {
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error(failedRecords[0].message || 'Failed to create tool');
        }
        
        return successfulRecords[0]?.data;
      }
    } catch (error) {
      console.error('Error creating tool:', error);
      throw error;
    }
  }

  async update(id, toolData) {
    if (!this.apperClient) this.initializeClient();
    
    try {
      // Only include updateable fields
      const updateableData = {
        Id: parseInt(id),
        Name: toolData.name,
        Tags: Array.isArray(toolData.tags) ? toolData.tags.join(',') : toolData.tags,
        description: toolData.description,
        category: toolData.category,
        pricing: toolData.pricing,
        features: Array.isArray(toolData.features) ? toolData.features.join('\n') : toolData.features,
        website: toolData.website,
        logo: toolData.logo
      };

      const params = {
        records: [updateableData]
      };

      const response = await this.apperClient.updateRecord('tool', params);
      
      if (!response.success) {
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to update ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error(failedRecords[0].message || 'Failed to update tool');
        }
        
        return successfulRecords[0]?.data;
      }
    } catch (error) {
      console.error('Error updating tool:', error);
      throw error;
    }
  }

  async delete(id) {
    if (!this.apperClient) this.initializeClient();
    
    try {
      const params = {
        RecordIds: [parseInt(id)]
      };

      const response = await this.apperClient.deleteRecord('tool', params);
      
      if (!response.success) {
        throw new Error(response.message);
      }

      return true;
    } catch (error) {
      console.error('Error deleting tool:', error);
      throw error;
    }
  }

  async getAllTags() {
    try {
      const tools = await this.getAll();
      const allTags = tools.flatMap(tool => {
        if (tool.Tags) {
          return Array.isArray(tool.Tags) ? tool.Tags : tool.Tags.split(',').map(tag => tag.trim());
        }
        return [];
      });
      return [...new Set(allTags)].sort();
    } catch (error) {
      console.error('Error fetching tags:', error);
      throw error;
    }
  }

  async getByPricing(pricing) {
    if (!this.apperClient) this.initializeClient();
    
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "description" } },
          { field: { Name: "category" } },
          { field: { Name: "pricing" } },
          { field: { Name: "features" } },
          { field: { Name: "website" } },
          { field: { Name: "logo" } }
        ],
        where: [
          {
            FieldName: "pricing",
            Operator: "EqualTo",
            Values: [pricing]
          }
        ]
      };

      const response = await this.apperClient.fetchRecords('tool', params);
      
      if (!response.success) {
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      console.error('Error fetching tools by pricing:', error);
      throw error;
    }
  }
}

export default new ToolService();