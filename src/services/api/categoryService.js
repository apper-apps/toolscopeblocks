import toolService from './toolService'

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class CategoryService {
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
          { field: { Name: "count" } }
        ],
        orderBy: [{ fieldName: "Name", sorttype: "ASC" }]
      };

      const response = await this.apperClient.fetchRecords('category', params);
      
      if (!response.success) {
        throw new Error(response.message);
      }

      // Update counts dynamically by fetching tools
      const categories = response.data || [];
      const tools = await toolService.getAll();
      
      const updatedCategories = categories.map(category => ({
        ...category,
        count: tools.filter(tool => tool.category === category.Name).length
      }));

      return updatedCategories;
    } catch (error) {
      console.error('Error fetching categories:', error);
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
          { field: { Name: "count" } }
        ]
      };

      const response = await this.apperClient.getRecordById('category', parseInt(id), params);
      
      if (!response.success) {
        throw new Error(response.message || 'Category not found');
      }

      return response.data;
    } catch (error) {
      console.error(`Error fetching category ${id}:`, error);
      throw error;
    }
  }

  async create(categoryData) {
    if (!this.apperClient) this.initializeClient();
    
    try {
      // Only include updateable fields
      const updateableData = {
        Name: categoryData.name,
        Tags: Array.isArray(categoryData.tags) ? categoryData.tags.join(',') : categoryData.tags || '',
        count: categoryData.count || 0
      };

      const params = {
        records: [updateableData]
      };

      const response = await this.apperClient.createRecord('category', params);
      
      if (!response.success) {
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error(failedRecords[0].message || 'Failed to create category');
        }
        
        return successfulRecords[0]?.data;
      }
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  }

  async update(id, categoryData) {
    if (!this.apperClient) this.initializeClient();
    
    try {
      // Only include updateable fields
      const updateableData = {
        Id: parseInt(id),
        Name: categoryData.name,
        Tags: Array.isArray(categoryData.tags) ? categoryData.tags.join(',') : categoryData.tags,
        count: categoryData.count
      };

      const params = {
        records: [updateableData]
      };

      const response = await this.apperClient.updateRecord('category', params);
      
      if (!response.success) {
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to update ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error(failedRecords[0].message || 'Failed to update category');
        }
        
        return successfulRecords[0]?.data;
      }
    } catch (error) {
      console.error('Error updating category:', error);
      throw error;
    }
  }

  async delete(id) {
    if (!this.apperClient) this.initializeClient();
    
    try {
      const params = {
        RecordIds: [parseInt(id)]
      };

      const response = await this.apperClient.deleteRecord('category', params);
      
      if (!response.success) {
        throw new Error(response.message);
      }

      return true;
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  }
}

export default new CategoryService();