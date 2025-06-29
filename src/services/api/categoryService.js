import categoriesData from '@/services/mockData/categories.json'
import toolService from './toolService'

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class CategoryService {
  constructor() {
    this.categories = [...categoriesData];
  }

  async getAll() {
    await delay(200);
    // Update counts dynamically
    const tools = await toolService.getAll();
    const updatedCategories = this.categories.map(category => ({
      ...category,
      count: tools.filter(tool => tool.category === category.name).length
    }));
    return updatedCategories;
  }

  async getById(id) {
    await delay(150);
    const category = this.categories.find(cat => cat.Id === parseInt(id));
    if (!category) {
      throw new Error('Category not found');
    }
    return { ...category };
  }

  async create(categoryData) {
    await delay(250);
    const newId = Math.max(...this.categories.map(c => c.Id)) + 1;
    const newCategory = {
      Id: newId,
      count: 0,
      ...categoryData
    };
    this.categories.push(newCategory);
    return { ...newCategory };
  }

  async update(id, categoryData) {
    await delay(200);
    const index = this.categories.findIndex(cat => cat.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Category not found');
    }
    this.categories[index] = { ...this.categories[index], ...categoryData };
    return { ...this.categories[index] };
  }

  async delete(id) {
    await delay(200);
    const index = this.categories.findIndex(cat => cat.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Category not found');
    }
    this.categories.splice(index, 1);
    return true;
  }
}

export default new CategoryService();