
document.addEventListener('DOMContentLoaded', function() {
    const newsGrid = document.getElementById('news-grid');
    if (!newsGrid) return;

    fetch('news-data.json')
        .then(response => response.json())
        .then(data => {
            newsGrid.innerHTML = ''; // 기존 내용 삭제
            // 최대 9개까지만 노출 (최신순)
            const latestNews = data.slice(0, 9);
            
            latestNews.forEach(news => {
                const card = document.createElement('div');
                card.className = 'news-card';
                
                const imageUrl = news.image || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=800&auto=format&fit=crop';

                card.innerHTML = `
                    <div class="image-wrapper">
                        <img src="${imageUrl}" alt="${news.title}" loading="lazy">
                    </div>
                    <div class="news-card-content">
                        <span class="category">${news.category}</span>
                        <h3>${news.title}</h3>
                        <p>${news.summary}</p>
                        <div class="meta">
                            <span>${news.date}</span>
                            <a href="${news.url}" class="read-more">자세히 보기 →</a>
                        </div>
                    </div>
                `;
                newsGrid.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error loading news data:', error);
            newsGrid.innerHTML = '<p>뉴스를 불러오는 중 오류가 발생했습니다.</p>';
        });
});
