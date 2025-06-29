import toolService from '../services/api/toolService.js';
import { aiToolsData } from '../data/aiToolsData.js';
import { toast } from 'react-toastify';

/**
 * Bulk add AI tools to the database
 * Processes tools in batches to handle database limits
 */
export async function bulkAddTools() {
  const BATCH_SIZE = 50; // Process 50 tools at a time
  const totalTools = aiToolsData.length;
  let successCount = 0;
  let failureCount = 0;
  const failedTools = [];

  console.log(`Starting bulk import of ${totalTools} AI tools...`);

  // Process tools in batches
  for (let i = 0; i < totalTools; i += BATCH_SIZE) {
    const batch = aiToolsData.slice(i, i + BATCH_SIZE);
    const batchNumber = Math.floor(i / BATCH_SIZE) + 1;
    const totalBatches = Math.ceil(totalTools / BATCH_SIZE);

    console.log(`Processing batch ${batchNumber}/${totalBatches} (${batch.length} tools)...`);

    try {
      // Process each tool in the current batch
      for (const tool of batch) {
        try {
          await toolService.create({
            name: tool.name,
            description: tool.description,
            category: tool.category,
            pricing: tool.pricing,
            features: tool.features,
            website: tool.website,
            logo: tool.logo,
            tags: tool.tags,
            isAI: tool.isAI
          });

          successCount++;
          console.log(`✓ Added: ${tool.name}`);

        } catch (error) {
          failureCount++;
          failedTools.push({
            name: tool.name,
            error: error.message
          });
          console.error(`✗ Failed to add ${tool.name}:`, error.message);
        }
      }

      // Brief pause between batches to prevent overwhelming the database
      await new Promise(resolve => setTimeout(resolve, 1000));

    } catch (error) {
      console.error(`Error processing batch ${batchNumber}:`, error);
      failureCount += batch.length;
      batch.forEach(tool => {
        failedTools.push({
          name: tool.name,
          error: `Batch error: ${error.message}`
        });
      });
    }

    // Update progress
    const progress = Math.round(((i + batch.length) / totalTools) * 100);
    console.log(`Progress: ${progress}% (${successCount} success, ${failureCount} failed)`);
  }

  // Final results
  console.log('\n=== BULK IMPORT COMPLETED ===');
  console.log(`Total tools processed: ${totalTools}`);
  console.log(`Successfully added: ${successCount}`);
  console.log(`Failed: ${failureCount}`);

  if (failedTools.length > 0) {
    console.log('\nFailed tools:');
    failedTools.forEach((tool, index) => {
      console.log(`${index + 1}. ${tool.name}: ${tool.error}`);
    });
  }

  // Show toast notification with results
  if (failureCount === 0) {
    toast.success(`Successfully added all ${successCount} AI tools to the directory!`);
  } else {
    toast.warning(`Added ${successCount} tools successfully. ${failureCount} tools failed to import.`);
  }

  return {
    total: totalTools,
    success: successCount,
    failed: failureCount,
    failedTools: failedTools
  };
}

/**
 * Add specific high-priority tools first
 * Includes the specifically requested tools: Invideo, Vsub, Jogg AI
 */
export async function addHighPriorityTools() {
  const highPriorityTools = aiToolsData.filter(tool => 
    ['Invideo', 'Vsub', 'Jogg AI', 'ChatGPT', 'Midjourney', 'GitHub Copilot', 'Murf AI', 'Tableau'].includes(tool.name)
  );

  console.log(`Adding ${highPriorityTools.length} high-priority tools...`);

  let successCount = 0;
  let failureCount = 0;

  for (const tool of highPriorityTools) {
    try {
      await toolService.create({
        name: tool.name,
        description: tool.description,
        category: tool.category,
        pricing: tool.pricing,
        features: tool.features,
        website: tool.website,
        logo: tool.logo,
        tags: tool.tags,
        isAI: tool.isAI
      });

      successCount++;
      console.log(`✓ Added high-priority tool: ${tool.name}`);

    } catch (error) {
      failureCount++;
      console.error(`✗ Failed to add ${tool.name}:`, error.message);
    }
  }

  console.log(`High-priority tools: ${successCount} success, ${failureCount} failed`);
  
  if (successCount > 0) {
    toast.success(`Added ${successCount} high-priority AI tools including Invideo, Vsub, and Jogg AI!`);
  }

  return { success: successCount, failed: failureCount };
}

/**
 * Verify tool counts by category after import
 */
export async function verifyImport() {
  try {
    const tools = await toolService.getAll();
    const categoryCounts = {};

    tools.forEach(tool => {
      categoryCounts[tool.category] = (categoryCounts[tool.category] || 0) + 1;
    });

    console.log('\n=== IMPORT VERIFICATION ===');
    console.log(`Total tools in database: ${tools.length}`);
    console.log('Tools by category:');
    Object.entries(categoryCounts).forEach(([category, count]) => {
      console.log(`  ${category}: ${count} tools`);
    });

    return {
      total: tools.length,
      categories: categoryCounts
    };
  } catch (error) {
    console.error('Failed to verify import:', error);
    return null;
  }
}

// Usage example (run this in browser console or as a script):
// import { bulkAddTools, addHighPriorityTools, verifyImport } from './bulkAddTools.js';
// 
// To add all tools:
// bulkAddTools().then(result => console.log('Import completed:', result));
//
// To add only high-priority tools first:
// addHighPriorityTools().then(() => bulkAddTools());
//
// To verify the import:
// verifyImport().then(result => console.log('Verification:', result));