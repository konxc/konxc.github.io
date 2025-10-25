import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date().optional().default(new Date()), // ✅ More flexible
    author: z.string().optional().default('Unknown Author'),
    category: z.enum(['business', 'technical', 'case-study', 'tutorial', 'insights', 'testing']).optional().default('technical'),
    tags: z.array(z.string()).optional().default([]),
    featured: z.boolean().optional().default(false),
    readingTime: z.number().optional().default(5),
    coverImage: z.string().optional(),
    image: z.string().optional(),
    views: z.number().optional().default(0),
    series: z.string().optional(),
    seriesOrder: z.number().optional().default(0),
    interactiveDemos: z.array(z.object({
      id: z.string(),
      type: z.enum(['code', 'visual', 'interactive']),
      title: z.string(),
      description: z.string(),
      icon: z.string(),
      featured: z.boolean().optional(),
      metadata: z.record(z.any()).optional()
    })).optional().default([]),
  }),
});

const contributors = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    bio: z.string(),
    avatar: z.string().optional(),
    role: z.enum(['developer', 'designer', 'writer', 'researcher', 'mentor', 'community-leader', 'open-source-contributor']),
    expertise: z.array(z.string()),
    location: z.string().optional(),
    website: z.string().optional(),
    github: z.string().optional(),
    linkedin: z.string().optional(),
    twitter: z.string().optional(),
    joinDate: z.string(),
    isActive: z.boolean().optional().default(true),
    contributions: z.object({
      blogPosts: z.number().optional().default(0),
      openSourceProjects: z.array(z.object({
        name: z.string(),
        url: z.string(),
        role: z.string(),
        contributions: z.number().optional().default(0),
        isMaintainer: z.boolean().optional().default(false)
      })).optional().default([]),
      koneksiProjects: z.array(z.object({
        name: z.string(),
        description: z.string(),
        role: z.string(),
        status: z.enum(['active', 'completed', 'archived']),
        startDate: z.string(),
        endDate: z.string().optional()
      })).optional().default([]),
      communityContributions: z.array(z.object({
        type: z.enum(['event', 'mentoring', 'documentation', 'translation', 'bug-report', 'feature-request']),
        title: z.string(),
        description: z.string(),
        date: z.string(),
        impact: z.enum(['low', 'medium', 'high'])
      })).optional().default([])
    }),
    achievements: z.array(z.object({
      title: z.string(),
      description: z.string(),
      date: z.string(),
      category: z.enum(['technical', 'community', 'leadership', 'innovation']),
      verified: z.boolean().optional().default(false)
    })).optional().default([]),
    skills: z.object({
      technical: z.array(z.string()).optional().default([]),
      soft: z.array(z.string()).optional().default([]),
      languages: z.array(z.string()).optional().default([])
    }),
    availability: z.object({
      forMentoring: z.boolean().optional().default(false),
      forCollaboration: z.boolean().optional().default(false),
      forSpeaking: z.boolean().optional().default(false),
      timezone: z.string().optional()
    }),
    socialProof: z.object({
      githubStars: z.number().optional().default(0),
      npmDownloads: z.number().optional().default(0),
      communityReputation: z.number().optional().default(0),
      verifiedContributions: z.number().optional().default(0)
    })
  }),
});

export const collections = { blog, contributors };
