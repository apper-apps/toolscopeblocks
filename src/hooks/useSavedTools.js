import { useState, useEffect } from 'react'

const STORAGE_KEY = 'toolscope_saved_tools'

export const useSavedTools = () => {
  const [savedTools, setSavedTools] = useState([])

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        setSavedTools(JSON.parse(stored))
      } catch (error) {
        console.error('Error parsing saved tools:', error)
        setSavedTools([])
      }
    }
  }, [])

  const saveToStorage = (tools) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tools))
    } catch (error) {
      console.error('Error saving to localStorage:', error)
    }
  }

  const saveTool = (toolId) => {
    const newSavedTool = {
      toolId: toolId,
      savedAt: new Date().toISOString()
    }
    
    const updatedTools = [...savedTools, newSavedTool]
    setSavedTools(updatedTools)
    saveToStorage(updatedTools)
  }

  const removeTool = (toolId) => {
    const updatedTools = savedTools.filter(saved => saved.toolId !== toolId)
    setSavedTools(updatedTools)
    saveToStorage(updatedTools)
  }

  const isToolSaved = (toolId) => {
    return savedTools.some(saved => saved.toolId === toolId)
  }

  const toggleTool = (toolId) => {
    if (isToolSaved(toolId)) {
      removeTool(toolId)
      return false
    } else {
      saveTool(toolId)
      return true
    }
  }

  const getSavedToolIds = () => {
    return savedTools.map(saved => saved.toolId)
  }

  const clearAll = () => {
    setSavedTools([])
    saveToStorage([])
  }

  return {
    savedTools,
    saveTool,
    removeTool,
    isToolSaved,
    toggleTool,
    getSavedToolIds,
    clearAll,
    count: savedTools.length
  }
}