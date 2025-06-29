import toolsData from '@/services/mockData/tools.json'

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class ToolService {
  constructor() {
    this.tools = [...toolsData];
  }

  async getAll() {
    await delay(300);
    return [...this.tools];
  }

  async getById(id) {
    await delay(200);
    const tool = this.tools.find(tool => tool.Id === parseInt(id));
    if (!tool) {
      throw new Error('Tool not found');
    }
    return { ...tool };
  }

  async getByCategory(category) {
    await delay(250);
    return this.tools.filter(tool => tool.category === category).map(tool => ({ ...tool }));
  }

  async search(query) {
    await delay(200);
    const lowercaseQuery = query.toLowerCase();
    return this.tools.filter(tool => 
      tool.name.toLowerCase().includes(lowercaseQuery) ||
      tool.description.toLowerCase().includes(lowercaseQuery) ||
      tool.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    ).map(tool => ({ ...tool }));
  }

  async filterByTags(tags) {
    await delay(200);
    if (!tags || tags.length === 0) return [...this.tools];
    
    return this.tools.filter(tool =>
      tags.some(tag => tool.tags.includes(tag))
    ).map(tool => ({ ...tool }));
  }

  async create(toolData) {
    await delay(300);
    const newId = Math.max(...this.tools.map(t => t.Id)) + 1;
    const newTool = {
      Id: newId,
      ...toolData
    };
    this.tools.push(newTool);
    return { ...newTool };
  }

  async update(id, toolData) {
    await delay(250);
    const index = this.tools.findIndex(tool => tool.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Tool not found');
    }
    this.tools[index] = { ...this.tools[index], ...toolData };
    return { ...this.tools[index] };
  }

  async delete(id) {
    await delay(200);
    const index = this.tools.findIndex(tool => tool.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Tool not found');
    }
    this.tools.splice(index, 1);
    return true;
  }

  // Get all unique tags
  async getAllTags() {
    await delay(150);
    const allTags = this.tools.flatMap(tool => tool.tags);
    return [...new Set(allTags)].sort();
  }

  // Get tools by pricing tier
  async getByPricing(pricing) {
    await delay(200);
    return this.tools.filter(tool => tool.pricing === pricing).map(tool => ({ ...tool }));
  }
}

export default new ToolService();