// Validate explicit editorial ownership; do not guess topic meaning from keywords.
export function validateGuideClusters(articles, topics, sectors) {
  const issues=[];
  const slugs=new Set(articles.map(p=>p.slug));
  if(slugs.size!==articles.length)issues.push('Duplicate article slugs');
  const topicIds=new Set();
  for(const topic of topics){
    if(topicIds.has(topic.id))issues.push(`Duplicate topic: ${topic.id}`);
    topicIds.add(topic.id);
    if(!topic.title||!/^\/(?:blogs\/#topic-|guides\/)/.test(topic.href||''))issues.push(`Invalid hub for ${topic.id}`);
    if(new Set(topic.slugs).size!==topic.slugs.length)issues.push(`Duplicate members in ${topic.id}`);
    for(const slug of topic.slugs)if(!slugs.has(slug))issues.push(`Unknown guide ${slug} in ${topic.id}`);
  }
  for(const article of articles){
    const owners=topics.filter(t=>t.slugs.includes(article.slug));
    if(owners.length!==1)issues.push(`${article.slug} needs exactly one primary topic; found ${owners.length}`);
  }
  for(const sector of sectors){
    const groupIds=new Set(),members=[];
    for(const group of sector.groups||[]){
      if(!group.title||!group.id||groupIds.has(group.id))issues.push(`Invalid or duplicate subgroup in ${sector.id}`);
      groupIds.add(group.id);members.push(...group.slugs);
      for(const slug of group.slugs)if(!slugs.has(slug))issues.push(`Unknown subgroup guide ${slug} in ${sector.id}/${group.id}`);
    }
    if(new Set(members).size!==members.length)issues.push(`Repeated subgroup assignment in ${sector.id}`);
    for(const slug of sector.slugs)if(!members.includes(slug))issues.push(`${slug} needs a subgroup in ${sector.id}`);
  }
  if(issues.length)throw new Error(`Guide cluster coverage failed:\n${issues.join('\n')}`);
  return {guides:articles.length,primaryTopics:topics.length,industryHubs:sectors.length};
}

export function validateCalculatorNavigation(directory, articles) {
  const slugs=directory.map(([slug])=>slug);
  if(new Set(slugs).size!==slugs.length)throw new Error('Duplicate calculator directory entry');
  const known=new Set([...slugs.map(s=>`/calculators/${s}/`),...articles.map(p=>`/blogs/${p.slug}/`)]);
  for(const[slug,record]of directory){
    if(!record.category?.trim())throw new Error(`${slug} needs a calculator category`);
    if(record.mode!=='industry'&&!known.has(record.guide))throw new Error(`${slug} needs an existing related guide or calculator`);
  }
  return {calculators:directory.length};
}
