"use client"

import type React from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CardContent } from "@/components/ui/card"
import { Heart, MessageCircle, Share, MoreHorizontal, CheckCircle, Send, Repeat, Edit, Save, X } from "lucide-react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { motion, AnimatePresence } from "framer-motion"
import { AnimatedCard } from "@/components/animated-card"
import { AnimatedButton } from "@/components/animated-button"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"

interface Comment {
  id: string
  user: {
    name: string
    avatar: string
    sobrietyBadge?: string
  }
  content: string
  timestamp: string
  likes: number
}

interface PostProps {
  post: {
    id: number
    user: {
      name: string
      avatar: string
      verified?: boolean
      sobrietyBadge?: string
    }
    content: string
    image?: string
    timestamp: string
    likes?: number
    comments?: number
    shares?: number
    // For shared posts
    isShared?: boolean
    sharedBy?: {
      name: string
      avatar: string
      timestamp: string
    }
    shareComment?: string
    originalPost?: {
      id: number
      user: {
        name: string
        avatar: string
        verified?: boolean
        sobrietyBadge?: string
      }
      content: string
      image?: string
      timestamp: string
    }
  }
  onPostUpdate?: (postId: number, updatedContent: string) => void
  currentUserId?: string
}

export function Post({ post, onPostUpdate, currentUserId = "John D." }: PostProps) {
  // Add default values to prevent undefined errors
  const safePost = {
    ...post,
    likes: post.likes ?? 0,
    comments: post.comments ?? 0,
    shares: post.shares ?? 0,
    user: {
      ...post.user,
      verified: post.user.verified ?? false,
    },
  }

  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(safePost.likes)
  const [showComments, setShowComments] = useState(false)
  const [showShareDialog, setShowShareDialog] = useState(false)
  const [shareComment, setShareComment] = useState("")
  const [shareCount, setShareCount] = useState(safePost.shares)
  const [newComment, setNewComment] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState(post.content)
  const [isSaving, setIsSaving] = useState(false)
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      user: {
        name: "Sarah M.",
        avatar: "/placeholder.svg?height=32&width=32",
        sobrietyBadge: "6 months",
      },
      content: "This is so inspiring! Thank you for sharing your journey with us. 🙏",
      timestamp: "2h ago",
      likes: 5,
    },
    {
      id: "2",
      user: {
        name: "Mike C.",
        avatar: "/placeholder.svg?height=32&width=32",
        sobrietyBadge: "2 years",
      },
      content: "One day at a time! Keep up the amazing work. We're all here supporting you.",
      timestamp: "1h ago",
      likes: 3,
    },
  ])
  const [commentCount, setCommentCount] = useState(safePost.comments)
  const { toast } = useToast()

  // Check if current user owns this post
  const isOwnPost = post.user.name === currentUserId

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1))

    toast({
      title: isLiked ? "Unliked" : "Liked!",
      description: isLiked ? "Removed from liked posts" : "Added to liked posts",
    })
  }

  const handleCommentToggle = () => {
    setShowComments(!showComments)
    if (!showComments) {
      toast({
        title: "Comments",
        description: "Opening comment section",
      })
    }
  }

  const handleShare = () => {
    setShowShareDialog(true)
  }

  const handleSharePost = () => {
    // Simulate sharing the post
    setShareCount((prev) => prev + 1)
    setShowShareDialog(false)

    toast({
      title: "Post Shared!",
      description: `Shared ${post.user.name}'s post to your profile`,
    })

    setShareComment("")
  }

  const handleAddComment = () => {
    if (!newComment.trim()) return

    const comment: Comment = {
      id: Date.now().toString(),
      user: {
        name: "John D.",
        avatar: "/placeholder.svg?height=32&width=32",
        sobrietyBadge: "1 year",
      },
      content: newComment,
      timestamp: "now",
      likes: 0,
    }

    setComments((prev) => [...prev, comment])
    setCommentCount((prev) => prev + 1)
    setNewComment("")

    toast({
      title: "Comment Added!",
      description: "Your comment has been posted",
    })
  }

  const handleCommentKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleAddComment()
    }
  }

  const handleCommentLike = (commentId: string) => {
    setComments((prev) =>
      prev.map((comment) => (comment.id === commentId ? { ...comment, likes: comment.likes + 1 } : comment)),
    )
    toast({
      title: "Comment Liked",
      description: "Liked comment",
    })
  }

  const handleEditPost = () => {
    setIsEditing(true)
    setEditContent(post.content)
    toast({
      title: "Edit Mode",
      description: "You can now edit your post",
    })
  }

  const handleSaveEdit = async () => {
    if (!editContent.trim()) {
      toast({
        title: "Empty Post",
        description: "Post content cannot be empty",
        variant: "destructive",
      })
      return
    }

    if (editContent === post.content) {
      setIsEditing(false)
      return
    }

    setIsSaving(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Update the post content
    if (onPostUpdate) {
      onPostUpdate(post.id, editContent)
    }

    setIsSaving(false)
    setIsEditing(false)

    toast({
      title: "Post Updated!",
      description: "Your post has been successfully updated",
    })
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditContent(post.content)
    toast({
      title: "Edit Cancelled",
      description: "Changes have been discarded",
    })
  }

  const handleEditKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.ctrlKey) {
      e.preventDefault()
      handleSaveEdit()
    } else if (e.key === "Escape") {
      e.preventDefault()
      handleCancelEdit()
    }
  }

  // Render shared post
  if (post.isShared && post.originalPost) {
    return (
      <AnimatedCard className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700" delay={0.1}>
        <CardContent className="p-0">
          {/* Shared By Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex items-center justify-between p-4 pb-2"
          >
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Repeat className="w-4 h-4" />
              <Avatar className="w-6 h-6">
                <AvatarImage src={post.sharedBy?.avatar || "/placeholder.svg"} />
                <AvatarFallback>{post.sharedBy?.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-sm">
                <span className="font-medium text-gray-900 dark:text-gray-100">{post.sharedBy?.name}</span> shared this
                post
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-auto">{post.sharedBy?.timestamp}</span>
            </div>

            {/* More options for shared posts */}
            {isOwnPost && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <AnimatedButton
                    variant="ghost"
                    size="icon"
                    className="text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <MoreHorizontal className="w-5 h-5" />
                  </AnimatedButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white dark:bg-gray-800">
                  <DropdownMenuItem
                    onClick={handleEditPost}
                    className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Share Comment
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </motion.div>

          {/* Share Comment - Editable if own post */}
          {post.shareComment && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="px-4 pb-3"
            >
              {isEditing && isOwnPost ? (
                <div className="space-y-3">
                  <Textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    onKeyDown={handleEditKeyPress}
                    className="min-h-[80px] resize-none bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                    placeholder="Edit your share comment..."
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <AnimatedButton
                      onClick={handleSaveEdit}
                      disabled={isSaving}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      size="sm"
                    >
                      {isSaving ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            className="w-3 h-3 border-2 border-white border-t-transparent rounded-full mr-2"
                          />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="w-3 h-3 mr-2" />
                          Save
                        </>
                      )}
                    </AnimatedButton>
                    <AnimatedButton onClick={handleCancelEdit} variant="outline" size="sm" className="bg-transparent">
                      <X className="w-3 h-3 mr-2" />
                      Cancel
                    </AnimatedButton>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Press Ctrl+Enter to save, Esc to cancel</p>
                </div>
              ) : (
                <p className="text-gray-900 dark:text-gray-100">{post.shareComment}</p>
              )}
            </motion.div>
          )}

          {/* Original Post Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mx-4 mb-4 border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden"
          >
            {/* Original Post Header */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50">
              <div className="flex items-center gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={post.originalPost.user.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{post.originalPost.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-gray-900 dark:text-gray-100">
                      {post.originalPost.user.name}
                    </span>
                    {post.originalPost.user.verified && (
                      <CheckCircle className="w-3 h-3 text-blue-500 dark:text-blue-400 fill-current" />
                    )}
                    {post.originalPost.user.sobrietyBadge && (
                      <Badge
                        variant="secondary"
                        className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                      >
                        {post.originalPost.user.sobrietyBadge} sober
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{post.originalPost.timestamp}</span>
                </div>
              </div>
            </div>

            {/* Original Post Content */}
            <div className="p-4 bg-white dark:bg-gray-800">
              <p className="text-gray-900 dark:text-gray-100 text-sm">{post.originalPost.content}</p>
            </div>

            {/* Original Post Image */}
            {post.originalPost.image && (
              <div className="relative overflow-hidden">
                <Image
                  src={post.originalPost.image || "/placeholder.svg"}
                  alt="Original post image"
                  width={500}
                  height={300}
                  className="w-full object-cover"
                />
              </div>
            )}
          </motion.div>

          {/* Shared Post Stats */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="px-4 py-2 border-b border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>{likeCount} likes</span>
              <div className="flex gap-4">
                <span>{commentCount} comments</span>
                <span>{shareCount} shares</span>
              </div>
            </div>
          </motion.div>

          {/* Shared Post Actions */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="flex items-center justify-around p-2 border-b border-gray-200 dark:border-gray-700"
          >
            <AnimatedButton
              variant="ghost"
              className={`flex-1 gap-2 ${
                isLiked
                  ? "text-red-500 hover:text-red-600"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
              onClick={handleLike}
            >
              <motion.div animate={isLiked ? { scale: [1, 1.3, 1] } : {}} transition={{ duration: 0.3 }}>
                <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
              </motion.div>
              Like
            </AnimatedButton>
            <AnimatedButton
              variant="ghost"
              className={`flex-1 gap-2 ${
                showComments
                  ? "text-blue-500 hover:text-blue-600 bg-blue-50 dark:bg-blue-900/20"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
              onClick={handleCommentToggle}
            >
              <MessageCircle className="w-5 h-5" />
              Comment
            </AnimatedButton>
            <AnimatedButton
              variant="ghost"
              className="flex-1 gap-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={handleShare}
            >
              <Share className="w-5 h-5" />
              Share
            </AnimatedButton>
          </motion.div>

          {/* Comments Section for Shared Post */}
          <AnimatePresence>
            {showComments && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="border-t border-gray-200 dark:border-gray-700"
              >
                {/* Comment Input */}
                <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                  <div className="flex gap-3">
                    <Avatar className="w-8 h-8 flex-shrink-0">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 flex gap-2">
                      <Input
                        placeholder="Write a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        onKeyPress={handleCommentKeyPress}
                        className="flex-1 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                      />
                      <AnimatedButton
                        onClick={handleAddComment}
                        disabled={!newComment.trim()}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3"
                      >
                        <Send className="w-4 h-4" />
                      </AnimatedButton>
                    </div>
                  </div>
                </div>

                {/* Comments List */}
                <div className="max-h-96 overflow-y-auto">
                  <AnimatePresence>
                    {comments.map((comment, index) => (
                      <motion.div
                        key={comment.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                      >
                        <div className="flex gap-3">
                          <Avatar className="w-8 h-8 flex-shrink-0">
                            <AvatarImage src={comment.user.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-sm text-gray-900 dark:text-gray-100">
                                {comment.user.name}
                              </span>
                              {comment.user.sobrietyBadge && (
                                <Badge
                                  variant="secondary"
                                  className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                                >
                                  {comment.user.sobrietyBadge}
                                </Badge>
                              )}
                              <span className="text-xs text-gray-500 dark:text-gray-400">{comment.timestamp}</span>
                            </div>
                            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{comment.content}</p>
                            <div className="flex items-center gap-4">
                              <button
                                onClick={() => handleCommentLike(comment.id)}
                                className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 hover:text-red-500 transition-colors"
                              >
                                <Heart className="w-3 h-3" />
                                <span>{comment.likes}</span>
                              </button>
                              <button className="text-xs text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors">
                                Reply
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {comments.length === 0 && (
                    <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                      <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No comments yet. Be the first to comment!</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </AnimatedCard>
    )
  }

  // Regular post rendering
  return (
    <>
      <AnimatedCard className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700" delay={0.1}>
        <CardContent className="p-0">
          {/* Post Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex items-center justify-between p-4"
          >
            <div className="flex items-center gap-3">
              <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
                <Avatar>
                  <AvatarImage src={safePost.user.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{safePost.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </motion.div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900 dark:text-gray-100">{safePost.user.name}</span>
                  {safePost.user.verified && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                    >
                      <CheckCircle className="w-4 h-4 text-blue-500 dark:text-blue-400 fill-current" />
                    </motion.div>
                  )}
                  {safePost.user.sobrietyBadge && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 }}
                    >
                      <Badge
                        variant="secondary"
                        className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                      >
                        {safePost.user.sobrietyBadge} sober
                      </Badge>
                    </motion.div>
                  )}
                  {post.timestamp === "now" && (
                    <Badge variant="outline" className="text-xs text-blue-600 dark:text-blue-400">
                      Just posted
                    </Badge>
                  )}
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">{post.timestamp}</span>
              </div>
            </div>

            {/* More options dropdown - only show for own posts */}
            {isOwnPost ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <AnimatedButton
                    variant="ghost"
                    size="icon"
                    className="text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <MoreHorizontal className="w-5 h-5" />
                  </AnimatedButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white dark:bg-gray-800">
                  <DropdownMenuItem
                    onClick={handleEditPost}
                    className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Post
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <AnimatedButton
                variant="ghost"
                size="icon"
                className="text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <MoreHorizontal className="w-5 h-5" />
              </AnimatedButton>
            )}
          </motion.div>

          {/* Post Content - Editable if in edit mode */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="px-4 pb-3"
          >
            {isEditing ? (
              <div className="space-y-3">
                <Textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  onKeyDown={handleEditKeyPress}
                  className="min-h-[100px] resize-none bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                  placeholder="Edit your post..."
                  autoFocus
                />
                <div className="flex gap-2">
                  <AnimatedButton
                    onClick={handleSaveEdit}
                    disabled={isSaving}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    size="sm"
                  >
                    {isSaving ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          className="w-3 h-3 border-2 border-white border-t-transparent rounded-full mr-2"
                        />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-3 h-3 mr-2" />
                        Save Changes
                      </>
                    )}
                  </AnimatedButton>
                  <AnimatedButton onClick={handleCancelEdit} variant="outline" size="sm" className="bg-transparent">
                    <X className="w-3 h-3 mr-2" />
                    Cancel
                  </AnimatedButton>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Press Ctrl+Enter to save, Esc to cancel</p>
              </div>
            ) : (
              <p className="text-gray-900 dark:text-gray-100">{post.content}</p>
            )}
          </motion.div>

          {/* Post Image */}
          {post.image && !isEditing && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative overflow-hidden"
            >
              <Image
                src={post.image || "/placeholder.svg"}
                alt="Post image"
                width={500}
                height={300}
                className="w-full object-cover"
              />
            </motion.div>
          )}

          {/* Post Stats */}
          {!isEditing && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="px-4 py-2 border-b border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>{likeCount} likes</span>
                <div className="flex gap-4">
                  <span>{commentCount} comments</span>
                  <span>{shareCount} shares</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Post Actions */}
          {!isEditing && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="flex items-center justify-around p-2 border-b border-gray-200 dark:border-gray-700"
            >
              <AnimatedButton
                variant="ghost"
                className={`flex-1 gap-2 ${
                  isLiked
                    ? "text-red-500 hover:text-red-600"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
                onClick={handleLike}
              >
                <motion.div animate={isLiked ? { scale: [1, 1.3, 1] } : {}} transition={{ duration: 0.3 }}>
                  <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
                </motion.div>
                Like
              </AnimatedButton>
              <AnimatedButton
                variant="ghost"
                className={`flex-1 gap-2 ${
                  showComments
                    ? "text-blue-500 hover:text-blue-600 bg-blue-50 dark:bg-blue-900/20"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
                onClick={handleCommentToggle}
              >
                <MessageCircle className="w-5 h-5" />
                Comment
              </AnimatedButton>
              <AnimatedButton
                variant="ghost"
                className="flex-1 gap-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={handleShare}
              >
                <Share className="w-5 h-5" />
                Share
              </AnimatedButton>
            </motion.div>
          )}

          {/* Comments Section */}
          <AnimatePresence>
            {showComments && !isEditing && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="border-t border-gray-200 dark:border-gray-700"
              >
                {/* Comment Input */}
                <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                  <div className="flex gap-3">
                    <Avatar className="w-8 h-8 flex-shrink-0">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 flex gap-2">
                      <Input
                        placeholder="Write a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        onKeyPress={handleCommentKeyPress}
                        className="flex-1 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                      />
                      <AnimatedButton
                        onClick={handleAddComment}
                        disabled={!newComment.trim()}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3"
                      >
                        <Send className="w-4 h-4" />
                      </AnimatedButton>
                    </div>
                  </div>
                </div>

                {/* Comments List */}
                <div className="max-h-96 overflow-y-auto">
                  <AnimatePresence>
                    {comments.map((comment, index) => (
                      <motion.div
                        key={comment.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                      >
                        <div className="flex gap-3">
                          <Avatar className="w-8 h-8 flex-shrink-0">
                            <AvatarImage src={comment.user.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-sm text-gray-900 dark:text-gray-100">
                                {comment.user.name}
                              </span>
                              {comment.user.sobrietyBadge && (
                                <Badge
                                  variant="secondary"
                                  className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                                >
                                  {comment.user.sobrietyBadge}
                                </Badge>
                              )}
                              <span className="text-xs text-gray-500 dark:text-gray-400">{comment.timestamp}</span>
                            </div>
                            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{comment.content}</p>
                            <div className="flex items-center gap-4">
                              <button
                                onClick={() => handleCommentLike(comment.id)}
                                className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 hover:text-red-500 transition-colors"
                              >
                                <Heart className="w-3 h-3" />
                                <span>{comment.likes}</span>
                              </button>
                              <button className="text-xs text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors">
                                Reply
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {comments.length === 0 && (
                    <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                      <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No comments yet. Be the first to comment!</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </AnimatedCard>

      {/* Share Dialog */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Share className="w-5 h-5" />
              Share Post
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Original Post Preview */}
            <div className="p-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700/50">
              <div className="flex items-center gap-2 mb-2">
                <Avatar className="w-6 h-6">
                  <AvatarImage src={safePost.user.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{safePost.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{safePost.user.name}</span>
                {safePost.user.sobrietyBadge && (
                  <Badge
                    variant="secondary"
                    className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                  >
                    {safePost.user.sobrietyBadge}
                  </Badge>
                )}
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">{post.content}</p>
            </div>

            {/* Share Comment */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                Add your thoughts (optional)
              </label>
              <Textarea
                placeholder="What do you think about this post?"
                value={shareComment}
                onChange={(e) => setShareComment(e.target.value)}
                className="min-h-[80px] resize-none"
                rows={3}
              />
            </div>

            {/* Share Actions */}
            <div className="flex gap-2 pt-4">
              <AnimatedButton
                variant="outline"
                onClick={() => setShowShareDialog(false)}
                className="flex-1 bg-transparent"
              >
                Cancel
              </AnimatedButton>
              <AnimatedButton onClick={handleSharePost} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                <Repeat className="w-4 h-4 mr-2" />
                Share Post
              </AnimatedButton>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
